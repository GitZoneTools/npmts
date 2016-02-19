#!/usr/bin/env node

/// <reference path="./typings/main.d.ts" />
var plugins = {
    beautylog: require("beautylog"),
    fs: require("fs-extra"),
    gulp: require("gulp"),
    g: {
        coveralls: require("gulp-coveralls"),
        istanbul: require("gulp-istanbul"),
        mocha: require("gulp-mocha"),
        sourcemaps: require("gulp-sourcemaps"),
        typescript: require("gulp-typescript")
    },
    mergeStream: require("merge2"),
    sourceMapSupport: require("source-map-support").install(),
    path: require("path"),
    q: require("q"),
    smartcli: require("smartcli"),
    smartfile: require("smartfile"),
    typings: require("typings")
};
module.exports = plugins;
