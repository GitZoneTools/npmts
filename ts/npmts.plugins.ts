import "typings-global";
export import beautylog = require("beautylog");
export let gulp = require("gulp");
export let g = {
    gFunction: require("gulp-function"),
    istanbul: require("gulp-istanbul"),
    jsdoc3: require("gulp-jsdoc3"),
    mocha: require("gulp-mocha"),
    replace: require("gulp-replace"),
    sourcemaps: require("gulp-sourcemaps")
};
export let lodashObject = require('lodash/fp/object');
export let merge2 = require("merge2");
export import projectinfo = require("projectinfo");
export import path = require("path");
export import Q = require("q");
export import shelljs = require("shelljs");
export let smartci = require("smartci");
export import smartcli = require("smartcli");
export let smartcov = require("smartcov");
export import smartenv = require("smartenv");
export import smartfile = require("smartfile");
export import smartpath = require("smartpath");
export import smartstring = require("smartstring");
export let sourceMapSupport = require("source-map-support").install(); // this is required to display errors correctly during testing
export import tsn = require("tsn");