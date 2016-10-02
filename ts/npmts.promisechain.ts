import plugins = require('./npmts.plugins')
import {Ora} from 'beautylog'

import * as q from 'q'

export let npmtsOra = new Ora('setting up TaskChain','cyan')

import * as NpmtsAssets from './npmts.assets'
import * as NpmtsCheck from './npmts.check'
import * as NpmtsClean from './npmts.clean'
import * as NpmtsCompile from './npmts.compile'
import * as NpmtsTypeDoc from './npmts.typedoc'
import * as NpmtsOptions from './npmts.options'
import * as NpmtsTests from './npmts.tests'
import * as NpmtsWatch from './npmts.watch'

export let run = function(argvArg){
    let done = q.defer()
    npmtsOra.start()
    NpmtsOptions.run(argvArg)
        .then(NpmtsClean.run)
        .then(NpmtsCheck.run)
        .then(NpmtsCompile.run)
        .then(NpmtsAssets.run)
        .then(NpmtsTypeDoc.run)
        .then(NpmtsTests.run)
        .then(NpmtsWatch.run)
        .then(function(configArg){
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
        })
        return done.promise
}
