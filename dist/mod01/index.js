"use strict";
/* ------------------------------------------
 * This module creates TypeScript documentation
 * -------------------------------------------- */
const q = require("q");
exports.run = function (configArg) {
    let done = q.defer();
    done.resolve(configArg);
    return done.promise;
};
