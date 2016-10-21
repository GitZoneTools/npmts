"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require("../npmts.plugins"));
const gulp = require("gulp");
exports.gulp = gulp;
let gulpTypedoc = require('gulp-typedoc');
exports.gulpTypedoc = gulpTypedoc;
