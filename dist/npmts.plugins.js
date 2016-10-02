"use strict";
require("typings-global");
const beautylog = require("beautylog");
exports.beautylog = beautylog;
let depcheck = require('depcheck');
exports.depcheck = depcheck;
const gulp = require("gulp");
exports.gulp = gulp;
let g = {
    babel: require('gulp-babel'),
    istanbul: require('gulp-istanbul'),
    gFunction: require('gulp-function'),
    injectModules: require('gulp-inject-modules'),
    mocha: require('gulp-mocha'),
    sourcemaps: require('gulp-sourcemaps'),
    typedoc: require('gulp-typedoc')
};
exports.g = g;
const lodash = require("lodash");
exports.lodash = lodash;
const npmextra = require("npmextra");
exports.npmextra = npmextra;
const projectinfo = require("projectinfo");
exports.projectinfo = projectinfo;
const path = require("path");
exports.path = path;
const shelljs = require("shelljs");
exports.shelljs = shelljs;
const smartchok = require("smartchok");
exports.smartchok = smartchok;
const smartcli = require("smartcli");
exports.smartcli = smartcli;
const smartcov = require("smartcov");
exports.smartcov = smartcov;
const smartenv = require("smartenv");
exports.smartenv = smartenv;
const smartfile = require("smartfile");
exports.smartfile = smartfile;
const smartpath = require("smartpath");
exports.smartpath = smartpath;
const smartstream = require("smartstream");
exports.smartstream = smartstream;
const smartstring = require("smartstring");
exports.smartstring = smartstring;
exports.sourceMapSupport = require('source-map-support').install(); // display errors correctly during testing
const tsn = require("tsn");
exports.tsn = tsn;
