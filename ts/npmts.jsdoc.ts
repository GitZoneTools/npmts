import "typings-global";
import plugins = require("./npmts.plugins");
import paths = require("./npmts.paths");
import {npmtsOra} from "./npmts.promisechain";

let genJsdoc = function(configArg){
    let done = plugins.Q.defer();
    npmtsOra.text("now generating " + "JsDoc documentation".yellow);
    plugins.gulp.src([
            plugins.path.join(paths.cwd,"README.md"),
            plugins.path.join(paths.distDir,"**/*.js")
        ])
        .pipe(plugins.g.jsdoc3({
            opts: {
                destination: paths.docsDir
            }
        }, function(){
            plugins.beautylog.ok("JsDoc documentation has been generated!");
            done.resolve(configArg)
        }));
    return done.promise;
};


export let run = function(configArg){
    let done = plugins.Q.defer();
    genJsdoc(configArg)
        .then(done.resolve);
    return done.promise;
};