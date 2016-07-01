var testplugin = require("../dist/index.js");
describe("testplugins", function () {
    describe(".logSomething", function () {
        it("should log something", function () {
            testplugin.logSomething();
        });
    });
});
