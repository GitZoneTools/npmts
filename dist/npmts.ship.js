"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const q = require("smartq");
const plugins = require("./npmts.plugins");
exports.run = (configArg) => {
    let done = q.defer();
    let shipString = '' +
        '\n' +
        '\n' +
        '                                         # #  ( )\n' +
        '                                      ___#_#___|__\n' +
        '                                  _  |____________|  _\n' +
        '                           _=====| | |            | | |==== _\n' +
        '                     =====| |.---------------------------. | |====\n' +
        "       <--------------------'   .  .  .  .  .  .  .  .   '--------------/\n" +
        '         \\                                                             /\n' +
        '          \\___________________________________________________________/\n' +
        '    wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww\n' +
        '   wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww\n' +
        '     wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww\n';
    if (process.env.CI) {
        console.log(shipString);
        plugins.beautylog.success('READY TO SHIP!');
    }
    else {
        plugins.beautylog.success('Done!');
    }
    done.resolve(configArg);
};
