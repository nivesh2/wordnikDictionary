'use strict';
/*
 * Entry file
 * takes input from the user and passes to subsequent route.
 */


 function main(input) {
     input = input.split(' ');
     require('./routes/routes')(input);
 }


process.stdin.setEncoding('ascii');
process.stdin.on('data', (input)=>{
  main(input.trim());
});
