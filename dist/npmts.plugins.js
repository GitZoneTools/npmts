"use strict";
require("typings-global");
exports.beautylog = require("beautylog");
exports.gulp = require("gulp");
exports.g = {
    gFunction: require("gulp-function"),
    istanbul: require("gulp-istanbul"),
    jsdoc3: require("gulp-jsdoc3"),
    mocha: require("gulp-mocha"),
    replace: require("gulp-replace")
};
exports.lodashObject = require('lodash/fp/object');
exports.merge2 = require("merge2");
exports.projectinfo = require("projectinfo");
exports.path = require("path");
exports.Q = require("q");
exports.shelljs = require("shelljs");
exports.smartci = require("smartci");
exports.smartcli = require("smartcli");
exports.smartcov = require("smartcov");
exports.smartenv = require("smartenv");
exports.smartfile = require("smartfile");
exports.smartpath = require("smartpath");
exports.smartstring = require("smartstring");
exports.sourceMapSupport = require("source-map-support").install(); // this is required to display errors correctly during testing
exports.tsn = require("tsn");
