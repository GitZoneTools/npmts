import "typings-global";
import plugins = require("./npmts.plugins");
import paths = require("./npmts.paths");
import helpers = require("./npmts.compile.helpers");
import {npmtsOra} from "./npmts.promisechain";

let compileTs = (tsFileArrayArg,tsOptionsArg = {}) => {
    let done = plugins.Q.defer();

    let tsOptionsDefault = {
        declaration: true,
        target: "ES5",
        module: "commonjs"
    };
    
    /**
     * merges default ts options with those found in npmts.json
     */
    let tsOptions = function (keyArg:string) {
        return plugins.lodashObject.assign(tsOptionsDefault, tsOptionsArg)
    };
    for (let keyArg in tsFileArrayArg) {
        if (helpers.checkOutputPath(tsFileArrayArg,keyArg)) {
            let filesToConvert = plugins.smartfile.fs.listFileTree(plugins.path.resolve(keyArg),"**/*.ts");
            plugins.tsn.compile(filesToConvert,tsFileArrayArg[keyArg]);
        }
    }
    return done.promise;
}


export let run = function (configArg) {
    let done = plugins.Q.defer();
    let config = configArg;
    npmtsOra.text("now compiling " + "TypeScript".yellow);
    
    compileTs(config.ts,config.tsOptions)
        .then(() => {
            compileTs(config.testTs);
        })
        .then(function () {
            plugins.beautylog.ok("compiled TypeScript!");
            done.resolve(config);
            
        });
    return done.promise;
};
