#!/usr/bin/env node

/// <reference path="./typings/main.d.ts" />
var testplugin = {
    logSomething: function () {
        console.log("only function executed");
    }
};
module.exports = testplugin;
