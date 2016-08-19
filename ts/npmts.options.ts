import "typings-global";
import plugins = require("./npmts.plugins");
import paths = require("./npmts.paths");
import {npmtsOra} from "./npmts.promisechain";

export type npmtsMode = "default" | "custom"

export interface npmtsConfig {
        argv:any,
        coverageTreshold:number,
        docs:boolean,
        mode: npmtsMode,
        test:boolean,
        testTs:any,
        ts:any,
        tsOptions:any
        
};


export var run = function(argvArg){
    let done = plugins.Q.defer();
    let defaultConfig:npmtsConfig = {
        argv:undefined,
        coverageTreshold: 70,
        docs: true,
        mode:"default",
        test:true,
        testTs:{},
        ts:{},
        tsOptions: {}
    };


    // mix with configfile
    npmtsOra.text("looking for npmextra.json");
    let config:npmtsConfig = plugins.npmextra.dataFor({
        toolName:"npmts",
        defaultSettings:defaultConfig,
        cwd:paths.cwd
    });

    // add argv
    config.argv = argvArg;

    // check mode
    switch (config.mode){
        case "default":
        case "custom":
            plugins.beautylog.ok("mode is " + config.mode);
            done.resolve(config);
            break;
        default:
            plugins.beautylog.error(`mode not recognised!`);
            process.exit(1);
    };

    //handle default mode
    if (config.mode == "default"){
        config.ts = {
            ["./ts/**/*.ts"]: "./dist/"
        };
        config.testTs = {
            ["./test/test.ts"]: "./test/"
        };
    };


    // mix with commandline
    if(config.argv.notest){
        config.test = false;
    };
    if(config.argv.nodocs){
        config.docs = false;
    };


    plugins.beautylog.ok("build options are ready!");
    done.resolve(config);
    return done.promise;
};