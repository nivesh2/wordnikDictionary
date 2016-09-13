'use strict';
/*
 * This is made to interact with wordnik API endpoint
 */

const request = require('request-json');
const config = require('../config/config');
const client = request.createClient(config.api_host);
const api_key = config.api_key;

module.exports = (function(){

    const that = {};

    that.getDefinition = function(word,callback){

        let path = `word.json/${word}/definitions?limit=200&includeRelated=true&sourceDictionaries=all&useCanonical=false&includeTags=false&api_key=${api_key}`;
        client.get(path, function(err, res, body) {
            if(err) return callback(err);
            return callback(null,body);
        });
    };

    return that;

})();
