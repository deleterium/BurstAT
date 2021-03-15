# Smart Contractor functions help
This document explains how to use API functions in Smart Contractor AT Assembler and the expected behaviour in burstcoin stable branch (now  BRS 2.5 ).

## 0x0100..0x01ff - Get/Set functions for "pseudo registers"
A and B are 256-bit special variables called pseudo-registers. Regular variables are 64-bit, so you will need 4 of them to fill a pseudo-register. To make this possible, A and B can be set in parts, 64-bit each one. Ex: if A is value 0x1111111122222222333333334444444455555555666666667777777788888888 then A1 is 0x7777777788888888, A2 0x5555555566666666, A3 0x3333333344444444 and A4 0x1111111122222222.

**0x0100: get_A1** `FUN @addr get_A1` <br>Sets @addr to A1

**0x0101: get_A2** `FUN @addr get_A2` <br>Sets @addr to A2

**0x0102: get_A3** `FUN @addr get_A3` <br>Sets @addr to A3

**0x0103: get_A4** `FUN @addr get_A4` <br>Sets @addr to A4

**0x0104: get_B1** `FUN @addr get_B1` <br>Sets @addr to B1

**0x0105: get_B2** `FUN @addr get_B2` <br>Sets @addr to B2

**0x0106: get_B3** `FUN @addr get_B3` <br>Sets @addr to B3

**0x0107: get_B4** `FUN @addr get_B4` <br>Sets @addr to B4

**0x0110: set_A1** `FUN set_A1 $addr` <br>Sets A1 from $addr

**0x0111: set_A2** `FUN set_A2 $addr` <br>Sets A2 from $addr

**0x0112: set_A3** `FUN set_A3 $addr` <br>Sets A3 from $addr

**0x0113: set_A4** `FUN set_A4 $addr` <br>Sets A4 from $addr

**0x0114: set_A1_A2** `FUN set_A1_A2 $addr1 $addr2` <br>Sets A1 from $addr1 and A2 from $addr2

**0x0115: set_A3_A4** `FUN set_A3_A4 $addr1 $addr2` <br>Sets A3 from $addr1 and A4 from $addr2

**0x0116: set_B1** `FUN set_B1 $addr` <br>Sets B1 from $addr

**0x0117: set_B2** `FUN set_B2 $addr` <br>Sets B2 from $addr

**0x0118: set_B3** `FUN set_B3 $addr` <br>Sets B3 from $addr

**0x0119: set_B4** `FUN set_B4 $addr` <br>Sets B4 from $addr

**0x011a: set_B1_B2** `FUN set_B1_B2 $addr1 $addr2` <br>Sets B1 from $addr1 and B2 from $addr2

**0x011b: set_B3_B4** `FUN set_B3_B4 $addr1 $addr2` <br>Sets B3 from $addr1 and B4 from $addr2

**0x0120: clear_A** `FUN clear_A` <br>Sets A to zero (A being A1..4)

**0x0121: clear_B** `FUN clear_B` <br>Sets B to zero (B being B1..4)

**0x0122: clear_A_B** `FUN clear_A_B` <br>Sets both A and B to zero

**0x0123: copy_A_From_B** `FUN copy_A_From_B` <br>Copies B into A

**0x0124: copy_B_From_A** `FUN copy_B_From_A` <br>Copies A into B

**0x0125: check_A_Is_Zero** `FUN @addr check_A_Is_Zero` <br>Sets @addr to 0 if A is zero or 1 if it is not (i.e. bool) Pay close attention on function implementation below:
```javascript
function check_B_Is_Zero() {
   if (B1 == 0 && B2 == 0 && B3 == 0 && B4 == 0 )
      return 0;
   else
      return 1;
}
```

**0x0126: check_B_Is_Zero** `FUN @addr check_B_Is_Zero` <br>Sets @addr to 0 if B is zero of 1 if it is not (i.e. bool). Pay close attention on function implementation below:
```javascript
function check_B_Is_Zero() {
   if (B1 == 0 && B2 == 0 && B3 == 0 && B4 == 0 )
      return 0;
   else
      return 1;
}
```

