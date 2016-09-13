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

            console.log(`Definitions: ${word} \n`);
            printDefinition(format.definition(json));
        });

    };

    that.getSynonym = function(word){
        if(!word) return console.log(output.errBlankWord);

        wordnik.getSynonym(word,function(err,json){
            if(err) return console.log('Error while fetching Synonym from wordnik API',err);
            if(json.length === 0) return console.log(`No data found for: ${word}`);

            console.log(`Synonym: ${word} `);
            let result = json[0].words.join(',');
            console.log(result.trim()+'\n');
        });

    };


    return that;

})();
