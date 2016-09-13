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
            console.log('--------------------------------------------\n')
        });
    }

    //public exposed methods
    const that ={};

    that.getDefinition = function(word){
        if(!word) return console.log(output.errBlankWord);

        wordnik.getDefinition(word,function(err,json){
            if(err) return console.log('Error while fetching Definition from wordnik API',err);

            console.log(`Definitions: ${word} \n`);
            printDefinition(format.definition(json));
        });

    };
    

    return that;

})();
