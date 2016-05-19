"use strict";
/// <reference path="./typings/index.d.ts" />
var plugins = require("./npmts.plugins");
exports.cwd = plugins.smartcli.get.cwd().path;
//Directories
exports.tsDir = plugins.path.join(exports.cwd, "ts/");
exports.distDir = plugins.path.join(exports.cwd, "dist/");
exports.docsDir = plugins.path.join(exports.cwd, "docs/");
exports.testDir = plugins.path.join(exports.cwd, "test/");
exports.typingsDir = plugins.path.join(exports.cwd, "ts/typings/");
exports.coverageDir = plugins.path.join(exports.cwd, "coverage/");
exports.npmtsAssetsDir = plugins.path.join(__dirname, "../assets/");
//Files
exports.indexTS = plugins.path.join(exports.cwd, "ts/index.ts");
exports.testTS = plugins.path.join(exports.cwd, "ts/test.ts");
