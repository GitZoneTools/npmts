/// <reference path="./typings/main.d.ts" />
import plugins = require("./npmts.plugins");
var paths:any = {};
paths.cwd = plugins.smartcli.get.cwd().path;

//Directories
paths.tsDir = plugins.path.join(paths.cwd,"ts/");
paths.distDir = plugins.path.join(paths.cwd,"dist/");
paths.docsDir = plugins.path.join(paths.cwd,"docs/");
paths.testDir = plugins.path.join(paths.cwd,"test/");

//Files
paths.indexTS = plugins.path.join(paths.cwd,"ts/index.ts");
paths.testTS = plugins.path.join(paths.cwd,"ts/test.ts");

export = paths;