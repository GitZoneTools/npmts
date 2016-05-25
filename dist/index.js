"use strict";
require("typings-global");
var early = require("early");
early.start("NPMTS");
var plugins = require("./npmts.plugins");
var npmts_promisechain_1 = require("./npmts.promisechain");
early.stop();
plugins.beautylog.figletSync("NPMTS");
try {
    npmts_promisechain_1.promisechain();
}
catch (err) {
    console.log(err);
}
