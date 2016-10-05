import plugins = require('./npmts.plugins')
import paths = require('./npmts.paths')

import * as q from 'q'

import { npmtsOra } from './npmts.promisechain'
import { projectInfo } from './npmts.check'

export var run = function(configArg){
    let done = q.defer()
    let config = configArg
    npmtsOra.text('now looking at ' + 'required assets'.yellow)
    if (config.cli === true) {
        let mainJsPath = projectInfo.packageJson.main
        let cliJsString: string = plugins.smartfile.fs.toStringSync(plugins.path.join(paths.npmtsAssetsDir,'cli.js'))
        cliJsString = cliJsString.replace('{{pathToIndex}}',mainJsPath)
        plugins.smartfile.memory.toFsSync(cliJsString, plugins.path.join(paths.distDir,'cli.js'))
        plugins.beautylog.ok('installed CLI assets!')
        done.resolve(config)
    } else {
        plugins.beautylog.ok('No additional assets required!')
        done.resolve(config)
    }
    return done.promise
}
