
var Tools = {

	// Input: javascript string for variable name
	// Input: array of longs containing a string 
	// Output: code to use in SmartContractor assembler AT
	longArray2SmartContractor: function a(inVarName, inLongArr) {
		var ret = "";
		for (i=0; i< inLongArr.length; i++)
			if (inLongArr[i] != 0)
				ret+="SET @"+inVarName+"_"+(i)+" #"+inLongArr[i]+"\n";
		return ret;
	},

	// Input: javascript string (utf-16)
	// Output: array of strings representing same string in hexadecimal utf-8
	//   splitted into longs  (64-bit)
	str2longArray: function b(in_str)
	{
		if ( !(typeof in_str === 'string' || in_str instanceof String) )
			return undefined;

		var byarr = [];
		var ret = [];
		var c,c1, i, j;

		for (i=0; i<in_str.length; i++) {
			c = in_str.charCodeAt(i);
			
			if (c < 128)
				byarr.push(c);
			else {
				if (c < 2048) {
					byarr.push(c>>6 | 0xc0);    //ok
					byarr.push((c & 63) | 128); //ok
				} else {
					if (c < 55296 || c > 57343) {
						byarr.push(((c >> 12 ) & 63) | 0xe0); //ok
						byarr.push(((c >> 6 ) & 63) | 128); //ok
						byarr.push((c & 63) | 128); //ok
					} else {
						i++;
						c1 = in_str.charCodeAt(i);
						if ((c & 0xFC00) == 0xd800 && (c1 & 0xFC00) == 0xDC00) {
							c = ((c & 0x3FF) << 10) + (c1 & 0x3FF) + 0x10000;
							byarr.push(((c >> 18 ) & 63) | 0xf0); //ok
							byarr.push(((c >> 12 ) & 63) | 128); //ok
							byarr.push(((c >> 6 ) & 63) | 128); //ok
							byarr.push((c & 63) | 128); //ok
						}
					}
					
				}
			}
		}

		if (byarr.length > 32)
			return ([ "string too big"]);
		
		for (i=0; i<4; i++){
			ret.push("");
			for (j=0; j<8; j++){
				if (8*i+j >= byarr.length)
					ret[i]="00"+ret[i];
				else
					ret[i]=byarr[8*i+j].toString(16).padStart(2, '0')+ret[i];
			}
		}
		return(ret);
	}

}
