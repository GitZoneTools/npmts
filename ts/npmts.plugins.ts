/// <reference path="./index.ts" />
module NpmtsPlugins {
    export var init = function() {
        var plugins = {
            beautylog: require("beautylog"),
            fs: require("fs"),
            gulp: require("gulp"),
            g: {
                insert: require("gulp-insert"),
                sequence: require("gulp-sequence"),
                tsd: require("gulp-tsd"),
                typescript: require("gulp-typescript")

            },
            mergeStream: require("merge2"),
            mocha: require("mocha"),
            path: require("path"),
            q:require("q"),
            smartcli: require("smartcli")
        };
        return plugins;
    }
}