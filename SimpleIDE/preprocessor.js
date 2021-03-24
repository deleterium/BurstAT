/* ********************************************************************
 *        Preprocessor function for Burstcoin AT Assembly Code
 * 
 * Designed as part of BurstAT Simpĺe IDE project be used with Smart
 * Contractor AT Tools.
 * 
 * Creator: Rui Deleterium
 * License: LGPL v3
 * Project website:
 *
 *     https://github.com/deleterium/BurstAT/tree/master/SimpleIDE
 * 
 * Release history:
 * 22/03/21 deleterium  First release
 * 
 * ****************************************************************** */


function highLevelProcessor(program) {
    'use strict';
    
    //Must match RegexCode order!
    const RegexID = {
        IF: 0,
        ELSE: 1,
        ENDIF: 2,
        WHILE: 3,
        LOOP: 4,
        REPEAT: 5,
        UNTIL: 6,
        CONTINUE: 7,
        BREAK: 8,
        CALL_RET: 9,
        CALL: 10
    }

    const RegexCode = [
       /^\s*if\s+(\w+)\s*([<>=!]+)\s*(0|\w+)\s*$/,
       /^\s*else\s*$/,
       /^\s*endif\s*$/,
       /^\s*while\s+(\w+)\s*([<>=!]+)\s*(0|\w+)\s*$/,
       /^\s*loop\s*$/,
       /^\s*repeat\s*$/,
       /^\s*until\s+(\w+)\s*([<>=!]+)\s*(0|\w+)\s*$/,
       /^\s*continue\s*$/,
       /^\s*break\s*$/,
       /^\s*call\s+(\w+)\s*=\s*(\w+)\s*(.*)$/,    // call ret = function params...
       /^\s*call\s+(\w+)\s*(.*)$/                 // call function params...
    ];

    
    var rFound;        //regex Found
    var i, j, k;       //iterators
    var comment_start; //index of starting ; comment
    var lineBefCom;    //line contents before ; comment
    var lineAftCom;    //line contents after ; comment
    var parts;         //to store string splitted
    var rel_stmt;      //assembly relational statement
    var loops_info = [ ]; //array of objects storing all loops information
    var ifs_info = [ ]; //array of objects storing all ifs information
    var indentation_level = -1;
    var query;
    var jmp_string;
    let params;
    var debug = 1;     //will print optional if_start label.
    
    var lines = program.split("\n")
    var ret = ""
    for (i=0; i<lines.length; i++) {
        //remove comments with ;
        comment_start = lines[i].indexOf(";");
        if (comment_start >=0){
            lineBefCom = lines[i].slice(0,comment_start);
            lineAftCom = lines[i].slice(comment_start);
        } else {
            lineBefCom = lines[i];
            lineAftCom = "";
        }
        //loop thru all regex expressions
        for (j=0; j<RegexCode.length; j++) {
            //we have a matching regex expression
            if ((RegexCode[j]).exec(lineBefCom) !== null) {
                switch (j) {
                    case RegexID.IF:
                        indentation_level++;
                        ifs_info.push( { "ID": i,
                                         "Started": false, //to be used next pass
                                         "Ended": false,
                                         "Level": indentation_level,
                                         "HasElse": false,
                                         "ElseUsed": false });
                        break;
                    case RegexID.ELSE:
                        query=ifs_info.filter(ifs => ifs.Ended === false);
                        if (query.length == 0)
                            return "error line "+i+": 'else' without starting 'if'";
                        if (query[query.length-1].ElseUsed === true)
                            return "error line "+i+": two 'else' for same 'if'";
                        query[query.length-1].HasElse = true;
                        query[query.length-1].ElseUsed = true;
                        break;
                    case RegexID.ENDIF:
                        query=ifs_info.filter(ifs => ifs.Ended === false);
                        if (query.length == 0)
                            return "error line "+i+": 'endif' without starting 'if'";
                        query[query.length-1].Ended = true;
                        indentation_level--;
                        break;
                    case RegexID.WHILE:
                        indentation_level++;
                        loops_info.push( { "ID": i,
                                           "Started": false, //to be used next pass
                                           "Ended": false,
                                           "Level": indentation_level,
                                           "Type": RegexID.WHILE });

                        break;
                    case RegexID.LOOP:
                        query=loops_info.filter(loops => loops.Ended === false).pop();
                        if (query === undefined)
                            return "error line "+i+": 'loop' without starting 'while' or 'repeat'";
                        if (query.Level != indentation_level)
                            return "error line "+i+": if..else..endif not ended inside current loop";
                        query.Ended = true;
                        indentation_level--;
                        break;
                    case RegexID.REPEAT:
                        indentation_level++;
                        loops_info.push( { "ID": i,
                                           "Started": false, //to be used next pass
                                           "Ended": false,
                                           "Level": indentation_level,
                                           "Type": RegexID.REPEAT });
                        break;
                    case RegexID.UNTIL:
                        query=loops_info.filter(loops => loops.Ended === false).pop();
                        if (query === undefined)
                            return "error line "+i+": 'until' without starting 'repeat'";
                        if (query.Type != RegexID.REPEAT)
                            return "error line "+i+": while..until loop no allowed";
                        if (query.Level != indentation_level)
                            return "error line "+i+": if..else..endif not ended inside current loop";
                        query.Ended = true;
                        indentation_level--;
                        break;
                    default:
                        break; //match for CALL_RET or CALL
                }
                j=RegexCode.length;//break regex loop
            }
        }
    }

    query = ifs_info.find(ifs => ifs.Ended === false);
    if (query !== undefined)
        return "error line "+query.ID+": if without endif";
    query = loops_info.find(loops => loops.Ended === false);
    if (query !== undefined)
        return "error line "+query.ID+": loop has no end";

    //reset state
    ifs_info.forEach(ifs => { ifs.Ended = false;} )
    loops_info.forEach(loops => { loops.Ended = false;} )
    
    //second pass
    for (i=0; i<lines.length; i++) {
        rFound=0;
        parts=/\s*;.*/.exec(lines[i]);
        if (parts !== null){
            lineBefCom=lines[i].slice(0,-parts[0].length);
            lineAftCom=parts[0];
        } else {
            lineBefCom=lines[i];
            lineAftCom="";
        }
        //loop thru all regex expressions
        for (j=0; j<RegexCode.length; j++) {
            parts = (RegexCode[j]).exec(lineBefCom);
            //we have a matching regex expression
            if (parts !== null) {
                rFound = 1;
                switch (j) {
                    case RegexID.IF:
                        query = ifs_info.find(ifs => ifs.Started === false);
                        query.Started = true;
                        if (debug == 1)
                            ret += "".padStart(parts[0].search(/\S/),' ')+"_if"+query.ID+":\n";
                        try { rel_stmt = createStatement( parts[1], parts[2], parts[3], i); }
                        catch (error) { return  error; }
                        if (query.HasElse === true)
                            jmp_string = "_if"+query.ID+"_else";
                        else
                            jmp_string = "_if"+query.ID+"_endif";
                        ret += "".padStart(parts[0].search(/\S/),' ')+rel_stmt+" :"+jmp_string+lineAftCom+"\n";
                        break;
                    case RegexID.ELSE:
                        query=ifs_info.filter(ifs => ifs.Started === true && ifs.Ended === false).pop();
                        ret += "".padStart(parts[0].search(/\S/),' ')+"JMP :_if"+query.ID+"_endif\n";   
                        ret += "".padStart(parts[0].search(/\S/),' ')+"_if"+query.ID+"_else:"+lineAftCom+"\n"
                        break;
                    case RegexID.ENDIF:
                        query=ifs_info.filter(ifs => ifs.Started === true && ifs.Ended === false).pop();
                        query.Ended = true;
                        ret += "".padStart(parts[0].search(/\S/),' ')+"_if"+query.ID+"_endif:"+lineAftCom+"\n"
                        break;
                    case RegexID.WHILE:
                        query = loops_info.find(loops => loops.Started === false);
                        query.Started = true;
                        ret += "".padStart(parts[0].search(/\S/),' ')+"_loop"+query.ID+":\n";
                        try { rel_stmt = createStatement( parts[1], parts[2], parts[3], i); }
                        catch (error) { return  error; }
                        jmp_string = "_loop"+query.ID+"_end";
                        ret += "".padStart(parts[0].search(/\S/),' ')+rel_stmt+" :"+jmp_string+lineAftCom+"\n";
                        break;
                    case RegexID.LOOP:
                        query=loops_info.filter(loops => loops.Started === true && loops.Ended === false).pop();
                        query.Ended = true;
                        ret += "".padStart(parts[0].search(/\S/),' ')+"JMP :_loop"+query.ID+lineAftCom+"\n";
                        ret += "".padStart(parts[0].search(/\S/),' ')+"_loop"+query.ID+"_end:\n";
                        break;
                    case RegexID.REPEAT:
                        query = loops_info.find(loops => loops.Started === false);
                        query.Started = true;
                        ret += "".padStart(parts[0].search(/\S/),' ')+"_loop"+query.ID+":"+lineAftCom+"\n";
                        break;
                    case RegexID.UNTIL:
                        query=loops_info.filter(loops => loops.Started === true && loops.Ended === false).pop();
                        try { rel_stmt = createStatement( parts[1], parts[2], parts[3], i); }
                        catch (error) { return  error; }
                        jmp_string = "_loop"+query.ID;
                        query.Ended = true;
                        ret += "".padStart(parts[0].search(/\S/),' ')+rel_stmt+" :"+jmp_string+lineAftCom+"\n";
                        ret += "".padStart(parts[0].search(/\S/),' ')+"_loop"+query.ID+"_end:\n";
                        break;
                    case RegexID.CONTINUE:
                        query=loops_info.filter(loops => loops.Started === true && loops.Ended === false).pop();
                        ret += "".padStart(parts[0].search(/\S/),' ')+"   JMP :_loop"+query.ID+lineAftCom+"\n";
                        break;
                    case RegexID.BREAK:
                        query=loops_info.filter(loops => loops.Started === true && loops.Ended === false).pop();
                        ret += "".padStart(parts[0].search(/\S/),' ')+"JMP :_loop"+query.ID+"_end"+lineAftCom+"\n";
                        break;
                     case RegexID.CALL_RET:
                        if (parts.length == 3){ //no parameters gave
                            ret+="".padStart(parts[0].search(/\S/),' ')+"JSR :"+parts[2]+"\n";
                            ret+="".padStart(parts[0].search(/\S/),' ')+"POP "+parts[1]+"\n";
                            break;
                        }
                        params = parts[3].split(" ");
                        for (let x=params.length; x>0; x--){
                            if (params[x-1].length > 0)
                                ret+="".padStart(parts[0].search(/\S/),' ')+"PSH $"+params[x-1]+"\n";
                        }
                        ret+="".padStart(parts[0].search(/\S/),' ')+"JSR :"+parts[2]+"\n";
                        ret+="".padStart(parts[0].search(/\S/),' ')+"POP @"+parts[1]+"\n";
                        break;
                    case RegexID.CALL:
                        if (parts.length == 2){ //no parameters gave
                            ret+="".padStart(parts[0].search(/\S/),' ')+"JSR :"+parts[1]+"\n";
                            break;
                        }
                        params = parts[2].split(" ");
                        for (let x=params.length; x>0; x--){
                            if (params[x-1].length > 0)
                                ret+="".padStart(parts[0].search(/\S/),' ')+"PSH $"+params[x-1]+"\n";
                        }
                        ret+="".padStart(parts[0].search(/\S/),' ')+"JSR :"+parts[1]+"\n";
                        break;
                    default:
                        ret+="not implemented\n";
                        break;
                }
                j=RegexCode.length;//break regex loop
            }
        }
        if (rFound == 0)
            ret+=lineBefCom+lineAftCom+"\n";
    }
    return ret;
    
    //translates expression to assembly instructions (inversed logic)
    function createStatement( var1, condition, var2, line) {
        var stmt;
        
        if (var2 == "0") { //possible use of branch zero
            switch(condition) {
                case "==":
                    stmt="BNZ $"+var1;
                    break;
                case "!=":
                    stmt="BZR $"+var1;
                    break;
                default:
                    throw "error line "+line+": only == 0 or != 0  are allowed";
            }
        } else { //possible variable name
            if (var2.length == 1 && var2.toString() > 0)
                throw "error line "+line+": only value zero is allowed";
            else { //sure is variable name
                switch(condition) {
                    case "==":
                     stmt="BNE";
                     break;
                    case "!=":
                        stmt="BEQ";
                        break;
                    case  ">":
                        stmt="BLE"
                        break;
                    case ">=":
                        stmt="BLT"
                        break;
                    case  "<":
                        stmt="BGE"
                        break;
                    case "<=":
                        stmt="BGT"
                        break;
                    default:
                        throw "error line "+line+": only ==, !=, >, <, >=, <= relational operators are allowed";
                }
                stmt += " $"+var1+" $"+var2;
            }
        }
        return stmt;
    }
}
