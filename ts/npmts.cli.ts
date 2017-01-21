import * as q from 'smartq'

import * as plugins from './npmts.plugins'
import * as paths from './npmts.paths'
import * as NpmtsConfig from './npmts.config'
import * as NpmtsMods from './npmts.mods'
import * as NpmtsWatch from './npmts.watch'
import * as NpmtsShip from './npmts.ship'

export let run = () => {
    let done = q.defer()
    let npmtsProjectInfo = new plugins.projectinfo.ProjectinfoNpm(paths.npmtsPackageRoot)
    let npmtsCli = new plugins.smartcli.Smartcli()
    npmtsCli.standardTask()
        .then((argvArg) => {
            plugins.beautylog.figletSync('NPMTS')
            plugins.beautylog.info('npmts version: ' + npmtsProjectInfo.version)
            return NpmtsConfig.run(argvArg)
        })
        .then((configArg: NpmtsConfig.INpmtsConfig) => {
            let done = q.defer()
            plugins.beautylog.ora.start('loading additional modules...')
            NpmtsMods.mod00.load()
                .then((mod00) => {
                    return mod00.run(configArg)
                })
                .then(configArg => {
                    let done = q.defer<NpmtsConfig.INpmtsConfig>()
                    NpmtsMods.mod01.load()
                        .then(mod01 => {
                            return mod01.run(configArg)
                        })
                        .then(configArg => {
                            done.resolve(configArg)
                        })
                    return done.promise
                })
                .then(configArg => {
                    let done = q.defer<NpmtsConfig.INpmtsConfig>()
                    NpmtsMods.mod02.load()
                        .then(mod02 => {
                            return mod02.run(configArg)
                        })
                        .then(configArg => {
                            done.resolve(configArg)
                        })
                    return done.promise
                })
                .then(NpmtsWatch.run)
                .then(NpmtsShip.run)

            return done.promise
        })
        .catch((err) => { if (err instanceof Error) { console.log(err) } } )
    npmtsCli.addVersion(npmtsProjectInfo.version)
    npmtsCli.startParse()
    return done.promise
}
