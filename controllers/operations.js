'use strict';

const wordnik = require('../api/wordnik.api');
const output = require('../config/output');

module.exports = (function(){

    //public exposed methods
    const that ={};

    that.getDefinition = function(word){
        if(!word) return console.log(output.errBlankWord);

        wordnik.getDefinition(word,function(err,json){
            if(err) return console.log('Error while fetching Definition from wordnik API',err);
            console.log(json);
        });

    };

    return that;

})();
