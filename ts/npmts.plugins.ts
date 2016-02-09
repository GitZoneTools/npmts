/// <reference path="./index.ts" />
module NpmtsPlugins {
    export var init = function() {
        var plugins = {
            beautylog: require("beautylog"),
            fs: require("fs-extra"),
            gulp: require("gulp"),
            g: {
                coveralls: require("gulp-coveralls"),
                if: require("gulp-if"),
                insert: require("gulp-insert"),
                istanbul: require("gulp-istanbul"),
                mocha: require("gulp-mocha"),
                sequence: require("gulp-sequence"),
                typescript: require("gulp-typescript")

            },
            mergeStream: require("merge2"),
            path: require("path"),
            q:require("q"),
            smartcli: require("smartcli"),
            smartfile: require("smartfile"),
            typings: require("typings")
        };
        return plugins;
    }
}