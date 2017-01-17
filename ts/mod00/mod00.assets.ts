import * as q from 'smartq'

import paths = require('../npmts.paths')
import { npmtsOra } from '../npmts.log'

import plugins = require('./mod00.plugins')
import { projectInfo } from '../mod00/mod00.check'

export let run = function(configArg){
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
