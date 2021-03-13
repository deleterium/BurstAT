# BurstAT: low level programming for Burstcoin Automated Transactions

## About this place
This is a learning place, where you can find tools to create simple Smart Contracts on Burstcoin blockchain. Some skills in assembler language will be needed. If you want to program in hi level, check [BlockTalk](https://github.com/burst-apps-team/blocktalk), it is a great project! Specifications for burstcoin ATs are quite simple, and much easier to learn (compared to recent computers) you are willing to learn about assembler codes.

## First tool
Many years ago a javascript compiler, know as [Smart Contractor AT Tools](./htmlcompiler/SmartContractor.html) was the only tool to create your own AT (Automated Transactions). This ancient tool still works great for compiling and will be used!

## Documentation
Take a brief look at [official page documentation for AT](http://ciyam.org/at/). It is a bit intimidating at start, but is a great reference once you have started. Check also [burstcoin page for miners](https://www.burst-coin.org/introduction/for-miners/) and get more information, better!

## Examples
Many examples can be found [here](./examples), and you must take advantage of them! Please note that some function names were implemented differently in Smart Contractor. Check a list with all [opCodes](./docs/InstructionsTable.md) and [function names](./docs/FunctionsTable.md).

## Starting guide
Of course you will need a full node running Burstcoin to start testing. I assume you already know how to create an address, run a full node and mining, because they will be needed for your tests. If you are still there the next steps are:
* Get the latest [brs developer release](https://github.com/burst-apps-team/burstcoin/releases) and keep in another folder (never mix stable client and developer client)
* Change configuration to sync to the testnet (DEV options in conf file)
* Sync your blockchain
* Now, change to offline mode and active time warp. Use 4 to create a block per minute
* Start again your client and use the button "pop off max"
* Start mining, your address will forge all blocks and you will get rewards (you don't need big plot files, around 200G should be ok)
* Use the page localhost:6876/api-doc to create and test your ATs!

# Advanced tools
Smart contractor has a page "Examine ATs". Just paste the full address for an api call to **getATDetails** Ex: http://localhost:6876/burst?requestType=getATDetails&at=3822295204055565051 where the at number is the same number from transaction it was created.
It is also available a better [Burstcoin AT Decompiler](./decompiler/decompiler.html) created by community. Use them together to have best of both worlds.
