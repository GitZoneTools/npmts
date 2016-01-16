/// <reference path="./index.ts" />
module NpmtsPlugins {
    export var init = function() {
        var plugins = {
            beautylog: require("beautylog"),
            gulp: require("gulp"),
            gulpTypeScript: require("gulp-typescript"),
            path: require("path"),
            smartcli: require("smartcli")
        };
        return plugins;
    }
}