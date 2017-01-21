import * as q from 'smartq'

import * as paths from '../npmts.paths'

import * as plugins from './mod00.plugins'

export let run = function (configArg) {
    let done = q.defer()
    let config = configArg
    plugins.beautylog.ora.text('now compiling ' + 'TypeScript'.yellow)
    plugins.tsn.compileGlobStringObject(config.ts,config.tsOptions,paths.cwd)
        .then(() => {
            plugins.beautylog.ok('compiled main TypeScript!')
            plugins.beautylog.log('now compiling tests!')
            return plugins.tsn.compileGlobStringObject(config.testTs,config.tsOptions,paths.cwd)
        })
        .then(function () {
            plugins.beautylog.ok('compiled all TypeScript!')
            done.resolve(config)
        }).catch(err => { console.log(err) })
    return done.promise
}
