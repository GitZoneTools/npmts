/// <reference path="./typings/index.d.ts" />
import plugins = require("./npmts.plugins");

export let cwd = plugins.smartcli.get.cwd().path;

//Directories
export let tsDir = plugins.path.join(cwd,"ts/");
export let distDir = plugins.path.join(cwd,"dist/");
export let docsDir = plugins.path.join(cwd,"docs/");
export let testDir = plugins.path.join(cwd,"test/");
export let typingsDir = plugins.path.join(cwd,"ts/typings/");
export let coverageDir = plugins.path.join(cwd,"coverage/");

export let npmtsAssetsDir = plugins.path.join(__dirname,"../assets/");

//Files
export let indexTS = plugins.path.join(cwd,"ts/index.ts");
export let testTS = plugins.path.join(cwd,"ts/test.ts");
