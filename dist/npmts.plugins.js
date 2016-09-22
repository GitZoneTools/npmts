"use strict";
require("typings-global");
exports.beautylog = require("beautylog");
exports.depcheck = require('depcheck');
exports.gulp = require("gulp");
exports.g = {
    babel: require('gulp-babel'),
    istanbul: require('gulp-istanbul'),
    gFunction: require('gulp-function'),
    injectModules: require('gulp-inject-modules'),
    mocha: require('gulp-mocha'),
    sourcemaps: require('gulp-sourcemaps'),
    typedoc: require('gulp-typedoc')
};
exports.lodash = require("lodash");
exports.npmextra = require("npmextra");
exports.projectinfo = require("projectinfo");
exports.path = require("path");
exports.q = require("q");
exports.shelljs = require("shelljs");
exports.smartchok = require("smartchok");
exports.smartcli = require("smartcli");
exports.smartcov = require("smartcov");
exports.smartenv = require("smartenv");
exports.smartfile = require("smartfile");
exports.smartpath = require("smartpath");
exports.smartstring = require("smartstring");
exports.sourceMapSupport = require('source-map-support').install(); // display errors correctly during testing
exports.tsn = require("tsn");
