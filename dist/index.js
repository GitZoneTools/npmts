"use strict";
require("typings-global");
// start early and load modules
var early = require("early");
early.start("NPMTS");
var plugins = require("./npmts.plugins");
var paths = require("./npmts.paths");
var npmts_promisechain_1 = require("./npmts.promisechain");
early.stop();
plugins.beautylog.figletSync("NPMTS");
var projectInfo = new plugins.projectinfo.ProjectinfoNpm(paths.npmtsPackageRoot);
plugins.beautylog.info("npmts version: " + projectInfo.version);
try {
    npmts_promisechain_1.promisechain();
}
catch (err) {
    console.log(err);
}
