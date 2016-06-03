"use strict";
require("typings-global");
var plugins = require("./npmts.plugins");
var NpmtsJsdoc = require("./npmts.jsdoc");
exports.run = function (configArg) {
    var done = plugins.Q.defer();
    var config = configArg;
    var promiseArray = [];
    config.docs.publish ? promiseArray.push(NpmtsJsdoc.publishDocs(configArg)) : void (0);
    promiseArray.length === 0 ? plugins.beautylog.info("Did not publish anything!") : void (0);
    plugins.Q.all(promiseArray).then(done.resolve);
    return done.promise;
};
