const opCodeIDX  = 0;
const opSizeIDX  = 1;
const opRegexIDX = 2;

const allowedCodes = [
 /*opCode, Size,  Matching RegEx */
    [0xf0,  0,  /^\s*$/ ],
    [0xf1,  0,  /^\s*(\w+):\s*$/ ],
    [0xf2,  0,  /^\s*\^comment\s+(.*)/ ],
    [0xf3,  0,  /^\s*(\^declare)\s+(\w+)\s*$/ ],
    [0xf4,  0,  /^\s*(\^allocate)\s+(\w+)\s+(\d+)\s*$/ ],
    [0xf5,  0,  /^\s*(if)\s+(\w+)\s*([<>=!]+)\s*(0|\w+)\s*$/ ],
    [0xf6,  0,  /^\s*else\s*$/ ],
    [0xf7,  0,  /^\s*endif\s*$/ ],
    [0xf8,  0,  /^\s*(while)\s+(\w+)\s*([<>=!]+)\s*(0|\w+)\s*$/ ],
    [0xf9,  0,  /^\s*loop\s*$/ ],
    [0xfa,  0,  /^\s*repeat\s*$/ ],
    [0xfb,  0,  /^\s*(until)\s+(\w+)\s*([<>=!]+)\s*(0|\w+)\s*$/ ],
    [0xfc,  0,  /^\s*continue\s*$/ ],
    [0xfd,  0,  /^\s*break\s*$/ ],
    [0xfe,  0,  /^\s*call\s+(\w+)\s*=\s*(\w+)\s*(.*)$/],                // call ret = function params...
    [0xff,  0,  /^\s*call\s+(\w+)\s*(.*)$/],                            // call function params...
    [0x01, 13,  /^\s*(SET)\s+@(\w+)\s+#([\da-f]{16})\b\s*$/ ],          // SET @var #0000000000000001
    [0x02,  9,  /^\s*(SET)\s+@(\w+)\s+\$(\w+)\s*$/ ],                   // SET @var $var
    [0x03,  5,  /^\s*CLR\s+@(\w+)\s*$/ ],
    [0x04,  5,  /^\s*INC\s+@(\w+)\s*$/ ],
    [0x05,  5,  /^\s*DEC\s+@(\w+)\s*$/ ],
    [0x06,  9,  /^\s*ADD\s+@(\w+)\s+\$(\w+)\s*$/ ],
    [0x07,  9,  /^\s*SUB\s+@(\w+)\s+\$(\w+)\s*$/ ],
    [0x08,  9,  /^\s*MUL\s+@(\w+)\s+\$(\w+)\s*$/ ],
    [0x09,  9,  /^\s*DIV\s+@(\w+)\s+\$(\w+)\s*$/ ],
    [0x0a,  9,  /^\s*BOR\s+@(\w+)\s+\$(\w+)\s*$/ ],
    [0x0b,  9,  /^\s*AND\s+@(\w+)\s+\$(\w+)\s*$/ ],
    [0x0c,  9,  /^\s*XOR\s+@(\w+)\s+\$(\w+)\s*$/ ],
    [0x0d,  5,  /^\s*NOT\s+@(\w+)\s*$/ ],
    [0x0e,  9,  /^\s*SET\s+@(\w+)\s+\$\(\$(\w+)\)\s*$/ ],
    [0x0f, 13,  /^\s*SET\s+@(\w+)\s+\$\(\$(\w+)\s*\+\s*\$(\w+)\)\s*$/ ],
    [0x10,  5,  /^\s*PSH\s+\$(\w+)\s*$/ ],
    [0x11,  5,  /^\s*POP\s+@(\w+)\s*$/ ],
    [0x12,  5,  /^\s*(JSR)\s+:(\w+)\s*$/ ],                             // JSR :function
    [0x13,  1,  /^\s*RET\s*$/ ],
    [0x14,  9,  /^\s*SET\s+@\(\$(\w+)\)\s+\$(\w+)\s*$/ ],
    [0x15, 13,  /^\s*SET\s+@\(\$(\w+)\s*\+\s*\$(\w+)\)\s+\$(\w+)\s*$/ ],
    [0x16,  9,  /^\s*MOD\s+@(\w+)\s+\$(\w+)\s*$/ ],
    [0x17,  9,  /^\s*SHL\s+@(\w+)\s+\$(\w+)\s*$/ ],
    [0x18,  9,  /^\s*SHR\s+@(\w+)\s+\$(\w+)\s*$/ ],
    [0x1a,  5,  /^\s*(JMP)\s+:(\w+)\s*$/ ],                             // JMP :label
    [0x1b,  6,  /^\s*(BZR)\s+\$(\w+)\s+:(\w+)\s*$/ ],                   // BZR $var :label
    [0x1e,  6,  /^\s*(BNZ)\s+\$(\w+)\s+:(\w+)\s*$/ ],                   // BZR $var :label
    [0x1f, 10,  /^\s*(BGT)\s+\$(\w+)\s+\$(\w+)\s+:(\w+)\s*$/ ],         // BGT $var $var :label
    [0x20, 10,  /^\s*(BLT)\s+\$(\w+)\s+\$(\w+)\s+:(\w+)\s*$/ ],         // BLT $var $var :label
    [0x21, 10,  /^\s*(BGE)\s+\$(\w+)\s+\$(\w+)\s+:(\w+)\s*$/ ],         // BGE $var $var :label
    [0x22, 10,  /^\s*(BLE)\s+\$(\w+)\s+\$(\w+)\s+:(\w+)\s*$/ ],         // BLE $var $var :label
    [0x23, 10,  /^\s*(BEQ)\s+\$(\w+)\s+\$(\w+)\s+:(\w+)\s*$/ ],         // BEQ $var $var :label
    [0x24, 10,  /^\s*(BNE)\s+\$(\w+)\s+\$(\w+)\s+:(\w+)\s*$/ ],         // BNE $var $var :label
    [0x25,  5,  /^\s*SLP\s+\$(\w+)\s*$/ ],
    [0x26,  5,  /^\s*FIZ\s+\$(\w+)\s*$/ ],
    [0x27,  5,  /^\s*STZ\s+\$(\w+)\s*$/ ],
    [0x28,  1,  /^\s*FIN\s*$/ ],
    [0x29,  1,  /^\s*STP\s*$/ ],
    [0x2b,  5,  /^\s*(ERR)\s+:(\w+)\s*$/ ],                             // ERR :label
    [0x30,  1,  /^\s*PCS\s*$/ ],
    [0x32,  3,  /^\s*(FUN)\s+(\w+)\s*$/ ],
    [0x33,  7,  /^\s*(FUN)\s+(\w+)\s+\$(\w+)\s*$/ ],
    [0x34, 11,  /^\s*(FUN)\s+(\w+)\s+\$(\w+)\s+\$(\w+)\s*$/ ],
    [0x35,  7,  /^\s*(FUN)\s+@(\w+)\s+(\w+)\s*$/ ],
    [0x36, 11,  /^\s*(FUN)\s+@(\w+)\s+(\w+)\s+\$(\w+)\s*$/ ],
    [0x37, 15,  /^\s*(FUN)\s+@(\w+)\s+(\w+)\s+\$(\w+)\s+\$(\w+)\s*$/ ],
    [0x7f,  1,  /^\s*NOP\s*$/ ]
    ];

const fnCodeIDX  = 0;
const fnNameIDX  = 1;

const allowedFunctions = [
   /* fnCode,  fnName  */
    [ 0x0100, "get_A1" ],
    [ 0x0101, "get_A2" ],
    [ 0x0102, "get_A3" ],
    [ 0x0103, "get_A4" ],
    [ 0x0104, "get_B1" ],
    [ 0x0105, "get_B2" ],
    [ 0x0106, "get_B3" ],
    [ 0x0107, "get_B4" ],
    [ 0x0110, "set_A1" ],
    [ 0x0111, "set_A2" ],
    [ 0x0112, "set_A3" ],
    [ 0x0113, "set_A4" ],
    [ 0x0114, "set_A1_A2" ],
    [ 0x0115, "set_A3_A4" ],
    [ 0x0116, "set_B1" ],
    [ 0x0117, "set_B2" ],
    [ 0x0118, "set_B3" ],
    [ 0x0119, "set_B4" ],
    [ 0x011a, "set_B1_B2" ],
    [ 0x011b, "set_B3_B4" ],
    [ 0x0120, "clear_A" ],
    [ 0x0121, "clear_B" ],
    [ 0x0122, "clear_A_B" ],
    [ 0x0123, "copy_A_From_B" ],
    [ 0x0124, "copy_B_From_A" ],
    [ 0x0125, "check_A_Is_Zero" ],
    [ 0x0126, "check_B_Is_Zero" ],
    [ 0x0127, "check_A_equals_B" ],
    [ 0x0128, "swap_A_and_B" ],
    [ 0x0129, "OR_A_with_B" ],
    [ 0x012a, "OR_B_with_A" ],
    [ 0x012b, "AND_A_with_B" ],
    [ 0x012c, "AND_B_with_A" ],
    [ 0x012d, "XOR_A_with_B" ],
    [ 0x012e, "XOR_B_with_A" ],
    [ 0x0140, "add_A_to_B" ],
    [ 0x0141, "add_B_to_A" ],
    [ 0x0142, "sub_A_from_B" ],
    [ 0x0143, "sub_B_from_A" ],
    [ 0x0144, "mul_A_by_B" ],
    [ 0x0145, "mul_B_by_A" ],
    [ 0x0146, "div_A_by_B" ],
    [ 0x0147, "div_B_by_A" ],
    [ 0x0200, "MD5_A_to_B" ],
    [ 0x0201, "check_MD5_A_with_B" ],
    [ 0x0202, "HASH160_A_to_B" ],
    [ 0x0203, "check_HASH160_A_with_B" ],
    [ 0x0204, "SHA256_A_to_B" ],
    [ 0x0205, "check_SHA256_A_with_B" ],
    [ 0x0300, "get_Block_Timestamp" ],
    [ 0x0301, "get_Creation_Timestamp" ],
    [ 0x0302, "get_Last_Block_Timestamp" ],
    [ 0x0303, "put_Last_Block_Hash_In_A" ],
    [ 0x0304, "A_to_Tx_after_Timestamp" ],
    [ 0x0305, "get_Type_for_Tx_in_A" ],
    [ 0x0306, "get_Amount_for_Tx_in_A" ],
    [ 0x0307, "get_Timestamp_for_Tx_in_A" ],
    [ 0x0308, "get_Ticket_Id_for_Tx_in_A" ],
    [ 0x0309, "message_from_Tx_in_A_to_B" ],
    [ 0x030a, "B_to_Address_of_Tx_in_A" ],
    [ 0x030b, "B_to_Address_of_Creator" ],
    [ 0x0400, "get_Current_Balance" ],
    [ 0x0401, "get_Previous_Balance" ],
    [ 0x0402, "send_to_Address_in_B" ],
    [ 0x0403, "send_All_to_Address_in_B" ],
    [ 0x0404, "send_Old_to_Address_in_B" ],
    [ 0x0405, "send_A_to_Address_in_B" ],
    [ 0x0406, "add_Minutes_to_Timestamp" ]
    ];

//w3CodeColor(document.getElementById("myDiv"),"js");
// based on w3schools code
function asmCodeColor(txt) {
    'use strict';

    //Choose your colors
    var asmCommentColor = "green";
    var asmLabelColor = "DarkOrange";
    var asmInstructionColor = "mediumblue";
    var asmPropertyColor = "purple";
    var asmNumberColor = "red";
    var asmErrorColor = "pink";

    return asmHighLight(txt);

    function asmHighLight(txt) {
        var tmp_string;
        var iFound, fFound; //instruction Found, function Found
        var i, j, k;  //iterators
        var comment_start; //index of starting ; comment
        var lineBefCom; //line contents before ; comment
        var lineAftCom; //line contents after ; comment
        var parts;  // to store string splitted

        //process line by line
        var line = txt.split("\n")
        var ret = ""
        //loop thru all lines
        for (i=0; i<line.length; i++) {
            iFound = 0;
            //starting processing comments with ;
            comment_start = line[i].indexOf(";");
            if (comment_start >=0){
                lineBefCom = line[i].slice(0,comment_start);
                lineAftCom = line[i].slice(comment_start);
            } else {
                lineBefCom = line[i];
                lineAftCom = "";
            }
            //loop thru all regex expressions
            for (j=0; j<allowedCodes.length; j++) {
                //we have a matching regex expression
                parts=allowedCodes[j][opRegexIDX].exec(lineBefCom);
                if (parts !== null) {
                    iFound = 1;
                    //codes above 7f are internal use only
                    if (allowedCodes[j][opCodeIDX] > 0x7f) {
                        switch (allowedCodes[j][opCodeIDX]) {
                            case 0xf0: //is empty line
                                ret += lineBefCom;
                                break;
                            case 0xf1: //is label line
                                tmp_string = addSpanColor(lineBefCom,parts[1],asmLabelColor);
                                tmp_string = addSpanColorLast(tmp_string,":",asmPropertyColor);
                                ret += tmp_string;
                                break;
                            case 0xf3: //declare
                                tmp_string = addSpanColor(lineBefCom,parts[1],asmPropertyColor);
                                ret += tmp_string;
                                break;
                            case 0xf4: //allocate
                                tmp_string = addSpanColor(lineBefCom,parts[1],asmPropertyColor);
                                tmp_string = addSpanColor(tmp_string,parts[3],asmNumberColor);
                                ret += tmp_string;
                                break;
                            case 0xf5: //if
                            case 0xf8: //while
                            case 0xfb: //until
                                tmp_string = addSpanColor(lineBefCom,parts[3],asmPropertyColor);
                                tmp_string = addSpanColor(tmp_string,parts[1],asmPropertyColor);
                                ret += tmp_string;
                                break;
                            case 0xf6: //else
                            case 0xf7: //endif
                            case 0xf9: //loop
                            case 0xfa: //repeat
                            case 0xfc: //continue
                            case 0xfd: //break
                                ret += spanColorAll(lineBefCom,asmPropertyColor);
                                break;
                            case 0xfe: //call_ret
                                tmp_string = addSpanColor(lineBefCom,"=",asmPropertyColor);
                                tmp_string = addSpanColor(tmp_string,"call",asmPropertyColor);
                                tmp_string = addSpanColor(tmp_string,parts[2],asmLabelColor);
                                ret += tmp_string;
                                break;
                            case 0xff: //call
                                tmp_string = addSpanColor(lineBefCom,"call",asmPropertyColor)
                                tmp_string = addSpanColor(tmp_string,parts[1],asmLabelColor);
                                ret += tmp_string;
                                break;
                            default: //is comment,
                                ret += spanColorAll(lineBefCom,asmCommentColor);
                        }
                    } else { //we have an instruction line. Process accordingly
                        switch (allowedCodes[j][opCodeIDX]) {
                            case 0x01:
                                tmp_string = addSpanColor(lineBefCom,parts[1],asmInstructionColor);
                                tmp_string = addSpanColor(tmp_string,"@",asmPropertyColor);
                                tmp_string = addSpanColor(tmp_string,"#",asmPropertyColor);
                                tmp_string = addSpanColor(tmp_string,parts[3],asmNumberColor);
                                ret += tmp_string;
                                break;
                            case 0x02:
                            case 0x06:
                            case 0x07:
                            case 0x08:
                            case 0x09:
                            case 0x0a:
                            case 0x0b:
                            case 0x0c:
                            case 0x16:
                            case 0x17:
                            case 0x18:
                                tmp_string = addSpanColorRegex(lineBefCom,/\b\w{3}\b/,asmInstructionColor);
                                tmp_string = addSpanColor(tmp_string,"@",asmPropertyColor);
                                tmp_string = addSpanColor(tmp_string,"$",asmPropertyColor);
                                ret += tmp_string;
                                break;
                            case 0x03:
                            case 0x04:
                            case 0x05:
                            case 0x0d:
                            case 0x11:
                                tmp_string = addSpanColorRegex(lineBefCom,/\b\w{3}\b/,asmInstructionColor);
                                tmp_string = addSpanColor(tmp_string,"@",asmPropertyColor);
                                ret += tmp_string;
                                break;
                            case 0x10:
                            case 0x25:
                            case 0x26:
                            case 0x27:
                                tmp_string = addSpanColorRegex(lineBefCom,/\b\w{3}\b/,asmInstructionColor);
                                tmp_string = addSpanColor(tmp_string,"$",asmPropertyColor);
                                ret += tmp_string;
                                break;
                            case 0x13:
                            case 0x28:
                            case 0x29:
                            case 0x30:
                            case 0x7f:
                                tmp_string = addSpanColorRegex(lineBefCom,/\b\w{3}\b/,asmInstructionColor);
                                ret += tmp_string;
                                break;
                            case 0x0e:
                            case 0x0f:
                                tmp_string = addSpanColorRegex(lineBefCom,/\b\w{3}\b/,asmInstructionColor);
                                tmp_string = addSpanColor(tmp_string,"@",asmPropertyColor);
                                tmp_string = addSpanColor(tmp_string,"$($",asmPropertyColor);
                                tmp_string = addSpanColorRegex(tmp_string,/\+\s*\$/,asmPropertyColor);
                                tmp_string = addSpanColor(tmp_string,")",asmPropertyColor);
                                ret += tmp_string;
                                break;
                            case 0x14:
                            case 0x15:
                                tmp_string = addSpanColorRegex(lineBefCom,/\b\w{3}\b/,asmInstructionColor);
                                tmp_string = addSpanColor(tmp_string,"@($",asmPropertyColor);
                                tmp_string = addSpanColorRegex(tmp_string,/\+\s*\$/,asmPropertyColor);
                                tmp_string = addSpanColor(tmp_string,")",asmPropertyColor);
                                tmp_string = addSpanColorLast(tmp_string,"$",asmPropertyColor);
                                ret += tmp_string;
                                break;
                            case 0x12:
                            case 0x1a:
                            case 0x2b:
                                tmp_string = addSpanColor(lineBefCom,":",asmPropertyColor);
                                tmp_string = addSpanColor(tmp_string,parts[1],asmInstructionColor);
                                tmp_string = addSpanColor(tmp_string,parts[2],asmLabelColor);
                                ret += tmp_string;
                                break;
                            case 0x1b:
                            case 0x1e:
                                tmp_string = addSpanColor(lineBefCom,":",asmPropertyColor);
                                tmp_string = addSpanColor(tmp_string,"$",asmPropertyColor);
                                tmp_string = addSpanColor(tmp_string,parts[1],asmInstructionColor);
                                tmp_string = addSpanColor(tmp_string,parts[3],asmLabelColor);
                                ret += tmp_string;
                                break;
                            case 0x1f:
                            case 0x20:
                            case 0x21:
                            case 0x22:
                            case 0x23:
                            case 0x24:
                                tmp_string = addSpanColor(lineBefCom,":",asmPropertyColor);
                                tmp_string = addSpanColor(tmp_string,parts[1],asmInstructionColor);
                                tmp_string = addSpanColor(tmp_string,"$",asmPropertyColor);
                                tmp_string = addSpanColor(tmp_string,parts[4],asmLabelColor);
                                ret += tmp_string;
                                break;
                            case 0x32:
                                tmp_string = addSpanColor(lineBefCom,parts[1],asmInstructionColor);
                                for (var k=0, fFound = 0; k<allowedFunctions.length; k++) {
                                    if (parts[2] == (allowedFunctions[k][fnNameIDX])) {
                                        fFound = 1;
                                        break;
                                    }
                                }
                                if (fFound == 0)
                                    tmp_string = addSpanColorError(tmp_string,parts[2],asmErrorColor);
                                else
                                    tmp_string = addSpanColor(tmp_string,parts[2],asmInstructionColor);
                                ret += tmp_string
                                break;
                            case 0x33:
                                tmp_string = addSpanColor(lineBefCom,parts[1],asmInstructionColor);
                                for (var k=0, fFound = 0; k<allowedFunctions.length; k++) {
                                    if (parts[2] == (allowedFunctions[k][fnNameIDX])) {
                                        fFound = 1;
                                        break;
                                    }
                                }
                                if (fFound == 0)
                                    tmp_string = addSpanColorError(tmp_string,parts[2],asmErrorColor);
                                else
                                    tmp_string = addSpanColor(tmp_string,parts[2],asmInstructionColor);
                                tmp_string = addSpanColor(tmp_string,"$",asmPropertyColor);
                                ret += tmp_string;
                                break;
                            case 0x34:
                                tmp_string = addSpanColor(lineBefCom,parts[1],asmInstructionColor);
                                for (var k=0, fFound = 0; k<allowedFunctions.length; k++) {
                                    if (parts[2] == (allowedFunctions[k][fnNameIDX])) {
                                        fFound = 1;
                                        break;
                                    }
                                }
                                if (fFound == 0)
                                    tmp_string = addSpanColorError(tmp_string,parts[2],asmErrorColor);
                                else
                                    tmp_string = addSpanColor(tmp_string,parts[2],asmInstructionColor);
                                tmp_string = addSpanColor(tmp_string,"$",asmPropertyColor)
                                tmp_string = addSpanColorLast(tmp_string,"$",asmPropertyColor)
                                ret += tmp_string;
                                break;
                            case 0x35:
                                tmp_string = addSpanColor(lineBefCom,parts[1],asmInstructionColor);
                                tmp_string = addSpanColor(tmp_string,"@",asmPropertyColor)
                                for (var k=0, fFound = 0; k<allowedFunctions.length; k++) {
                                    if (parts[3] == (allowedFunctions[k][fnNameIDX])) {
                                        fFound = 1;
                                        break;
                                    }
                                }
                                if (fFound == 0)
                                    tmp_string = addSpanColorError(tmp_string,parts[3],asmErrorColor);
                                else
                                    tmp_string = addSpanColor(tmp_string,parts[3],asmInstructionColor);
                                ret += tmp_string;
                                break;
                             case 0x37:
                                tmp_string = addSpanColor(lineBefCom,parts[1],asmInstructionColor);
                                tmp_string = addSpanColor(tmp_string,"@",asmPropertyColor)
                                for (var k=0, fFound = 0; k<allowedFunctions.length; k++) {
                                    if (parts[3] == (allowedFunctions[k][fnNameIDX])) {
                                        fFound = 1;
                                        break;
                                    }
                                }
                                if (fFound == 0)
                                    tmp_string = addSpanColorError(tmp_string,parts[3],asmErrorColor);
                                else
                                    tmp_string = addSpanColor(tmp_string,parts[3],asmInstructionColor);
                                tmp_string = addSpanColor(tmp_string,"$",asmPropertyColor)
                                tmp_string = addSpanColorLast(tmp_string,"$",asmPropertyColor)
                                ret += tmp_string;
                                break;
                             case 0x36:
                             default:
                                //this should never be reached
                                ret += addErrorColor(lineBefCom);
                        }
                    }
                    break;
                }
            }
            //If nothing found it's an error
            if (iFound == 0)
                ret += addErrorColor(lineBefCom);
            //Add again the ; style comment
            if (lineAftCom.length >= 1)
                ret += spanColorAll(lineAftCom, asmCommentColor);
            ret += "\n";
        }
        return ret;
    }
    function addSpanColor(source, text, color) {
        return  source.replace(text, "<span style='color:" + color + "'>" + text + "</span>");
    }
    function addSpanColorError(source, text, color) {
        return  source.replace(text, "<span style='background-color:" + color + "'>" + text + "</span>");
    }
    function addSpanColorLast(source, text, color) {
        var n = source.lastIndexOf(text);
        if (n >= 0)
            return source.slice(0,n) + "<span style='color:" + color + "'>" + text + "</span>" + source.slice(n+text.length);
        return  source;
    }
    function addSpanColorRegex(source, regex, color) {
        var result=regex.exec(source);
        if (result === null)
            return source;
        return source.replace(result[0], "<span  style='color:" + color + "'>" + result[0] + "</span>");
    }
    function addErrorColor(txt) {
        return "<span style=background-color:" + asmErrorColor + ">" + txt + "</span>";
    }
    function spanColorAll(txt, color) {
        return "<span style=color:" + color + ">" + txt + "</span>";
    }
}
