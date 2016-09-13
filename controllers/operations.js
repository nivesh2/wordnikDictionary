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

    //public exposed methods
    const that ={};

    that.getDefinition = function(word,callback){
        if(!word) return console.log(output.errBlankWord);

        wordnik.getDefinition(word,function(err,json){
            if(err) return console.log('Error while fetching Definition from wordnik API',err);
            if(json.length === 0) return console.log(`No Definition found for: ${word} \n`);

            console.log(`\nDefinitions: ${word} \n`);
            printDefinition(format.definition(json));

            //for async-waterfall, while getting Full dictinary
            if(callback) callback(null,word);
        });
    };

    that.getSynonym = function(word,callback){
        if(!word) return console.log(output.errBlankWord);

        wordnik.getSynonym(word,function(err,json){
            if(err) return console.log('Error while fetching Synonym from wordnik API',err);
            if(json.length === 0) return console.log(`No Synonym found for: ${word}`);

            console.log(`\nSynonym: ${word} `);
            let result = json[0].words.join(',');
            console.log(result.trim()+'\n');

            //for async-waterfall, while getting Full dictinary
            if(callback) callback(null,word);
        });
    };

    that.getAntonym = function(word,callback){
        if(!word) return console.log(output.errBlankWord);

        wordnik.getAntonym(word,function(err,json){
            if(err) return console.log('Error while fetching Antonym from wordnik API',err);
            if(json.length === 0) return console.log(`No Antonym found for: ${word}`);

            console.log(`\nAntonym: ${word} `);
            let result = json[0].words.join(',');
            console.log(result.trim()+'\n');

            //for async-waterfall, while getting Full dictinary
            if(callback) callback(null,word);
        });
    };

    that.getExamples = function(word,callback){
      if(!word) return console.log(output.errBlankWord);

      wordnik.getExamples(word,function(err,json){
          if(err) return console.log('Error while fetching Examples from wordnik API',err);
          if(json.length === 0) return console.log(`No Examples found for: ${word}`);

          console.log(`\nExamples: ${word} `);
          json.examples.forEach((v,i)=>{
            console.log(` ${i}. ${v.text}`);
          });

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

    return that;

})();
