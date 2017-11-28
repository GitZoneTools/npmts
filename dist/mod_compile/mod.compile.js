"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const q = require("smartq");
const paths = require("../npmts.paths");
const plugins = require("./mod.plugins");
exports.run = function (configArg) {
    let done = q.defer();
    let config = configArg;
    plugins.beautylog.ora.text('now compiling ' + 'TypeScript');
    plugins.tsn.compileGlobStringObject(config.ts, config.tsOptions, paths.cwd)
        .then(() => {
        plugins.beautylog.ok(`compiled the module's TypeScript!`);
        done.resolve(config);
    }).catch(err => { console.log(err); });
    return done.promise;
};
