import * as q from 'smartq'
import paths = require('../npmts.paths')

import plugins = require('./mod00.plugins')

/**
 * removes the  dist directory which will be entirely rebuild
 */
let removeDist = function () {
    plugins.beautylog.ora.text('cleaning dist folder')
    return plugins.smartfile.fs.remove(paths.distDir)
}

/**
 * remove .d.ts files from testDirctory
 */
let removeTestDeclarations = function () {
    let done = q.defer()
    plugins.smartfile.fs.listFileTree('./test/', '**/*.d.ts').then(fileArray => {
        let fileArrayToRemove = plugins.smartpath.transform.toAbsolute(fileArray, process.cwd() + '//test/')
        plugins.smartfile.fs.removeManySync(fileArrayToRemove)
        done.resolve()
    })
}

/**
 * remove old pages
 */
let removePages = function () {
    plugins.beautylog.ora.text('cleaning pages folder')
    return plugins.smartfile.fs.remove(paths.pagesDir)
}

export let run = function (configArg) {
    plugins.beautylog.ora.text('cleaning up from previous builds...')
    let done = q.defer()
    removeDist()
        .then(removeTestDeclarations)
        .then(removePages)
        .then(function () {
            plugins.beautylog.ok('Cleaned up from previous builds!')
            done.resolve(configArg)
        })
    return done.promise
}