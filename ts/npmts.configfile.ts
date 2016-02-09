/// <reference path="./index.ts" />
module NpmtsConfigFile {
    export var run = function(){
        var done = plugins.q.defer();
        var config:any = {};
        var configPath = plugins.path.join(paths.cwd,"npmts.json");
        if(plugins.smartfile.checks.fileExistsSync(configPath)){
            plugins.beautylog.info("npmts.json".blue + " config file found!");
            config = plugins.smartfile.readFileToObject(configPath);
            switch (config.mode){
                case "default":
                case "custom":
                    plugins.beautylog.log("mode is " + config.mode.yellow);
                    done.resolve(config);
                    break;
                default:
                    plugins.beautylog.error("mode " + config.mode.yellow + " not recognised!".red);
            };
        } else {
            plugins.beautylog.log("no config file found: so mode is " + "default".yellow);
            config.mode = "default";
            done.resolve(config);
        };
        return done.promise;
    }
}