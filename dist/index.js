"use strict";
/// <reference path="./typings/index.d.ts" />
console.log("**** starting NPMTS ****");
var plugins = require("./npmts.plugins");
var npmts_promisechain_1 = require("./npmts.promisechain");
plugins.beautylog.figletSync("NPMTS");
try {
    npmts_promisechain_1.promisechain();
}
catch (err) {
    console.log(err);
}
