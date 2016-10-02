import plugins = require('./npmts.plugins')
import paths = require('./npmts.paths')

import * as q from 'q'
import {npmtsOra} from './npmts.promisechain'

export var run = function(configArg){
    let done = q.defer()
    let config = configArg
    npmtsOra.text('now looking at ' + 'required assets'.yellow)
    if (config.cli === true) {
        plugins.smartfile.fs.copySync(
            plugins.path.join(paths.npmtsAssetsDir,'cli.js'),
            plugins.path.join(paths.distDir,'cli.js')
        )
        plugins.beautylog.ok('installed CLI assets!')
        done.resolve(config)
    } else {
        plugins.beautylog.ok('No additional assets required!')
        done.resolve(config)
    }
    return done.promise
}
