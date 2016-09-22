"use strict";
require("typings-global");
const plugins = require("./npmts.plugins");
const paths = require("./npmts.paths");
const npmts_promisechain_1 = require("./npmts.promisechain");
const npmts_check_1 = require("./npmts.check");
let genTypeDoc = function (configArg) {
    let done = plugins.q.defer();
    npmts_promisechain_1.npmtsOra.text('now generating ' + 'TypeDoc documentation'.yellow);
    plugins.beautylog.log('TypeDoc Output:');
    plugins.gulp.src(plugins.path.join(paths.tsDir, '**/*.ts'))
        .pipe(plugins.g.typedoc({
        // TypeScript options (see typescript docs) 
        module: 'commonjs',
        target: 'es6',
        includeDeclarations: true,
        // Output options (see typedoc docs) 
        out: paths.pagesApiDir,
        json: plugins.path.join(paths.pagesApiDir, 'file.json'),
        // TypeDoc options (see typedoc docs) 
        name: npmts_check_1.projectInfo.name,
        readme: plugins.path.join(paths.cwd, 'README.md'),
        // theme: "default",
        ignoreCompilerErrors: true,
        version: true
    }))
        .pipe(plugins.g.gFunction(done.resolve, 'atEnd'));
    return done.promise;
};
exports.run = function (configArg) {
    let done = plugins.q.defer();
    if (configArg.docs) {
        genTypeDoc(configArg)
            .then(() => {
            done.resolve(configArg);
        });
    }
    else {
        done.resolve(configArg);
    }
    ;
    return done.promise;
};
