"use strict";
require("typings-global");
var plugins = require("./npmts.plugins");
// NPMTS Paths
exports.npmtsPackageRoot = plugins.path.join(__dirname, "../");
// Project paths
exports.cwd = process.cwd();
// Directories
exports.tsDir = plugins.path.join(exports.cwd, "ts/");
exports.distDir = plugins.path.join(exports.cwd, "dist/");
exports.testDir = plugins.path.join(exports.cwd, "test/");
exports.typingsDir = plugins.path.join(exports.cwd, "ts/typings/");
exports.coverageDir = plugins.path.join(exports.cwd, "coverage/");
// Pages
exports.pagesDir = plugins.path.join(exports.cwd, "pages/");
exports.pagesApiDir = plugins.path.join(exports.pagesDir, "/api");
exports.npmtsAssetsDir = plugins.path.join(__dirname, "../assets/");
//Files
exports.indexTS = plugins.path.join(exports.cwd, "ts/index.ts");
exports.testTS = plugins.path.join(exports.cwd, "ts/test.ts");
