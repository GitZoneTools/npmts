/// <reference path="./index.ts" />
module NpmtsPlugins {
    export var init = function() {
        var plugins = {
            beautylog: require("beautylog"),
            gulp: require("gulp"),
            g: {
                typescript: require("gulp-typescript"),
                insert: require("gulp-insert")
            },
            mergeStream: require("merge2"),
            path: require("path"),
            smartcli: require("smartcli")
        };
        return plugins;
    }
}