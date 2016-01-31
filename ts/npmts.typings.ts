/// <reference path="./index.ts" />
module NpmtsTypings {
    export var run = function(){
        var done = plugins.q.defer();
        plugins.beautylog.log("now installing typings");
        plugins.typings.install({production: false, cwd: paths.tsDir})
            .then(function(){
                done.resolve();
            });
        return done.promise;
    }
}