**0x0127: check_A_equals_B** `FUN @addr check_A_equals_B` <br>Sets @addr to 1 if A is equal to B or 0 if it is not. Now the function returns the expected bool value:
```javascript
function check_A_equals_B() {
   if (A1 == B1 && A2 == B2 && A3 == B3 && A4 == B4 )
      return 1;
   else
      return 0;
}
```

**0x0128: swap_A_and_B** `FUN swap_A_and_B` <br>Swap the values of A and B

**0x0129: OR_A_with_B** `FUN OR_A_with_B` <br>Sets A to A | B (bitwise OR)

**0x012a: OR_B_with_A** `FUN OR_B_with_A` <br>Sets B to B | A (bitwise OR)

**0x012b: AND_A_with_B** `FUN AND_A_with_B` <br>Sets A to A & B (bitwise AND)

**0x012c: AND_B_with_A** `FUN AND_B_with_A` <br>Sets B to B & A (bitwise AND)

**0x012d: XOR_A_with_B** `FUN XOR_A_with_B` <br>Sets A to A ^ B (bitwise XOR)

**0x012e: XOR_B_with_A** `FUN XOR_B_with_A` <br>Sets B to B ^ A (bitwise XOR)

**0x0140: add_A_to_B** `FUN add_A_to_B` <br>Sets B to A + B (no carry indication)

**0x0141: add_B_to_A** `FUN add_B_to_A` <br>Sets A to A + B (no carry indication)

**0x0142: sub_A_from_B** `FUN sub_A_from_B` <br>Sets B to B - A

**0x0143: sub_B_from_A** `FUN sub_B_from_A` <br>Sets A to A - B

**0x0144: mul_A_by_B** `FUN mul_A_by_B` <br>Sets B to A * B

**0x0145: mul_B_by_A** `FUN mul_B_by_A` <br>Sets A to A * B

**0x0146: div_A_by_B** `FUN div_A_by_B` <br>Sets B to A / B. If B is zero, does nothing.

**0x0147: div_B_by_A** `FUN div_B_by_A` <br>Sets A to B / A. If A is zero, does nothing.

## 0x0200..0x02ff - Functions that perform hash operations
Hashes will be stored in less significative bytes of pseudo-registers and the remaining bytes will be zero.

**0x0200: MD5_A_to_B** `FUN MD5_A_to_B` <br>Take an MD5 hash of A1..2 and put this is B1..2

**0x0201: check_MD5_A_with_B** `FUN @addr check_MD5_A_with_B` <br>Sets @addr to 1 if MD5 hash of A1..2 matches B1..2 or 0 if it is not

**0x0202: HASH160_A_to_B** `FUN HASH160_A_to_B` <br>Take a RIPEMD160 hash of A1..3 and put this in B1..3

**0x0203: check_HASH160_A_with_B** `FUN @addr check_HASH160_A_with_B` <br>Sets @addr to 1 if RIPEMD160 hash of A1..3 matches B1..3 or 0 if it is not

**0x0204: SHA256_A_to_B** `FUN SHA256_A_to_B` <br>Take a SHA256 hash of A and put this in B

**0x0205: check_SHA256_A_with_B** `FUN @addr check_SHA256_A_with_B` <br>Sets @addr to 1 if SHA256 hash of A matches B or 0 if it is not

## 0x0300..0x03ff - Generic functions that get block and tx info
Timestamp is a long value (64-bit) that actually is an union between tx block height (32-bit MSB) and the tx number inside that block (32bit LSB). Example: the second tx of block 9 will have timestamp 0x0000000900000002 Ex: tx 25 (0x19) of block 675329 (0xa4e01) get timestamp 2900515969040409 (0x000a4e0100000019).

**0x0300: get_Block_Timestamp** `FUN @addr get_Block_Timestamp` <br>Sets @addr to the timestamp of the current block.

**0x0301: get_Creation_Timestamp** `FUN @addr get_Creation_Timestamp` <br>Sets @addr to the timestamp of the AT creation block.

