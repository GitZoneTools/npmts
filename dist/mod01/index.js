"use strict";
/* ------------------------------------------
 * This module creates TypeScript documentation
 * -------------------------------------------- */
const q = require("smartq");
exports.run = function (configArg) {
    let done = q.defer();
    done.resolve(configArg);
    return done.promise;
};
