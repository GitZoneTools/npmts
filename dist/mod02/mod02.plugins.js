"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require("../npmts.plugins"));
const gulp = require("gulp");
exports.gulp = gulp;
const gulpFunction = require("gulp-function");
exports.gulpFunction = gulpFunction;
const gulpIstanbul = require("gulp-istanbul");
exports.gulpIstanbul = gulpIstanbul;
let gulpInjectModules = require('gulp-inject-modules');
exports.gulpInjectModules = gulpInjectModules;
const gulpMocha = require("gulp-mocha");
exports.gulpMocha = gulpMocha;
const gulpSourcemaps = require("gulp-sourcemaps");
exports.gulpSourcemaps = gulpSourcemaps;
const gulpTypeScript = require("gulp-typescript");
exports.gulpTypeScript = gulpTypeScript;
