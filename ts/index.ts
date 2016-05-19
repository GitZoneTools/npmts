/// <reference path="./typings/main.d.ts" />
console.log("**** starting NPMTS ****");
import * as plugins from "./npmts.plugins"
import {promisechain} from "./npmts.promisechain";
plugins.beautylog.figletSync("NPMTS");

try {
    promisechain();
}
catch(err){
    console.log(err);
}

