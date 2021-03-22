# Smart Contractor AT Tools
Collection of tools long time ago available for use with burstcoin

## Usage
Download the 2 files <index.html / at.js> and open them up in your internet browser for a local copy of the compiler. Alternatively use on gitpages.

## Recent improvements:
### Page “AT Assembler“
* Added support for indented text. No problems with spaces or tabs before instructions
* Growable textarea. Better page navigation
* Responsive textarea border color. When the code has an error, it turns red. Easy to check if code is OK with bigger programs.
* Removed annoying spellcheck.
* Added option to use `;` as comment, even on line with code.
### Page “Examine ATs”
* Just paste the full address for an api call to getATDetails Ex: http://localhost:6876/burst?requestType=getATDetails&at=3822295204055565051 where the at number is the same number from transaction it was created. It will show decompiled code and also actual state of variables

## Note
Recent modifications based on version found in antonyip BurstAT repository.
