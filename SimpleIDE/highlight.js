
//w3CodeColor(document.getElementById("myDiv"),"js");
// based on w3schools code
function asmCodeColor(elmntIn, elmntOut) {
    var elmntObj = document.getElementById(elmntIn); //getElementById(elmntIn);
    var elmntTxt = elmntObj.innerText;
    var elmntOutObj = document.getElementById(elmntOut);
    var commentcolor = "green";
    var asmerrorcolor = "pink";
    var asmcolor = "black";
    var asmkeywordcolor = "mediumblue";
    var asmstringcolor = "brown";
    var asmnumbercolor = "red";
    var asmpropertycolor = "purple";

    elmntTxt = asmMode(elmntTxt);
    elmntOutObj.innerHTML = elmntTxt;

 
    function asmMode(txt) {
        var rest = txt, done = "", esc = [], i, cc, tt = "", sfnuttpos, dfnuttpos, compos, comlinepos, keywordpos, numpos, mypos, dotpos, y;

        var instructions = ["ADD", "AND", "BEQ", "BGE", "BGT", "BLE", "BLT", "BNE", "BNZ", "BOR", "BZR", "CLR", "DEC", "DIV", "ERR", "FIN", "FIZ", "FUN", "INC", "JMP", "JSR", "MOD", "MUL", "NOP", "NOT", "PCS", "POP", "PSH", "RET", "SET", "SHL", "SHR", "SLP", "STP", "STZ", "SUB", "XOR" ];
        var functions = [ "get_A1", "get_A2", "get_A3", "get_A4", "get_B1", "get_B2", "get_B3", "get_B4", "set_A1", "set_A2", "set_A3", "set_A4", "set_A1_A2", "set_A3_A4", "set_B1", "set_B2", "set_B3", "set_B4", "set_B1_B2", "set_B3_B4", "clear_A", "clear_B", "clear_A_B", "copy_A_From_B", "copy_B_From_A", "check_A_Is_Zero", "check_B_Is_Zero", "check_A_equals_B", "swap_A_and_B", "OR_A_with_B", "OR_B_with_A", "AND_A_with_B", "AND_B_with_A", "XOR_A_with_B", "XOR_B_with_A", "add_A_to_B", "add_B_to_A", "sub_A_from_B", "sub_B_from_A", "mul_A_by_B", "mul_B_by_A", "div_A_by_B", "div_B_by_A", "MD5_A_to_B", "check_MD5_A_with_B", "HASH160_A_to_B", "check_HASH160_A_with_B", "SHA256_A_to_B", "check_SHA256_A_with_B", "get_Block_Timestamp", "get_Creation_Timestamp", "get_Last_Block_Timestamp", "put_Last_Block_Hash_In_A", "A_to_Tx_after_Timestamp", "get_Type_for_Tx_in_A", "get_Amount_for_Tx_in_A", "get_Timestamp_for_Tx_in_A", "get_Ticket_Id_for_Tx_in_A", "message_from_Tx_in_A_to_B", "B_to_Address_of_Tx_in_A", "B_to_Address_of_Creator", "get_Current_Balance", "get_Previous_Balance", "send_to_Address_in_B", "send_All_to_Address_in_B", "send_Old_to_Address_in_B", "send_A_to_Address_in_B", "add_Minutes_to_Timestamp"];
        var line = txt.split("\n")
        var ret = ""
        for (i=0; i<line.length; i++) {
            if (line[i].length == 0) {
                ret+= "\n";
                continue;
            }
            if (getComment(line[i]) == 1) {
                ret += commentMode( line[i] ) + "\n";
                continue;
            }
            if (getLabel(line[i]) == 1) {
                ret += jsPropertyMode( line[i] ) + "\n";
                continue;
            }
            //codeline, split again
            var codeline = line[i].split(" ");
            iFound = 0;
            fFound = 0;
            for (j=0; j<instructions.length; j++) {
                pos = codeline[0].indexOf(instructions[j]);
                if (pos == 0 && codeline[0].length == 3 ) { //instruction found!
                    iFound = 1;
                    
                    ret += jsKeywordMode(codeline[0]);
                    for (k=1; k<codeline.length; k++) {
                        if (codeline[k].startsWith('@') || codeline[k].startsWith('$')) {
                            ret += " " + jsStringMode( codeline[k] );
                            continue;
                        }
                        if (codeline[k].startsWith('#')) {
                            if (codeline[k].length == 17)
                                ret += " " + jsNumberMode(codeline[k]);
                            else
                                ret += " " + jsErrorMode(codeline[k]);
                            continue;
                        }
                        if (codeline[k].startsWith('+') && codeline[k].length == 1) {
                            ret += " +";
                            continue;
                        }
                        if (codeline[k].startsWith(':')) {
                            ret += " " + jsPropertyMode(codeline[k]);
                            continue;
                        }
                        for (l=0; l<functions.length; l++) {
                            if (codeline[k].search(functions[l]) != -1) {
                                fFound = 1;
                                ret += " " + codeline[k];
                                break;
                            }
                        }
                        if (fFound == 0)
                            ret += " " + jsErrorMode(codeline[k]);
                    }
                    ret += "\n";
                    break;
                }
            }
            if (iFound != 1)
                ret += jsErrorMode(line[i]) + "\n";
            
        }
        return ret;
    }

    function getLabel(text) {
      
       s = text.search(":");
       if (s+1==text.length)
            return 1;
        return 0;
    }
    function getComment(text) {
      
       s1 = text.search("comment");
       s2 = text.search("declare");
       if (s1 == 1 || s2 == 1)
            return 1;
        return 0;
    }

    function jsStringMode(txt) {
    return "<span style=color:" + asmstringcolor + ">" + txt + "</span>";
    }
    function jsKeywordMode(txt) {
    return "<span style='margin-left:25px;color:" + asmkeywordcolor + "'>" + txt + "</span>";
    }
    function jsNumberMode(txt) {
    return "<span style=color:" + asmnumbercolor + ">" + txt + "</span>";
    }
    function jsPropertyMode(txt) {
    return "<span style=color:" + asmpropertycolor + ">" + txt + "</span>";
    }
    function jsErrorMode(txt) {
    return "<span style=background-color:" + asmerrorcolor + ">" + txt + "</span>";
    }
    function attributeValueMode(txt) {
        return "<span style=color:" + attributevaluecolor + ">" + txt + "</span>";
    }
    function commentMode(txt) {
        return "<span style=color:" + commentcolor + ">" + txt + "</span>";
    }
}
