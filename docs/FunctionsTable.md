# API functions
Functions to be used with `FUN` instruction, hex codes `0x32` to `0x37`.

## 0x0100..0x01ff - Get/Set functions for "pseudo registers"

### Already implemented

| Hex | Function name | Example | API function name (CIYAM docs) | Operation (and comments) |
| --- | --- | --- | --- | --- |
| 0x0100 | get_A1 | FUN @addr get_A1 | Get_A1 | sets @addr to A1 |
| 0x0101 | get_A2 | FUN @addr get_A2 | Get_A2 | sets @addr to A2 |
| 0x0102 | get_A3 | FUN @addr get_A3 | Get_A3 | sets @addr to A3 |
| 0x0103 | get_A4 | FUN @addr get_A4 | Get_A4 | sets @addr to A4 |
| 0x0104 | get_B1 | FUN @addr get_B1 | Get_B1 | sets @addr to B1 |
| 0x0105 | get_B2 | FUN @addr get_B2 | Get_B2 | sets @addr to B2 |
| 0x0106 | get_B3 | FUN @addr get_B3 | Get_B3 | sets @addr to B3 |
| 0x0107 | get_B4 | FUN @addr get_B4 | Get_B4 | sets @addr to B4 |
| 0x0110 | set_A1 | FUN set_A1 $addr | Set_A1 | sets A1 from $addr |
| 0x0111 | set_A2 | FUN set_A2 $addr | Set_A2 | sets A2 from $addr |
| 0x0112 | set_A3 | FUN set_A3 $addr | Set_A3 | sets A3 from $addr |
| 0x0113 | set_A4 | FUN set_A4 $addr | Set_A4 | sets A4 from $addr |
| 0x0114 | set_A1_A2 | FUN set_A1_A2 $addr1 $addr2 | Set_A1_A2 | sets A1 from $addr1 and A2 from $addr2 |
| 0x0115 | set_A3_A4 | FUN set_A3_A4 $addr1 $addr2 | Set_A3_A4 | sets A3 from $addr1 and A4 from $addr2 |
| 0x0116 | set_B1 | FUN set_B1 $addr | Set_B1 | sets B1 from $addr |
| 0x0117 | set_B2 | FUN set_B2 $addr | Set_B2 | sets B2 from $addr |
| 0x0118 | set_B3 | FUN set_B3 $addr | Set_B3 | sets B3 from $addr |
| 0x0119 | set_B4 | FUN set_B4 $addr | Set_B4 | sets B4 from $addr |
| 0x011a | set_B1_B2 | FUN set_B1_B2 $addr1 $addr2 | Set_B1_B2 | sets B1 from $addr1 and B2 from $addr2 |
| 0x011b | set_B3_B4 | FUN set_B3_B4 $addr1 $addr2 | Set_B3_B4 | sets B3 from $addr1 and B4 from $addr2 |
| 0x0120 | clear_A | FUN clear_A | Clear_A | sets A to zero (A being A1..4) |
| 0x0121 | clear_B | FUN clear_B | Clear_B | sets B to zero (B being B1..4) |
| 0x0122 | clear_A_B | FUN clear_A_B | Clear_A_And_B | sets both A and B to zero |
| 0x0123 | copy_A_From_B | FUN copy_A_From_B | Copy_A_From_B | copies B into A |
| 0x0124 | copy_B_From_A | FUN copy_B_From_A | Copy_B_From_A | copies A into B |
| 0x0125 | check_A_Is_Zero | FUN @addr check_A_Is_Zero | Check_A_Is_Zero | @addr to 1 if A is zero or 0 if it is not (i.e. bool) |
| 0x0126 | check_B_Is_Zero | FUN @addr check_B_Is_Zero | Check_B_Is_Zero | @addr to 1 if B is zero of 0 if it is not (i.e. bool) |
| 0x0127 | check_A_equals_B | FUN @addr check_A_equals_B | Check_A_Equals_B | @addr to bool if A is equal to B |
| 0x0128 | swap_A_and_B | FUN swap_A_and_B | Swap_A_and_B | swap the values of A and B |
| 0x0129 | OR_A_with_B | FUN OR_A_with_B | OR_A_with_B | sets A to A | B (bitwise OR) |
| 0x012a | OR_B_with_A | FUN OR_B_with_A | OR_B_with_A | sets B to B | A (bitwise OR) |
| 0x012b | AND_A_with_B | FUN AND_A_with_B | AND_A_with_B | sets A to A & B (bitwise AND) |
| 0x012c | AND_B_with_A | FUN AND_B_with_A | AND_B_with_A | sets B to B & A (bitwise AND) |
| 0x012d | XOR_A_with_B | FUN XOR_A_with_B | XOR_A_with_B | sets A to A ^ B (bitwise XOR) |
| 0x012e | XOR_B_with_A | FUN XOR_B_with_A | XOR_B_with_A | sets B to B ^ A (bitwise XOR) |

