'use strict';

const operations = require('../controllers/operations');
const gameOperations = require('../controllers/game.operations');
const output = require('../config/output');

module.exports = function(input,_game){
    let app = input[0];
    let command = input[1];
    let word = input[2];

    //check ./dict
    if(app && app === './dict'){

        switch(command){
            case 'def':
                operations.getDefinition(word);
                break;
            case 'syn':
                operations.getSynonym(word);
                break;
            case 'ant':
                operations.getAntonym(word);
                break;
            case 'ex':
                operations.getExamples(word);
                break;
            case 'dict':
                operations.getFullDictionary(word);
                break;
            case 'play':
                gameOperations.getQuestion(function(err,result){
                    if(err) return console.log('Error while fetching Question',err);
                    _game.on = true;
                    _game.word = result.word;
                    _game.answerMode = 1;
                    _game.hintCounter=0;
                    console.log('-----------------Game Started-------------------');
                    console.log(`Enter the correct word for definition, synonym, or antonym of the word.\n`);
                    console.log(`Question: ${result.question}`);
                });
                break;
            case '--help':
                console.log(output.help);
                break;
            default:
            word = command;
            if(word){
              // for ./dict <word>
              operations.getFullDictionary(word);
            } else {
              // for ./dict
              operations.getWordOfTheDayDict();
            }

        }
    }else{
        console.log(output.errCommand);
    }
};
