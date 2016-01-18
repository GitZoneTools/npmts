/// <reference path="./index.ts" />
var NpmtsPlugins;
(function (NpmtsPlugins) {
    NpmtsPlugins.init = function () {
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
    };
})(NpmtsPlugins || (NpmtsPlugins = {}));
//# sourceMappingURL=npmts.plugins.js.map