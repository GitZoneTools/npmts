import "typings-global";
import plugins = require("./npmts.plugins");
import paths = require("./npmts.paths");
import helpers = require("./npmts.compile.helpers");
import {npmtsOra} from "./npmts.promisechain";

/**
 * handles definition to make them fit for modular use
 */
let definitionHandler = function(configArg){
    npmtsOra.text("now making declaration files ready");
    let done = plugins.Q.defer();
    let configTsLenght = Object.keys(configArg.ts).length;
    if(configTsLenght == 0) {
        plugins.beautylog.warn("No declaration files found... Are you sure you don't want them?");
        done.resolve(configArg); //if there are no definition files, resolve...
    }
    let localCounter = 0;
    for (let key in configArg.ts){
        let distPath = configArg.ts[key];
        let stream = plugins.gulp.src(plugins.path.join(distPath,"**/*.d.ts"))
            .pipe(plugins.g.replace(plugins.smartstring.typescript.regexReferencePath,""))
            .pipe(plugins.gulp.dest(distPath))
            .pipe(plugins.g.gFunction(function(){
                localCounter++
                if(localCounter == configTsLenght){
                    plugins.beautylog.ok("made declaration files ready!");
                    done.resolve(configArg)
                };
            },"atEnd"));
        
    }
    return done.promise;
}


export let run = function (configArg) {
    let done = plugins.Q.defer();
    let config = configArg;
    npmtsOra.text("now compiling " + "TypeScript".yellow);
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
        moduleStream.on("finish", function () {
            plugins.beautylog.ok("compiled TypeScript!");
            definitionHandler(config)
                .then(function(){
                    done.resolve(config);
                });
        });
        moduleStream.end();
    });
    /*==================== END TS Compilation =====================*/



    return done.promise;
};
