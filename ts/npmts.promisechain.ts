/// <reference path="./index.ts" />
module NpmtsPromisechain {
    export var init = function(){
        var promisechain;
        NpmtsConfigFile.run()
            .then(NpmtsOptions.run)
            .then(NpmtsCompile.run)
            .then(NpmtsTests.run);
        return promisechain;
    }
}