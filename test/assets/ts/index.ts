/// <reference path="./typings/index.d.ts" />
let testplugin = {
    logSomething: function(){
        console.log("only function executed");
    }
};
module.exports = testplugin;