/// <reference path="../ts/typings/main.d.ts" />
console.log("**** starting test ****");
var testplugin = require("../dist/index.js");
describe("testplugins",function(){
    describe(".logSomething",function(){
        it("should log something",function(){
            testplugin.logSomething()
        });
    });
});