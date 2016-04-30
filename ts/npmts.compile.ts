/// <reference path="./typings/main.d.ts" />
import plugins = require("./npmts.plugins");
import paths = require("./npmts.paths");

import helpers = require("./npmts.compile.helpers");

export let run = function (configArg) {
    let done = plugins.Q.defer();
    let config = configArg;
    plugins.beautylog.log("now compiling " + "TypeScript".yellow);
    let moduleStream = plugins.merge2({ end: false });

    /* -------------------------------------------------
     * ----------- compile TypeScript --------------------------
     * ----------------------------------------------- */

    let tsOptionsDefault = {
        declaration: true,
        target: "ES5",
        module: "commonjs"
    };
    
    /**
     * merges default ts options with those found in npmts.json
     */
    let tsOptions = function (keyArg:string) {
        return plugins.lodashObject.assign(tsOptionsDefault, config.tsOptions)
    };

    for (let keyArg in config.ts) {
        if (helpers.checkOutputPath(config,keyArg)) {
            let tsStream = plugins.gulp.src([plugins.path.join(paths.cwd, keyArg), "!**/typings/**"])
                .pipe(plugins.g.sourcemaps.init()) // This means sourcemaps will be generated
                .pipe(plugins.g.typescript(tsOptions(keyArg)));
            
            let jsStream = tsStream.js
                .pipe(plugins.g.sourcemaps.write()) // Now the sourcemaps are added to the .js file
                .pipe(plugins.gulp.dest(config.ts[keyArg]));
            let declarationStream = tsStream.dts
                .pipe(plugins.gulp.dest(config.ts[keyArg])); 
            moduleStream.add(tsStream,jsStream,declarationStream);
        }
    }

    moduleStream.on("queueDrain", function () {
        plugins.beautylog.ok("TypeScript has been compiled!");
        moduleStream.on("finish", function () {
            done.resolve(config);
        });
        moduleStream.end();
    });
    /*==================== END TS Compilation =====================*/



    return done.promise;
};
