/// <reference path="./index.ts" />
module NpmtsOptions {
    export var run = function(){
        var done = plugins.q.defer();
        done.resolve(); //TODO: check for options
        return done.promise;
    }
}