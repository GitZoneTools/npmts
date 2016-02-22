#!/usr/bin/env node

/// <reference path="./typings/main.d.ts" />
var plugins = {
    beautylog: require("beautylog"),
    fs: require("fs-extra"),
    gulp: require("gulp"),
    g: {
        coveralls: require("gulp-coveralls"),
        gFunction: require("gulp-function"),
        istanbul: require("gulp-istanbul"),
        jsdoc3: require("gulp-jsdoc3"),
        mocha: require("gulp-mocha"),
        sourcemaps: require("gulp-sourcemaps"),
        typescript: require("gulp-typescript")
    },
    merge2: require("merge2"),
    projectinfo: require("projectinfo"),
    sourceMapSupport: require("source-map-support").install(),
    path: require("path"),
    Q: require("q"),
    shelljs: require("shelljs"),
    smartcli: require("smartcli"),
    smartenv: require("smartenv"),
    smartfile: require("smartfile"),
    typings: require("typings")
};
module.exports = plugins;
