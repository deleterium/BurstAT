# String Manipulation functions
It is much faster to code when there are libraries available. The functions here are tested and shall work, giving some limitations as described.

## atoi
Simple function to convert **A**SCII **to I**nteger. This implementation only converts a long integer `val` containing an array of bytes limited to 8 chars. If any byte is not a char in range from `0` to `9`, this function stops processing and return `ret` value processed until that event. If that event is the first char, it returns zero.

### Similar C implementation - atoi
```c
// Iterative function to implement atoi() function in C
// Expects a long containing a string. If any byte is not a char numeric
// representation, then stop and return. Only positive numbers, decimal, 
// and integers are converted. Returns zero if no number was processed.
long atoi(long val)
{
    long ret = 0, temp;
    
    do
    {
        temp = (0xff & val) - '0';
        
        if (temp < 0 )
            break;
        if (temp >= 10)
            break;

        ret = (ret * 10 ) + temp;
        val = val >> 8;
    } while (TRUE);
 
    return ret;
}
```

### Assembler code - function_atoi
```
^comment Iterative function to implement atoi() function in C
^comment Expects a long containing a string. If any byte is not a char numeric
^comment representation, then stop and return. Only positive numbers, decimal, 
^comment and integers are converted. Returns zero if no number was processed.
^comment    prototype long atoi(long val)

^comment Start setup: Put these constants at the start of program
SET @0x00 #0000000000000000
SET @0x08 #0000000000000008
SET @0x0a #000000000000000a
SET @0x30 #0000000000000030
SET @0xff #00000000000000ff
^comment End setup

function_atoi:
^declare val
^declare eax
^declare ret

POP @val
CLR @ret

atoi_do_loop:
SET @eax $val
AND @eax $0xff
SUB @eax $0x30
BGE $eax $0x00 :atoi_next
JMP :atoi_return
atoi_next:
BLT $eax $0x0a :atoi_next2
JMP :atoi_return

atoi_next2:
MUL @ret $0x0a
ADD @ret $eax
SHR @val $0x08
JMP :atoi_do_loop

atoi_return:
PSH $eax
RET
```

## itoa
Simple function to convert **I**nteger **to A**SCII. This implementation only converts a positive long integer `val` that can be represented as an array of 8 chars. If `val` is negative or bigger than `99999999`, this function returns a long representing `#error`.

### Similar C implementation - itoa
```c
#define MAX_STRING_VALUE 99999999 /* 0x5F5E0FF */
#define STR_ERROR 0x726f72726523 /* #error */

// Iterative function to implement itoa() function in C
// Expects a long. If number is negative or bigger than MAX_STRING
// (it will not fit in 8 chars), returns a long meaning "#error".
long itoa(long val)
{
    long ret;
    long temp;
    
    if (val >= 0 && val <= MAX_STRING_VALUE) {
        if (val == 0)
            return '0';

        ret = 0;
        do {
            if (val == 0)
                return ret;
            temp = (val % 10 ) + '0';
            ret = (ret << 8) + temp;
            val /= 10;
        } while (TRUE);
    }
    
    return STR_ERROR;
}
```

### Assembler code - function_itoa
```
^comment Iterative function to implement itoa() function in C
^comment Expects a long. If number is  less than zero or bigger than MAX_STRING
^comment (it will not fit in a long), returns long meaning "#error".
^comment    prototype long itoa(long val)

^comment Start setup: Put these constants at the start of program
SET @0x00 #0000000000000000
SET @0x08 #0000000000000008
SET @0x0a #000000000000000a
SET @0x30 #0000000000000030
SET @MAX_STRING_VALUE #0000000005f5e0ff
SET @STR_ERROR #726f72726523
^comment End setup

function_itoa:
^declare val
^declare eax
^declare ret

POP @val
BLT $val $0x00 :itoa_if_false
BGT $val $MAX_STRING_VALUE :itoa_if_false
JMP :itoa_if_true
itoa_if_false:
PSH $STR_ERROR
RET
itoa_if_true:
BNZ $val :itoa_next
PSH $0x30
RET
itoa_next:

CLR @ret
itoa_loop:
BNZ $val :itoa_next2
PSH $ret
RET
itoa_next2:
SET @eax $val
MOD @eax $0x0a
ADD @eax $0x30
SHL @ret $0x08
ADD @ret $eax
DIV @val $0x0a
JMP :itoa_loop
```