### Pending implementation

| Hex | Function name | Example | API function name (CIYAM docs) | Operation (and comments) |
| --- | --- | --- | --- | --- |
| 0x0140 | add_A_to_B | FUN add_A_to_B | Add_A_To_B | adds A to B (result in B) |
| 0x0141 | add_B_to_A | FUN add_B_to_A | Add_B_To_A | adds B to A (result in A) |
| 0x0142 | sub_A_from_B | FUN sub_A_from_B | Sub_A_From_B | subs A from B (result in B) |
| 0x0143 | sub_B_from_A | FUN sub_B_from_A | Sub_B_From_A | subs B from A (result in A) |
| 0x0144 | mul_A_by_B | FUN mul_A_by_B | Mul_A_By_B | multiplies A by B (result in B) |
| 0x0145 | mul_B_by_A | FUN mul_B_by_A | Mul_B_By_A | multiplies B by A (result in A) |
| 0x0146 | div_A_by_B | FUN div_A_by_B | Div_A_By_B | • divides A by B (result in B) |
| 0x0147 | div_B_by_A | FUN div_B_by_A | Div_B_By_A | • divides B by A (result in A) |

• These functions could cause a divide by zero error which would put the machine in error

## 0x0200..0x02ff - Functions that perform hash operations

| Hex | Function name | Example | API function name (CIYAM docs) | Operation (and comments) |
| --- | --- | --- | --- | --- |
| 0x0200 | MD5_A_to_B | FUN MD5_A_to_B | MD5_A_To_B | take an MD5 hash of A1..2 and put this is B1..2 |
| 0x0201 | check_MD5_A_with_B | FUN @addr check_MD5_A_with_B | Check_MD5_A_With_B | @addr to bool if MD5 hash of A1..2 matches B1..2 |
| 0x0202 | HASH160_A_to_B | FUN HASH160_A_to_B | HASH160_A_To_B | take a RIPEMD160 hash of A1..3 and put this in B1..3 |
| 0x0203 | check_HASH160_A_with_B | FUN @addr check_HASH160_A_with_B | Check_HASH160_A_With_B | @addr to bool if RIPEMD160 hash of A1..3 matches B1..3 |
| 0x0204 | SHA256_A_to_B | FUN SHA256_A_to_B | SHA256_A_To_B | take a SHA256 hash of A and put this in B |
| 0x0205 | check_SHA256_A_with_B | FUN @addr check_SHA256_A_with_B | Check_SHA256_A_With_B | @addr to bool if SHA256 hash of A matches B |

## 0x0300..0x03ff - Generic functions that get block and tx info

