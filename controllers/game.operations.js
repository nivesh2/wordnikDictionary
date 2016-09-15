'use strict';

const wordnik = require('../helpers/wordnik.api');
const output = require('../config/output');
const helper = require('../helpers/helper');
const waterfall = require('async-waterfall');

module.exports = (function(){

    //private helper methods
    function getRandomSyn(word,cb) {
        wordnik.getSynonym(word,function(err,json){
            if(err) return console.log('Error while fetching Synonym from wordnik API',err);
            if(json.length === 0){
              // no synonym found for the word
              return cb(true,word);
            }else{
              let result = json[0].words[helper.random(json[0].words.length)];
              cb(null,result);

            }
        });
    }

    function getRandomAnt(word,cb) {
        wordnik.getAntonym(word,function(err,json){
            if(err) return console.log('Error while fetching Synonym from wordnik API',err);
            if(json.length === 0){
              // no antonym found for the word
              return cb(true,word);
            }else{
              let result = json[0].words[helper.random(json[0].words.length)];
              cb(null,result);

            }
        });
    }

    function getRandomDef(word,cb){
        wordnik.getDefinition(word,function(err,json){
            if(err) return console.log('Error while fetching Definition from wordnik API',err);
            if(json.length === 0) {
              // no definition found for the word
              return cb(true,word);
            }else{
              let result = json[helper.random(json.length)].text;
              cb(null,result);

            }
        });
    }

    //public methods
    const that = {};

    that.getQuestion = function(_callback){

        //async-waterfall fetching sequencially
        waterfall([
            function(callback){
                //fetching a random word
                 wordnik.getRandomWord((err,json)=>{
                     if(err) return callback('Error while fetching Random Word from wordnik API');
                     if(json.word == null)  return callback('Question Could not be fetched');

                     callback(null,json.word);
                 });
            },
            function(word,callback){
                //prints the answer to the question for debugging
                //console.log(word);

                // with any question does not return any value then it will show definition question.
                switch(helper.random(3)){
                    case 0:
                        getRandomDef(word,(err,result)=>{
                          if(err) return console.log(` Sorry unable to fetch question currently`);
                          callback(null,{
                             'word':word,
                             'question':`Definition - ${result}`
                          });
                        });
                        break;
                    case 1:
                        getRandomSyn(word,(err,result)=>{
                          if(err){
                            return getRandomDef(result,(err,_result)=>{
                              if(err) return console.log(` Sorry unable to fetch question currently`);
                              callback(null,{
                                 'word':word,
                                 'question':`Definition - ${_result}`
                              });
                            });
                          }
                          callback(null,{
                             'word':word,
                             'question':`Synonym - ${result}`
                          });
                        });
                        break;
                    case 2:
                        getRandomAnt(word,(err,result)=>{
                          if(err){
                            return getRandomDef(result,(err,_result)=>{
                              if(err) return console.log(` Sorry unable to fetch question currently`);
                              callback(null,{
                                 'word':word,
                                 'question':`Definition - ${_result}`
                              });
                            });
                          }
                          callback(null,{
                             'word':word,
                             'question':`Antonym - ${result}`
                          });
                        });
                        break;
                }
            }

            ],function(err,result){
                if(err) return _callback(err);

                _callback(null,result);
        });

    };

    that.checkAnswer = function(input,_game){
        //check for answer.
        if(input.toUpperCase() === _game.word.toUpperCase()){
            console.log('Correct! Getting on to next question.');

            //fetch next question
            that.getQuestion(function(err,result){
                if(err) return console.log('Error while fetching Question',err);

                //resetting answer to the new question
                _game.word = result.word;
                _game.hintCounter = 0;

                console.log(`Question: ${result.question}`);
            });

        }else{
            console.log('InCorrect!');
            console.log(output.gameChoice);
            _game.answerMode = 0;
        }
    };


    that.displayHint = function(_game){
        let hint = _game.hintCounter;
        let word = _game.word;

        // with any hint does not return any value then it will show jumbled words HINT.
        switch(hint){
            case 0:
                console.log(` - Jumbled Correct Word: ${helper.jumbleWord(word)}`);
                break;
            case 1:
                getRandomDef(word,(err,result)=>{
                  if(err) return console.log(` - Jumbled Correct Word: ${helper.jumbleWord(word)}`);
                  console.log(`\nDefinitions: ${result} \n`);
                });
                break;
            case 2:
                getRandomSyn(word,(err,result)=>{
                  if(err) return console.log(` - Jumbled Correct Word: ${helper.jumbleWord(word)}`);
                  console.log(` - Synonym: ${result}`);
                });
                break;
            case 3:
                getRandomAnt(word,(err,result)=>{
                  if(err) return console.log(` - Jumbled Correct Word: ${helper.jumbleWord(word)}`);
                console.log(` - Antonym: ${result}`);
                });
                break;
        }
        _game.hintCounter = (hint + 1)%4;
        //  hint displayed now switch the mode to answerMode
        _game.answerMode=1;
    }


    return that;

})();
