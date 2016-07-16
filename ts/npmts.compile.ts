import "typings-global";
import plugins = require("./npmts.plugins");
import paths = require("./npmts.paths");
import helpers = require("./npmts.compile.helpers");
import {npmtsOra} from "./npmts.promisechain";

let promiseArray = [];
let compileTs = (tsFileArrayArg:string[],tsOptionsArg = {}) => {
    let done = plugins.Q.defer();

    let tsOptionsDefault = {
        declaration: true,
        target: "ES6",
        module: "commonjs"
    };
    
    /**
     * merges default ts options with those found in npmts.json
     */
    let tsOptions = function (keyArg:string) {
        return plugins.lodashObject.assign(tsOptionsDefault, tsOptionsArg)
    };
    for (let keyArg in tsFileArrayArg) {
        plugins.beautylog.info(`TypeScript assignment: transpile from ${keyArg.blue} to ${tsFileArrayArg[keyArg].blue}`);
        if (helpers.checkOutputPath(tsFileArrayArg,keyArg)) {
            let filesReadPromise = plugins.smartfile.fs.listFileTree(process.cwd(),keyArg)
                .then((filesToConvertArg) => {
                    let filesToConvertAbsolute = plugins.smartpath.transform.toAbsolute(filesToConvertArg,process.cwd());
                    let destDir = plugins.smartpath.transform.toAbsolute(tsFileArrayArg[keyArg],process.cwd());
                    let filesCompiledPromise = plugins.tsn.compile(
                        filesToConvertAbsolute,
                        destDir
                    );
                    promiseArray.push(filesCompiledPromise);
                });
            promiseArray.push(filesReadPromise);
        }
    };
    plugins.Q.all(promiseArray)
        .then(done.resolve);
    return done.promise;
}


export let run = function (configArg) {
    let done = plugins.Q.defer();
    let config = configArg;
    npmtsOra.text("now compiling " + "TypeScript".yellow);
    
    compileTs(config.ts,config.tsOptions)
        .then(() => {
            plugins.beautylog.ok("compiled main TypeScript!");
            plugins.beautylog.log("now compiling tests!");
            return compileTs(config.testTs);
        })
        .then(function () {
            plugins.beautylog.ok("compiled all TypeScript!");
            done.resolve(config);
        });
    return done.promise;
};
