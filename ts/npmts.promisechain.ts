/// <reference path="./index.ts" />
module NpmtsPromisechain {
    export var init = function(){
        var promisechain;
        NpmtsOptions.run()
            .then(NpmtsDefault.run)
            .then(NpmtsTests.run);
        return promisechain;
    }
}