| Hex | Function name | Example | API function name (CIYAM docs) | Operation (and comments) |
| --- | --- | --- | --- | --- |
| 0x0300 | get_Block_Timestamp | FUN @addr get_Block_Timestamp | Get_Block_Timestamp | sets @addr to the timestamp of the current block |
| 0x0301 | get_Creation_Timestamp | FUN @addr get_Creation_Timestamp | Get_Creation_Timestamp | sets @addr to the timestamp of the AT creation block |
| 0x0302 | get_Last_Block_Timestamp | FUN @addr get_Last_Block_Timestamp | Get_Last_Block_Timestamp | sets @addr to the timestamp of the previous block |
| 0x0303 | put_Last_Block_Hash_In_A | FUN put_Last_Block_Hash_In_A | Put_Last_Block_Hash_In_A | puts the block hash of the previous block in A |
| 0x0304 | A_to_Tx_after_Timestamp | FUN A_to_Tx_after_Timestamp $addr | A_To_Tx_After_Timestamp | sets A to tx hash of the first tx after $addr timestamp |
| 0x0305 | get_Type_for_Tx_in_A | FUN @addr get_Type_for_Tx_in_A | Get_Type_For_Tx_In_A | • if A is a valid tx then @addr to tx type |
| 0x0306 | get_Amount_for_Tx_in_A | FUN @addr get_Amount_for_Tx_in_A | Get_Amount_For_Tx_In_A | •• if A is a valid tx then @addr to tx amount |
| 0x0307 | get_Timestamp_for_Tx_in_A | FUN @addr get_Timestamp_for_Tx_in_A | Get_Timestamp_For_Tx_In_A | if A is a valid tx then @addr to the tx timestamp |
| 0x0308 | get_Ticket_Id_for_Tx_in_A | FUN @addr get_Ticket_Id_for_Tx_in_A | Get_Random_Id_For_Tx_In_A | ••• if A is a valid tx then @addr to the tx random id |
| 0x0309 | message_from_Tx_in_A_to_B | FUN message_from_Tx_in_A_to_B | Message_From_Tx_In_A_To_B | •••• if A is a valid tx then B to the tx message |
| 0x030a | B_to_Address_of_Tx_in_A | FUN B_to_Address_of_Tx_in_A | B_To_Address_Of_Tx_In_A | if A is a valid tx then B set to the tx address |
| 0x030b | B_to_Address_of_Creator | FUN B_to_Address_of_Creator | B_To_Address_Of_Creator | sets B to the address of the AT's creator |

• Tx type is 0 for a normal tx and 1 for a message tx <br>
•• Amount will always have the minimum fee subtracted from it<br>
••• A random id is a 64 bit signed value (that is always returned positive) and this is a blocking function<br>
•••• If the tx does not include a message tx then this will zero out the B value

Note: For all cases where A isnot a valid tx @addr will be set to 0xffffffffffffffff

## 0x0400..0x04ff - Generic functions that check balances and perform ops

| Hex | Function name | Example | API function name (CIYAM docs) | Operation (and comments) |
| --- | --- | --- | --- | --- |
| 0x0400 | get_Current_Balance | FUN @addr get_Current_Balance | Get_Current_Balance | sets @addr to current balance of the AT |
| 0x0401 | get_Previous_Balance | FUN @addr get_Previous_Balance | Get_Previous_Balance | • sets @addr to the balance it had last had when running |
| 0x0402 | send_to_Address_in_B | FUN send_to_Address_in_B $addr | Send_To_Address_In_B | •• if B is a valid address then send it $addr amount |
| 0x0403 | send_All_to_Address_in_B | FUN send_All_to_Address_in_B | Send_All_To_Address_In_B | if B is a valid address then send it the entire balance |
| 0x0404 | send_Old_to_Address_in_B | FUN send_Old_to_Address_in_B | Send_Old_To_Address_In_B | •• if B is a valid address then send it the old balance |
| 0x0405 | send_A_to_Address_in_B | FUN send_A_to_Address_in_B | Send_A_To_Address_In_B | if B is a valid address then send it A as a message |
| 0x0406 | add_Minutes_to_Timestamp | FUN @addr1 add_Minutes_to_Timestamp $addr2 $addr3 | Add_Minutes_To_Timestamp | ••• set @addr1 to timestamp $addr2 plus $addr3 minutes |

• This amount does not include any additional amounts sent to the AT between "execution events"<br>
•• If this amount is greater than the AT's balance then it will only send the current balance amount<br>
••• The API is expected to base this timestamp according to the "average block time" for the blockchain<br>
