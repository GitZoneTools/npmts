/// <reference path="./typings/main.d.ts" />
console.log("**** starting test ****");
var testplugin = require("../index.js");
describe("testplugins",function(){
    describe(".logSomething",function(){
        it("should log something",function(){
            testplugin.logSomething()
        });
    });
});