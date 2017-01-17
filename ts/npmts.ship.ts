import * as q from 'smartq'

import * as plugins from './npmts.plugins'

import { INpmtsConfig } from './npmts.config'

export let run = (configArg: INpmtsConfig) => {
    let done = q.defer()
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
        '     wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww\n'
    if (process.env.CI) {
        console.log(shipString)
        plugins.beautylog.success('READY TO SHIP!')
    } else {
        plugins.beautylog.success('Done!')
    }
    done.resolve(configArg)
}
