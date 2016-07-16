"use strict";
require("typings-global");
exports.beautylog = require("beautylog");
exports.gulp = require("gulp");
exports.g = {
    babel: require("gulp-babel"),
    istanbul: require("gulp-istanbul"),
    gFunction: require("gulp-function"),
    injectModules: require("gulp-inject-modules"),
    mocha: require("gulp-mocha"),
    replace: require("gulp-replace"),
    sourcemaps: require("gulp-sourcemaps"),
    typedoc: require("gulp-typedoc")
};
exports.lodashObject = require('lodash/fp/object');
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
