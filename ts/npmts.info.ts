/// <reference path="./index.ts" />

module NpmtsInfo {
    export var init = function(){
        if(process.env.TRAVIS){
            plugins.beautylog.warn("We are on TRAVIS. Typings will not be installed due to GitHub API restrictions.");
            plugins.beautylog.log("Make sure the repo tracks ting directories")
        } else {
            plugins.beautylog.log("We are on a dev machine. Typings will be installed prior to TypeScript compilation.");
        }
    }
}
