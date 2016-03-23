"use strict";
/// <reference path="./typings/main.d.ts" />
console.log("**** starting NPMTS ****");
var plugins = require("./npmts.plugins");
var promisechain = require("./npmts.promisechain");
plugins.beautylog.figletSync("NPMTS");
try {
    promisechain.run();
}
catch (err) {
    console.log(err);
}
