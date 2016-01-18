/// <reference path="./index.ts" />
module NpmtsPlugins {
    export var init = function() {
        var plugins = {
            beautylog: require("beautylog"),
            gulp: require("gulp"),
            g: {
                insert: require("gulp-insert"),
                sequence: require("gulp-sequence"),
                tsd: require("gulp-tsd"),
                typescript: require("gulp-typescript")

            },
            mergeStream: require("merge2"),
            path: require("path"),
            smartcli: require("smartcli")
        };
        return plugins;
    }
}