/// <reference path="./typings/tsd.d.ts" />
/// <reference path="./npmts.plugins.ts" />
/// <reference path="./npmts.cli.ts" />
/// <reference path="./npmts.paths.ts" />
/// <reference path="./npmts.options.ts" />
/// <reference path="./npmts.custom.ts" />
/// <reference path="./npmts.default.ts" />

var plugins = NpmtsPlugins.init();
var paths = NpmtsPaths.init();
NpmtsDefault.init();
