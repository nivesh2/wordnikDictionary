'use strict';

const operations = require('../controllers/operations');
const output = require('../config/output');

module.exports = function(input){
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
                break;
            case 'word':
                break;
            case 'play':
                break;
            case '--help':
                console.log(output.help);
            default:
                console.log(output.errCommand);
        }

    }else{
        console.log(output.errCommand);
    }

};
