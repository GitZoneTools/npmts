#!/usr/bin/env node

/// <reference path="./typings/main.d.ts" />
var plugins = require("./npmts.plugins");
var paths = {};
paths.cwd = plugins.smartcli.get.cwd().path;
paths.tsDir = plugins.path.join(paths.cwd, "ts/");
paths.indexTS = plugins.path.join(paths.cwd, "ts/index.ts");
paths.testTS = plugins.path.join(paths.cwd, "ts/test.ts");
paths.testDir = plugins.path.join(paths.cwd, "test/");
module.exports = paths;
