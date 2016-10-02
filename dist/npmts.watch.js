"use strict";
const plugins = require("./npmts.plugins");
const promisechain = require("./npmts.promisechain");
const q = require("q");
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
        npmtsSmartchok = new plugins.smartchok.Smartchok(pathsToWatch);
        npmtsSmartchok.getObservableFor('change').then((changeObservableArg) => {
            plugins.beautylog.info('now watching...');
            changeObservableArg.subscribe(() => {
                promisechain.run(configArg);
            });
        });
        npmtsSmartchok.start();
        done.resolve(configArg);
    }
    else {
        done.resolve(configArg);
    }
    return done.promise;
};
