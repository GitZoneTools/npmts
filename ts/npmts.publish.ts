import "typings-global";
import plugins = require("./npmts.plugins");
import paths = require("./npmts.paths");
import NpmtsJsdoc = require("./npmts.jsdoc");

export let run = function(configArg){
    let done = plugins.Q.defer();
    let config = configArg;
    done.resolve();
    return done.promise;
};