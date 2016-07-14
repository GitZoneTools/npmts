import "typings-global";
import plugins = require("./npmts.plugins");
import paths = require("./npmts.paths");
import {npmtsOra} from "./npmts.promisechain";

let genEsDoc = function(configArg){
    let done = plugins.Q.defer();
    npmtsOra.text("now generating " + "EsDoc documentation".yellow);
    plugins.beautylog.log("ESDoc Output:");
    let esdocConfig = {
        source: paths.distDir,
        destination: paths.docsDir 
    };
    plugins.esdoc.generate(esdocConfig,plugins.esdocPublisher);
    plugins.beautylog.ok("Docs by EsDoc have been created!");
    done.resolve(configArg);
    return done.promise;
};


export let run = function(configArg){
    let done = plugins.Q.defer();
    genEsDoc(configArg)
        .then(() => {
            done.resolve(configArg);
        });
    return done.promise;
};