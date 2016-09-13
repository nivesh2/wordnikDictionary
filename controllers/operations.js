'use strict';

const wordnik = require('../helpers/wordnik.api');
const output = require('../config/output');
const format = require('../helpers/format.helper');
const waterfall = require('async-waterfall');

module.exports = (function(){

    //private methods
    var printDefinition = function(input){
        Object.keys(input).forEach((v)=>{
            console.log(`from: ${v} \n`);

            input[v].forEach((v)=>{
               console.log(` - ${v}`);
            });
            console.log('--------------------------------------------\n');
        });
    };

    var isEmpty = function(obj){
      return (Object.getOwnPropertyNames(obj).length === 0);
    }
    //public exposed methods
    const that ={};

    that.getDefinition = function(word,callback){
        if(!word) return console.log(output.errBlankWord);

        wordnik.getDefinition(word,function(err,json){
            if(err) return console.log('Error while fetching Definition from wordnik API',err);
            if(json.length === 0) {
              console.log(`No Definition found for: ${word}`);
            }else{
              console.log(`\nDefinitions: ${word} \n`);
              printDefinition(format.definition(json));
            }
            //for async-waterfall, while getting Full dictinary
            if(callback) callback(null,word);
        });
    };

    that.getSynonym = function(word,callback){
        if(!word) return console.log(output.errBlankWord);

        wordnik.getSynonym(word,function(err,json){
            if(err) return console.log('Error while fetching Synonym from wordnik API',err);
            if(json.length === 0){
              console.log(`No Synonym found for: ${word}`);
            }else{
              console.log(`\nSynonym: ${word} `);
              let result = json[0].words.join(',');
              console.log(result.trim()+'\n');
            }
            //for async-waterfall, while getting Full dictinary
            if(callback) callback(null,word);
        });
    };

    that.getAntonym = function(word,callback){
        if(!word) return console.log(output.errBlankWord);

        wordnik.getAntonym(word,function(err,json){
            if(err) return console.log('Error while fetching Antonym from wordnik API',err);
            if(json.length === 0){
              console.log(`No Antonym found for: ${word}`);
            }else{
              console.log(`\nAntonym: ${word} `);
              let result = json[0].words.join(',');
              console.log(result.trim()+'\n');
            }
            //for async-waterfall, while getting Full dictinary
            if(callback) callback(null,word);
        });
    };

    that.getExamples = function(word,callback){
      if(!word) return console.log(output.errBlankWord);

      wordnik.getExamples(word,function(err,json){
          if(err) return console.log('Error while fetching Examples from wordnik API',err);
          if(isEmpty(json)){
            console.log(`No Examples found for: ${word}`);
          }else{
            console.log(`\nExamples: ${word} `);
            json.examples.forEach((v,i)=>{
            console.log(` ${i}. ${v.text}`);
            });
          }

          //for async-waterfall, while getting Full dictinary
          if(callback) callback(null,word);
      });
    };

    /*
     * getting full dictinary of the Word.
     */
     that.getFullDictionary = function(word){

       //runnig all the above operations squentially
       waterfall([
         function(callback){
           that.getDefinition(word,callback);
         },
         that.getSynonym,
         that.getAntonym,
         that.getExamples,
       ], function(err,result){
          if(err) return console.log('Error while fetching full dictionary from wordnik API',err);
       });
     };

     /*
      * getting word of the day.
      */
     that.getWordOfTheDayDict = function(){
        let todayDate = (new Date()).toISOString().slice(0,10);
        wordnik.getWordOfTheDay(todayDate,function(err,json){
          if(json.word == null) return console.log('Word of the Day not found');

          console.log(`\nWord of the DAY(${todayDate}): ${json.word}`);
          that.getFullDictionary(json.word);
        });
     }
    return that;

})();
