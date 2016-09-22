import 'typings-global'
import plugins = require('./npmts.plugins')
import paths = require('./npmts.paths')
import {npmtsOra} from './npmts.promisechain'

let removeDist = function(){
    npmtsOra.text('cleaning dist folder')
    return plugins.smartfile.fs.remove(paths.distDir)
}

let removePages = function(){
    npmtsOra.text('cleaning pages folder')
    return plugins.smartfile.fs.remove(paths.pagesDir)
}

export let run = function(configArg){
    npmtsOra.text('cleaning up from previous builds...')
    let done = plugins.q.defer()
    removeDist()
        .then(removePages)
        .then(function(){
            plugins.beautylog.ok('Cleaned up from previous builds!')
            done.resolve(configArg)
        })
    return done.promise
}
