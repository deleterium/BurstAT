# Instructions table

## Operational codes / Machine instructions
Table showing machine instructions, operational codes, usage and comments. Example collumn applies to Smart Contractor assembler. Op Code and Operation collumns are taken from CIYAM docs.

| Hex | Code | Example | Op Code | Additional | Operation (and comments) |
| --- | --- | --- | --- | --- | --- |
| 0x7f | NOP | NOP | NOP |  | (can be used for padding if required) |
| 0x01 | SET | SET @addr #value | SET_VAL | addr,value | @addr = value |
| 0x02 | SET | SET @addr1 $addr2 | SET_DAT | addr1,addr2 | @addr1 = $addr2 |
| 0x03 | CLR | CLR @addr | CLR_DAT | addr | @addr = 0 (to save space rather than using SET_VAL with 0) |
| 0x04 | INC | INC @addr | INC_DAT | addr | @addr += 1 |
| 0x05 | DEC | DEC @addr | DEC_DAT | addr | @addr -= 1 |
| 0x06 | ADD | ADD @addr1 $addr2 | ADD_DAT | addr1,addr2 | @addr1 += $addr2 |
| 0x07 | SUB | SUB @addr1 $addr2 | SUB_DAT | addr1,addr2 | @addr1 -= $addr2 |
| 0x08 | MUL | MUL @addr1 $addr2 | MUL_DAT | addr1,addr2 | @addr1 *= $addr2 |
| 0x09 | DIV | DIV @addr1 $addr2 | DIV_DAT | addr1,addr2 | @addr1 /= $addr2 |
| 0x0a | BOR | BOR @addr1 $addr2 | BOR_DAT | addr1,addr2 | @addr1 \|= $addr2 |
| 0x0b | AND | AND @addr1 $addr2 | AND_DAT | addr1,addr2 | @addr1 &= $addr2 |
| 0x0c | XOR | XOR @addr1 $addr2 | XOR_DAT | addr1,addr2 | @addr1 ^= $addr2 |
| 0x0d | NOT | DEC @addr | NOT_DAT | addr | @addr = ~$addr (bitwise not) |
| 0x0e | SET | SET @addr1 $($addr2) | SET_IND | addr1,addr2 | @addr1 = $($addr2) (fetch indirect) |
| 0x0f | SET | SET @addr1 $($addr2 + $addr3) | SET_IDX | addr1,addr2,addr3 | @addr1 = $($addr2 + $addr3) (fetch indirect indexed) |
| 0x10 | PSH | PSH @addr | PSH_DAT | addr | @--ustack_top = $addr |
| 0x11 | POP | POP @addr | POP_DAT | addr | $addr = @ustack_top++ |
| 0x12 | JSR | JSR :label | JMP_SUB | addr | @--cstack_top = pc + 5, pc = addr |
| 0x13 | RET | RET | RET_SUB |  | pc = @cstack_top++ |
| 0x14 | SET | SET @($addr1) $addr2 | IND_DAT | addr1,addr2 | @($addr1) = $addr2 (store indirect) |
| 0x15 | SET | SET @($addr1 + $addr2) $addr3 | IDX_DAT | addr1,addr2,addr3 | @($addr1 + $addr2) = $addr3 (store indirect indexed) |
| 0x16 | MOD | MOD @addr1 $addr2 | MOD_DAT | addr1,addr2 | @addr1 %= $addr2 |
| 0x17 | SHL | SHL @addr1 $addr2 | SHL_DAT | addr1,addr2 | @addr1 <<= $addr2 |
| 0x18 | SHR | SHR @addr1 $addr2 | SHR_DAT | addr1,addr2 | @addr1 >>= $addr2 |
| 0x1a | JMP | JMP :label | JMP_ADR | addr | pc = addr |
| 0x1b | BZR | BZR $addr :label | BZR_DAT | addr,offset | if $addr == 0 then pc += offset |
| 0x1e | BNZ | BNZ $addr :label | BNZ_DAT | addr,offset | if $addr != 0 then pc += offset |
| 0x1f | BGT | BNZ $addr1 $addr2 :label | BGT_DAT | addr1,addr2,offset | if $addr1 > $addr2 then pc += offset |
| 0x20 | BLT | BLT $addr1 $addr2 :label | BLT_DAT | addr1,addr2,offset | if $addr1 < $addr2 then pc += offset |
| 0x21 | BGE | BGE $addr1 $addr2 :label | BGE_DAT | addr1,addr2,offset | if $addr1 >= $addr2 then pc += offset |
| 0x22 | BLE | BLE $addr1 $addr2 :label | BLE_DAT | addr1,addr2,offset | if $addr1 <= $addr2 then pc += offset |
| 0x23 | BEQ | BEQ $addr1 $addr2 :label | BEQ_DAT | addr1,addr2,offset | if $addr1 == $addr2 then pc += offset |
| 0x24 | BNE | BNE $addr1 $addr2 :label | BNE_DAT | addr1,addr2,offset | if $addr1 != $addr2 then pc += offset |
| 0x25 | SLP | SLP $addr | SLP_DAT | addr | • sleep $addr blocks |
| 0x26 | FIZ | FIZ $addr | FIZ_DAT | addr | if $addr == 0 then pc = pcs and stop |
| 0x27 | STZ | STZ $addr | STZ_DAT | addr | if $addr == 0 then stop |
| 0x28 | FIN | FIN | FIN_IMD |  | pc = pcs and stop |
| 0x29 | STP | STP | STP_IMD |  | stop |
| 0x2a |  |  | SLP_IMD |  | •• sleep until the next block |
| 0x2b | ERR | ERR :label | ERR_ADR | addr | pce = addr |
| 0x30 | PCS | PCS | SET_PCS |  | pcs = pc + 1 |
| 0x32 | FUN | FUN functionName | EXT_FUN | func | func( ) |
| 0x33 | FUN | FUN functionName $addr | EXT_FUN_DAT | func,addr | func( $addr ) |
| 0x34 | FUN | FUN functionName $addr1 $addr2 | EXT_FUN_DAT_2 | func,addr1,addr2 | func( $addr1, $addr2 ) |
| 0x35 | FUN | FUN @addr functionName | EXT_FUN_RET | func,addr | @addr = func( ) |
| 0x36 | FUN | FUN @addr1 functionName $addr2 | EXT_FUN_RET_DAT | func,addr1,addr2 | @addr1 = func( $addr2 ) |
| 0x37 | FUN | FUN @addr1 functionName $addr2 $addr3 | EXT_FUN_RET_DAT_2 | func,addr1,addr2,addr3 | @addr1 = func( $addr2, $addr3 ) |

• Number of blocks to sleep. One, zero or any negative number to wait until next block.
•• Not implemented in signum. If used, same behaviour as STP_IMD.

Check also [function names page](./FunctionTables.md) to see all available options to use with FUN instruction.
