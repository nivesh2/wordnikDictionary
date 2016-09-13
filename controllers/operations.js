'use strict';

const wordnik = require('../helpers/wordnik.api');
const output = require('../config/output');
const format = require('../helpers/format.helper');

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

    that.getDefinition = function(word){
        if(!word) return console.log(output.errBlankWord);

        wordnik.getDefinition(word,function(err,json){
            if(err) return console.log('Error while fetching Definition from wordnik API',err);
            if(json.length === 0) return console.log(`No data found for: ${word} \n`);

            console.log(`\nDefinitions: ${word} \n`);
            printDefinition(format.definition(json));
        });

    };

    that.getSynonym = function(word){
        if(!word) return console.log(output.errBlankWord);

        wordnik.getSynonym(word,function(err,json){
            if(err) return console.log('Error while fetching Synonym from wordnik API',err);
            if(json.length === 0) return console.log(`No data found for: ${word}`);

            console.log(`\nSynonym: ${word} `);
            let result = json[0].words.join(',');
            console.log(result.trim()+'\n');
        });

    };

    that.getAntonym = function(word){
        if(!word) return console.log(output.errBlankWord);

        wordnik.getAntonym(word,function(err,json){
            if(err) return console.log('Error while fetching Antonym from wordnik API',err);
            if(json.length === 0) return console.log(`No data found for: ${word}`);

            console.log(`\nAntonym: ${word} `);
            let result = json[0].words.join(',');
            console.log(result.trim()+'\n');
        });

    };

    that.getExamples = function(word){
      if(!word) return console.log(output.errBlankWord);

      wordnik.getExamples(word,function(err,json){
          if(err) return console.log('Error while fetching Examples from wordnik API',err);
          if(json.length === 0) return console.log(`No data found for: ${word}`);

          console.log(`\nExamples: ${word} `);
          json.examples.forEach((v,i)=>{
            console.log(` ${i}. ${v.text}`);
          });          
      });
    };

    return that;

})();
