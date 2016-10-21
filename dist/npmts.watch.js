"use strict";
const q = require("q");
const smartchok = require("smartchok");
const plugins = require("./npmts.plugins");
const cli = require("./npmts.cli");
let npmtsSmartchok = null;
exports.run = (configArg) => {
    let done = q.defer();
    if (configArg.watch && npmtsSmartchok === null) {
        let pathsToWatch = [];
        for (let key in configArg.ts) {
            pathsToWatch.push(key);
        }
        for (let key in configArg.testTs) {
            pathsToWatch.push(key);
        }
        npmtsSmartchok = new smartchok.Smartchok(pathsToWatch);
        npmtsSmartchok.getObservableFor('change').then((changeObservableArg) => {
            plugins.beautylog.info('now watching...');
            changeObservableArg.subscribe(() => {
                cli.run();
            });
        });
        npmtsSmartchok.start();
        done.resolve(configArg);
    }
    else {
        plugins.beautylog.info('not watching');
        done.resolve(configArg);
    }
    return done.promise;
};
