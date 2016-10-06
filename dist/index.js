/* ================================================== *
    **** NPMTS ****
    Fabulous TypeScript development
 * ================================================== */
"use strict";
const early = require("early");
early.start('NPMTS');
const plugins = require("./npmts.plugins");
const cli = require("./npmts.cli");
early.stop()
    .then(() => {
    let loaded = plugins; // to make sure plugins get actually loaded
    cli.run();
});
