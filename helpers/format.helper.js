'use strict';

module.exports = (function(){

        const that={};

        that.definition = function(json){
            const def = {};
            json.forEach((v)=>{
                if(def[v.attributionText]!=null){
                    def[v.attributionText].push(v.text+' | '+v.partOfSpeech);
                }else{
                    //defining the attribute first time.
                    def[v.attributionText] = [];
                    def[v.attributionText].push(v.text+' | '+v.partOfSpeech);
                }
            });
            return def;
        };

        return that;
    })();
