"use strict";
require("typings-global");
var plugins = require("./npmts.plugins");
exports.run = function (configArg) {
    var done = plugins.Q.defer();
    var config = configArg;
    done.resolve();
    return done.promise;
};
