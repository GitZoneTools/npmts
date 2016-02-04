/// <reference path="./index.ts" />
module NpmtsOptions {
    export var config:any = {};
    export var run = function(){
        var done = plugins.q.defer();
        var configPath = plugins.path.join(paths.cwd,"npmts.json");
        if(plugins.smartfile.checks.fileExistsSync(configPath)){
            plugins.beautylog.info("npmts.json".blue + " config file found!");
            config = plugins.smartfile.readFileToObject(configPath);
            switch (config.mode){
                case "default":
                    plugins.beautylog.log("mode is " + config.mode.yellow);
                    done.resolve();
                    break;
                case "custom":
                    plugins.beautylog.log("mode is " + config.mode.yellow);
                    done.resolve();
                    break;
                default:
                    plugins.beautylog.error("mode " + config.mode.yellow + " not recognised!".red);
            };
        } else {
            plugins.beautylog.log("no config file found: so mode is " + "default".yellow);
            config.mode = "default";
            done.resolve();
        };
        return done.promise;
    }
}