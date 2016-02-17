#!/usr/bin/env node

/// <reference path="./typings/main.d.ts" />
console.log("**** starting test ****");
var testplugin = require("../index.js");
describe("testplugins", function () {
    describe(".logSomething", function () {
        it("should log something", function () {
            testplugin.logSomething();
        });
    });
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsNENBQTRDO0FBQzVDLE9BQU8sQ0FBQyxHQUFHLENBQUMseUJBQXlCLENBQUMsQ0FBQztBQUN2QyxJQUFJLFVBQVUsR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDeEMsUUFBUSxDQUFDLGFBQWEsRUFBQztJQUNuQixRQUFRLENBQUMsZUFBZSxFQUFDO1FBQ3JCLEVBQUUsQ0FBQyxzQkFBc0IsRUFBQztZQUN0QixVQUFVLENBQUMsWUFBWSxFQUFFLENBQUE7UUFDN0IsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFDIiwiZmlsZSI6InRlc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi90eXBpbmdzL21haW4uZC50c1wiIC8+XG5jb25zb2xlLmxvZyhcIioqKiogc3RhcnRpbmcgdGVzdCAqKioqXCIpO1xudmFyIHRlc3RwbHVnaW4gPSByZXF1aXJlKFwiLi4vaW5kZXguanNcIik7XG5kZXNjcmliZShcInRlc3RwbHVnaW5zXCIsZnVuY3Rpb24oKXtcbiAgICBkZXNjcmliZShcIi5sb2dTb21ldGhpbmdcIixmdW5jdGlvbigpe1xuICAgICAgICBpdChcInNob3VsZCBsb2cgc29tZXRoaW5nXCIsZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHRlc3RwbHVnaW4ubG9nU29tZXRoaW5nKClcbiAgICAgICAgfSk7XG4gICAgfSk7XG59KTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
