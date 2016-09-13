'use strict';

const output = require('../config/output');

module.exports = function(input){
    let app = input[0];
    let command = input[1];
    let word = input[2];

    //check ./dict
    if(app && app === './dict'){

        switch(command){
            case 'def':
                break;
            case 'syn':
                break;
            case 'ant':
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
