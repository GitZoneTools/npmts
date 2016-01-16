/// <reference path="./index.ts" />
var NpmtsPlugins;
(function (NpmtsPlugins) {
    NpmtsPlugins.init = function () {
        var plugins = {
            beautylog: require("beautylog"),
            gulp: require("gulp"),
            gulpTypeScript: require("gulp-typescript"),
            path: require("path"),
            smartcli: require("smartcli")
        };
        return plugins;
    };
})(NpmtsPlugins || (NpmtsPlugins = {}));
//# sourceMappingURL=npmts.plugins.js.map