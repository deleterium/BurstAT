# Smart Contractor functions help
This document explains how to use API functions in Smart Contractor AT Assembler and the expected behaviour in burstcoin stable branch (now  BRS 2.5 ).

## 0x0100..0x01ff - Get/Set functions for "pseudo registers"

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

**0x0125: check_A_Is_Zero** `FUN @addr check_A_Is_Zero` <br>Sets @addr to 1 if A is zero or 0 if it is not (i.e. bool)

**0x0126: check_B_Is_Zero** `FUN @addr check_B_Is_Zero` <br>Sets @addr to 1 if B is zero of 0 if it is not (i.e. bool)

**0x0127: check_A_equals_B** `FUN @addr check_A_equals_B` <br>Sets @addr to 1 if A is equal to B or 0 if it is not.

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
TODO

## 0x0300..0x03ff - Generic functions that get block and tx info
TODO

## 0x0400..0x04ff - Generic functions that check balances and perform ops
TODO
