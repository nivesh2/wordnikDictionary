'use strict';

const gameOperations = require('../controllers/game.operations');
const operations = require('../controllers/operations');
const output = require('../config/output');

module.exports = function(input,_game){

        if(_game.answerMode){
            gameOperations.checkAnswer(input,_game);
        }else {

            switch(input){
                case '1':
                    console.log('This is Next Chance, Enter the Correct Word:');
                    _game.answerMode=1;
                    break;
                case '2':
                    console.log('Following is a hint, try entering the correct word this time.');
                    gameOperations.displayHint(_game);
                    break;
                case '3':
                    console.log('Game Over! Following is full dictionary of the answer.');

                    //showing complete dictionary of the word
                    operations.getFullDictionary(_game.word);

                    //reseting
                    _game.on = false;
                    _game.word = '';
                    _game.answerMode = 0;
                    _game.hintCounter = 0;
                    break;
                default:
                    console.log('Please, enter correct choice (1,2,3).');
            }
        }
};
