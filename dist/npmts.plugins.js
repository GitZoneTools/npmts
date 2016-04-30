"use strict";
/// <reference path="./typings/main.d.ts" />
exports.beautylog = require("beautylog");
exports.fs = require("fs-extra");
exports.gulp = require("gulp");
exports.g = {
    codecov: require("gulp-codecov"),
    gFunction: require("gulp-function"),
    istanbul: require("gulp-istanbul"),
    jsdoc3: require("gulp-jsdoc3"),
    mocha: require("gulp-mocha"),
    sourcemaps: require("gulp-sourcemaps"),
    typescript: require("gulp-typescript"),
    typings: require("gulp-typings")
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
exports.sourceMapSupport = require("source-map-support").install(); // this is required to display errors correctly during testing