**0x0302: get_Last_Block_Timestamp** `FUN @addr get_Last_Block_Timestamp` <br>Sets @addr to the timestamp of the previous block.

**0x0303: put_Last_Block_Hash_In_A** `FUN put_Last_Block_Hash_In_A` <br>Sets A to the block hash of the previous block.

**0x0304: A_to_Tx_after_Timestamp** `FUN A_to_Tx_after_Timestamp $addr` <br>Sets A to the next tx after $addr timestamp.

**0x0305: get_Type_for_Tx_in_A** `FUN @addr get_Type_for_Tx_in_A` <br>If A is a valid tx and has a message then sets @addr to 1. If A is a valid tx and has no message, sets @addr to 0. If A is not valid tx, sets @addr to -1.

**0x0306: get_Amount_for_Tx_in_A** `FUN @addr get_Amount_for_Tx_in_A` <br>If A is a valid tx, sets @addr to tx amount minus activation fee. If A is not valid tx, sets @addr to -1. Note that if A valid, function always returns a value >= 0, because a value smaller than activation fee will not wake up the contract.

**0x0307: get_Timestamp_for_Tx_in_A** `FUN @addr get_Timestamp_for_Tx_in_A` <br>If A is a valid tx then @addr to the tx timestamp. If a is not valid, returns -1.

**0x0308: get_Ticket_Id_for_Tx_in_A** `FUN @addr get_Ticket_Id_for_Tx_in_A` <br>If A is a valid tx then sets @addr to a pseudo-random value. The contract will sleep for 15 blocks (to get entropy) before return a value. If tx in A is not valid, returns -1 immediatly.

**0x0309: message_from_Tx_in_A_to_B** `FUN message_from_Tx_in_A_to_B` <br>If A is a valid tx and message.length <= 256-bit then sets B to the tx message. If the message is bigger than B size (4 longs) OR there is no message in tx OR tx in A is no valid, sets B to zero.

**0x030a: B_to_Address_of_Tx_in_A** `FUN B_to_Address_of_Tx_in_A` <br>If A is a valid tx then sets B to the tx address. If tx in A is not valid, clears B. Note that an address is one long in size, so B1 will have the address and B2..3 will be cleared.

**0x030b: B_to_Address_of_Creator** `FUN B_to_Address_of_Creator` <br>Sets B to the address of the AT's creator. Note that an address is one long in size, so B1 will have the address and B2..3 will be cleared.

## 0x0400..0x04ff - Generic functions that check balances and perform ops
Balances will be handle in NQT ammounts. 1 burst is 10.000.000 NQT. 1 NQT is the smallest quantity possible bigger than zero. Total supply for burstcoin will be 2.158.812.800 bursts, or 21.588.128.000.000.000 NQT or 0x4cb249bcce4000.

**0x0400: get_Current_Balance** `FUN @addr get_Current_Balance` <br>Sets @addr to current (atomic) balance of the AT. This is affected every new instruction is processed.

**0x0401: get_Previous_Balance** `FUN @addr get_Previous_Balance` <br>Sets @addr to the balance it had last time it was activated.

**0x0402: send_to_Address_in_B** `FUN send_to_Address_in_B $addr` <br>If B is a valid address then send it $addr amount. If the value is bigger than current balance, sends entire balance to B.

**0x0403: send_All_to_Address_in_B** `FUN send_All_to_Address_in_B` <br>If B is a valid address then send it the entire balance.

**0x0404: send_Old_to_Address_in_B** `FUN send_Old_to_Address_in_B` <br>If B is a valid address then send it the Previous Balance.

**0x0405: send_A_to_Address_in_B** `FUN send_A_to_Address_in_B` <br>If B is a valid address then send it A as a message.

**0x0406: add_Minutes_to_Timestamp** `FUN @addr1 add_Minutes_to_Timestamp $addr2 $addr3` <br>Sets @addr1 to timestamp $addr2 plus $addr3 minutes, where $addr1 and $addr2 are timestamps and $addr3 is minutes (long). This function expects that each block takes 4 minutes to be created (which is true in average).
