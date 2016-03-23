/// <reference path="./typings/main.d.ts" />
export let beautylog = require("beautylog");
export let fs = require("fs-extra");
export let gulp = require("gulp");
export let g = {
    coveralls: require("gulp-coveralls"),
    gFunction: require("gulp-function"),
    istanbul: require("gulp-istanbul"),
    jsdoc3: require("gulp-jsdoc3"),
    mocha: require("gulp-mocha"),
    sourcemaps: require("gulp-sourcemaps"),
    typescript: require("gulp-typescript"),
    typings: require("gulp-typings")

};
export let merge2 = require("merge2");
export let projectinfo = require("projectinfo");
export let sourceMapSupport = require("source-map-support").install();
export let path = require("path");
export let Q = require("q");
export let shelljs = require("shelljs");
export let smartci = require("smartci");
export let smartcli = require("smartcli");
export let smartenv = require("smartenv");
export let smartfile = require("smartfile");
export let smartpath = require("smartpath");