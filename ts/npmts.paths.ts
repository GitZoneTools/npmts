/// <reference path="./index.ts" />
module NpmtsPaths {
    export var init = function() {
        var paths:any = {};
        paths.cwd = plugins.smartcli.get.cwd().path;
        paths.tsd = plugins.path.join(paths.cwd,"ts/tsd.json");
        paths.indexTS = plugins.path.join(paths.cwd,"ts/index.ts");
        paths.testTS = plugins.path.join(paths.cwd,"ts/test.ts");
        return paths;
    }
}