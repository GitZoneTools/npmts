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

export let publishDocs = function(configArg){
    let done = plugins.Q.defer();
    let gitUrl = plugins.projectinfo.npm(
        paths.cwd,
        {
            gitAccessToken:process.env.GITHUB_TOKEN
        }
    ).git.httpsUrl;

    let deployScript = ""
        + "cd " + paths.docsDir + " "
        + "&& git init " + "> /dev/null 2>&1 "
        + "&& git config user.name \"TRAVIS CI\" " + "> /dev/null 2>&1 "
        + "&& git config user.email \"travis@shipzone.io\" " + "> /dev/null 2>&1 "
        + "&& git add . " + "> /dev/null 2>&1 "
        + "&& git commit -m \"Deploy to GitHub Pages\" " + "> /dev/null 2>&1 "
        + "&& git push --force --quiet "
        + "\"" + gitUrl + "\" "
        + "master:gh-pages " + "> /dev/null 2>&1";


    plugins.beautylog.log("now publishing JsDoc documentation to GitHub");
    if (!plugins.shelljs.which('git')) {
        plugins.beautylog.error('Git is not installed!');
        plugins.shelljs.exit(1);
    } else if (plugins.shelljs.exec(deployScript).code !== 0) {
        plugins.beautylog.error('Git failed!');
        plugins.shelljs.exit(1);
    }
    plugins.beautylog.ok("JsDoc documentation has been deployed to GitHub!");
    done.resolve(configArg);

    return done.promise;
};


export let run = function(configArg){
    let done = plugins.Q.defer();
    genJsdoc(configArg)
        .then(done.resolve);
    return done.promise;
};