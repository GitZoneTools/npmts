import 'typings-global'
import plugins = require('./npmts.plugins')
import paths = require('./npmts.paths')
import {npmtsOra} from './npmts.promisechain'

export let run = function (configArg) {
    let done = plugins.q.defer()
    let config = configArg
    npmtsOra.text('now compiling ' + 'TypeScript'.yellow)
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
