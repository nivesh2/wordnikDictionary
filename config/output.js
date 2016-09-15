'use strict';

module.exports = {
  help : `This is Command Line Dictionary HELP GUIDE:

command:
./dict <operation> <word>

operations:
 - def for definitions
 - syn for synonyms
 - ant for antonyms
 - ex for examples
 - word for all of the above
 - play to start a game.

Example to get definition of word "hacking":
./dict def hacking`,
  errBlankWord : 'Word required',
  errCommand : 'Invalid command. type ./dict --help for help',
  gameChoice : `Select from Below Options:
   1. Try Again
   2. Hint
   3. Quit
   Enter Number:`,
} ;
