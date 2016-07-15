import "typings-global";
import plugins = require("./npmts.plugins");
import paths = require("./npmts.paths");
import {npmtsOra} from "./npmts.promisechain";

let genTypeDoc = function(configArg){
    let done = plugins.Q.defer();
    npmtsOra.text("now generating " + "TypeDoc documentation".yellow);
    plugins.beautylog.log("TypeDoc Output:");
    plugins.gulp.src(plugins.path.join(paths.tsDir,"**/*.ts"))
        .pipe(plugins.g.typedoc({
			// TypeScript options (see typescript docs) 
			module: "commonjs",
			target: "es6",
			includeDeclarations: true,
 
			// Output options (see typedoc docs) 
			out: paths.docsDir,
			json: plugins.path.join(paths.docsDir,"file.json"),
 
			// TypeDoc options (see typedoc docs) 
			name: "my-project",
			
            //theme: "default",
			ignoreCompilerErrors: true,
			version: true,
		}))
        .pipe(plugins.g.gFunction(done.resolve,"atEnd"));
    return done.promise;
};


export let run = function(configArg){
    let done = plugins.Q.defer();
    genTypeDoc(configArg)
        .then(() => {
            done.resolve(configArg);
        });
    return done.promise;
};