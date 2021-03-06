"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("../npmts.plugins"));
const gulpFunction = require("gulp-function");
exports.gulpFunction = gulpFunction;
const gulpSourcemaps = require("gulp-sourcemaps");
exports.gulpSourcemaps = gulpSourcemaps;
const gulpTypeScript = require("gulp-typescript");
exports.gulpTypeScript = gulpTypeScript;
const smartcov = require("smartcov");
exports.smartcov = smartcov;
const smartgulp = require("smartgulp");
exports.smartgulp = smartgulp;
const tapbuffer = require("tapbuffer");
exports.tapbuffer = tapbuffer;
