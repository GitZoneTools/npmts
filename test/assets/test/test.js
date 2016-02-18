/// <reference path="../ts/typings/main.d.ts" />
console.log("**** starting test ****");
var testplugin = require("../dist/index.js");
describe("testplugins", function () {
    describe(".logSomething", function () {
        it("should log something", function () {
            testplugin.logSomething();
        });
    });
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsZ0RBQWdEO0FBQ2hELE9BQU8sQ0FBQyxHQUFHLENBQUMseUJBQXlCLENBQUMsQ0FBQztBQUN2QyxJQUFJLFVBQVUsR0FBRyxPQUFPLENBQUMsa0JBQWtCLENBQUMsQ0FBQztBQUM3QyxRQUFRLENBQUMsYUFBYSxFQUFDO0lBQ25CLFFBQVEsQ0FBQyxlQUFlLEVBQUM7UUFDckIsRUFBRSxDQUFDLHNCQUFzQixFQUFDO1lBQ3RCLFVBQVUsQ0FBQyxZQUFZLEVBQUUsQ0FBQTtRQUM3QixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDLENBQUMiLCJmaWxlIjoidGVzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi90cy90eXBpbmdzL21haW4uZC50c1wiIC8+XG5jb25zb2xlLmxvZyhcIioqKiogc3RhcnRpbmcgdGVzdCAqKioqXCIpO1xudmFyIHRlc3RwbHVnaW4gPSByZXF1aXJlKFwiLi4vZGlzdC9pbmRleC5qc1wiKTtcbmRlc2NyaWJlKFwidGVzdHBsdWdpbnNcIixmdW5jdGlvbigpe1xuICAgIGRlc2NyaWJlKFwiLmxvZ1NvbWV0aGluZ1wiLGZ1bmN0aW9uKCl7XG4gICAgICAgIGl0KFwic2hvdWxkIGxvZyBzb21ldGhpbmdcIixmdW5jdGlvbigpe1xuICAgICAgICAgICAgdGVzdHBsdWdpbi5sb2dTb21ldGhpbmcoKVxuICAgICAgICB9KTtcbiAgICB9KTtcbn0pOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
