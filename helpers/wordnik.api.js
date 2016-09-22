'use strict';
/*
 * This is made to interact with wordnik API endpoint
 */

const request = require('request-json');
const config = require('../config/config');
const client = request.createClient(config.api_host);
const api_key = config.api_key;

module.exports = (function(){

    //private methods
    const fetchData = function(path,callback){
      client.get(path, (err, res, body)=>{
          if(err) return callback(err);
          if(res.statusCode === 200){
              return callback(null,body);
          }
          return callback(`|| Response StatusCode: ${res.statusCode}`,null);  
          
      });
    };

    //public methods
    const that = {};

    that.getDefinition = function(word,callback){
        let path = `word.json/${word}/definitions?limit=200&includeRelated=true&sourceDictionaries=all&useCanonical=false&includeTags=false&api_key=${api_key}`;
        fetchData(path,callback);
    };

    that.getSynonym = function(word,callback){
        let path = `word.json/${word}/relatedWords?useCanonical=false&relationshipTypes=synonym&limitPerRelationshipType=10&api_key=${api_key}`;
        fetchData(path,callback);
    };

    that.getAntonym = function(word,callback){
        let path = `word.json/${word}/relatedWords?useCanonical=false&relationshipTypes=antonym&limitPerRelationshipType=10&api_key=${api_key}`;
        fetchData(path,callback);
    };

    that.getExamples = function(word,callback){
        let path = `word.json/${word}/examples?includeDuplicates=false&useCanonical=false&skip=0&limit=5&api_key=${api_key}`;
        fetchData(path,callback);
    };

    that.getWordOfTheDay = function(date,callback){
      let path = `words.json/wordOfTheDay?date=${date}&api_key=${api_key}`;
      fetchData(path,callback);
    };

    that.getRandomWord = function(callback){
      let path = `words.json/randomWord?hasDictionaryDef=false&minCorpusCount=0&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=-1&api_key=${api_key}`;
      fetchData(path,callback);
    };

    return that;

})();
