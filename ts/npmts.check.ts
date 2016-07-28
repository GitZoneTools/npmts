import * as plugins from "./npmts.plugins";
import * as paths from "./npmts.paths";
import { npmtsOra } from "./npmts.promisechain";

let checkProjectTypings = (configArg) => {
    let done = plugins.Q.defer();
    let cwdProjectInfo = new plugins.projectinfo.ProjectinfoNpm(paths.cwd);
    if(typeof cwdProjectInfo.packageJson.typings == "undefined"){
        plugins.beautylog.error(`please add typings field to package.json`);
        process.exit(1);
    };
    done.resolve(configArg);
    return done.promise;
};

const depcheckOptions = {
    ignoreBinPackage: false, // ignore the packages with bin entry
    parsers: { // the target parsers
        '*.ts': plugins.depcheck.parser.typescript,
    },
    detectors: [ // the target detectors
        plugins.depcheck.detector.requireCallExpression,
        plugins.depcheck.detector.importDeclaration
    ],
    specials: [ // the target special parsers
        plugins.depcheck.special.eslint,
        plugins.depcheck.special.webpack
    ],
};

let checkDependencies = (configArg) => {
    let done = plugins.Q.defer();
    let depcheckOptionsMerged = plugins.lodashObject.merge(depcheckOptions, {
        ignoreDirs: [ // folder with these names will be ignored
            'test',
            'dist',
            'bower_components'
        ],
        ignoreMatches: [ // ignore dependencies that matches these globs
            "@types/*",
            "babel-preset-*"
        ]
    })
    plugins.depcheck(paths.cwd, depcheckOptionsMerged, (unused) => {
        for (let item of unused.dependencies) {
            plugins.beautylog.warn(`Watch out: unused dependency ${item.red}`);
        };
        for (let item of unused.devDependencies) {
            plugins.beautylog.log(`unused devDependency ${item.red}`);
        };
        for (let item of unused.missing) {
            plugins.beautylog.error(`unused devDependency ${item.red}`);
        };
        if (unused.missing.length > 0) {
            plugins.beautylog.info("exiting due to missing dependencies in package.json");
            process.exit(1);
        }
        for (let item of unused.using) {
            console.log(item);
        };
        for (let item of unused.invalidFiles) {
            plugins.beautylog.warn(`Watch out: could not parse file ${item.red}`);
        };
        for (let item of unused.invalidDirs) {
            plugins.beautylog.warn(`Watch out: could not parse directory ${item.red}`);
        };
        done.resolve(configArg);
    });
    return done.promise;
};

let checkDevDependencies = (configArg) => {
    let done = plugins.Q.defer();
    let depcheckOptionsMerged = plugins.lodashObject.merge(depcheckOptions, {
        ignoreDirs: [ // folder with these names will be ignored
            'ts',
            'dist',
            'bower_components'
        ],
        ignoreMatches: [ // ignore dependencies that matches these globs
            "@types/*",
            "babel-preset-*"
        ]
    })
    plugins.depcheck(paths.cwd, depcheckOptionsMerged, (unused) => {
        for (let item of unused.devDependencies) {
            plugins.beautylog.log(`unused devDependency ${item.red}`);
        };
        for (let item of unused.using) {
            console.log(item);
        };
        for (let item of unused.invalidFiles) {
            plugins.beautylog.warn(`Watch out: could not parse file ${item.red}`);
        };
        for (let item of unused.invalidDirs) {
            plugins.beautylog.warn(`Watch out: could not parse directory ${item.red}`);
        };
        done.resolve(configArg);
    });
    return done.promise;
};

let checkNodeVersion = (configArg) => {
    let done = plugins.Q.defer();

    done.resolve(configArg);
    return done.promise;
}

export let run = (configArg) => {
    let done = plugins.Q.defer();
    npmtsOra.text("running project checks..."),
        checkProjectTypings(configArg)
            .then(checkDependencies)
            .then(checkDevDependencies)
            .then(checkNodeVersion)
            .then(done.resolve);
    return done.promise;
}
