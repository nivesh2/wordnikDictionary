'use strict';

module.exports = (function(){

        const that={};

        that.formatDefinition = function(json){
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

        that.random = function(n){
            return ((parseInt((Math.random()*10).toPrecision(1)))%n);
        };

        that.jumbleWord = function(w){
            w=w.split('');
            let n=w.length,
                jumble =0,
                temp = 0;


            while(n){
                jumble = that.random(n);

                //swap with last one
                temp = w[jumble];
                w[jumble]= w[n-1];
                w[n-1] = temp;
                n--;
            }
            return w.join('');
        };

        return that;
    })();
