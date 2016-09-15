'use strict';

/*
 * Entry file
 * takes input from the user and passes to subsequent route.
 */

var _game = {
    on:false,
    answerMode:0,
    word:'',
    hintCounter:0,
    };

function main(input) {

 if(!_game.on){
     input = input.split(' ');
     require('./routes/routes')(input,_game);
 }
 else{
     require('./routes/game.route')(input,_game);
 }
}

// taking input form user
process.stdin.setEncoding('ascii');
process.stdin.on('data', (input)=>{
  main(input.trim());
});
