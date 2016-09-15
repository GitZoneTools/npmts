import 'typings-global'
import plugins = require('./npmts.plugins')
import paths = require('./npmts.paths')
import helpers = require('./npmts.compile.helpers')
import {npmtsOra} from './npmts.promisechain'

let compileTs = (tsFileArrayArg: string[],tsOptionsArg = {}) => {
    let done = plugins.Q.defer()

    let compilerOptionsDefault = {
        declaration: true,
        module: 'CommonJS',
        target: 'ES6'
    }

    /**
     * merges default ts options with those found in npmts.json
     */
    let compilerOptions = function (keyArg: string) {
        let tsOptionsCombined = plugins.lodashObject.merge(compilerOptionsDefault, tsOptionsArg)
        let compilerOptions: plugins.tsn.CompilerOptions = {
            declaration: tsOptionsCombined.declaration,
            module: plugins.tsn.ModuleKind[tsOptionsCombined.module],
            target: plugins.tsn.ScriptTarget[tsOptionsCombined.target],
            exclude: 'node_modules/**/*'
        }
        return compilerOptions
    }
    for (let keyArg in tsFileArrayArg) {
        plugins.beautylog.info(`TypeScript assignment: transpile from ${keyArg.blue} to ${tsFileArrayArg[keyArg].blue}`)
        if (helpers.checkOutputPath(tsFileArrayArg,keyArg)) {
            plugins.smartfile.fs.listFileTree(process.cwd(),keyArg)
                .then((filesToConvertArg: string[]) => {
                    let filesToConvertAbsolute = plugins.smartpath.transform.toAbsolute(filesToConvertArg,process.cwd())
                    let destDir = plugins.smartpath.transform.toAbsolute(tsFileArrayArg[keyArg],process.cwd())
                    return plugins.tsn.compile(
                        filesToConvertAbsolute,
                        destDir,
                        compilerOptions(keyArg)
                    )
                })
                .then(() => {
                    done.resolve()
                })
        }
    }
    return done.promise
}

export let run = function (configArg) {
    let done = plugins.Q.defer()
    let config = configArg
    npmtsOra.text('now compiling ' + 'TypeScript'.yellow)

    compileTs(config.ts,config.tsOptions)
        .then(() => {
            plugins.beautylog.ok('compiled main TypeScript!')
            plugins.beautylog.log('now compiling tests!')
            return compileTs(config.testTs)
        })
        .then(function () {
            plugins.beautylog.ok('compiled all TypeScript!')
            done.resolve(config)
        })
    return done.promise
}
