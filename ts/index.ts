/// <reference path="./typings/main.d.ts" />
console.log("**** starting NPMTS ****");
import plugins = require("./npmts.plugins");
import promisechain = require("./npmts.promisechain");
plugins.beautylog.figletSync("NPMTS");

try {
    promisechain.run();
}
catch(err){
    console.log(err);
}

