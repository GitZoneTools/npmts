import * as plugins from './npmts.plugins'
import * as paths from './npmts.paths'
import * as promisechain from './npmts.promisechain'
import * as q from 'q'

export let run = () => {
    let done = q.defer()
    let npmtsProjectInfo = new plugins.projectinfo.ProjectinfoNpm(paths.npmtsPackageRoot)
    let npmtsCli = new plugins.smartcli.Smartcli()
    npmtsCli.standardTask()
        .then((argvArg) => {
            plugins.beautylog.figletSync('NPMTS')
            plugins.beautylog.info('npmts version: ' + npmtsProjectInfo.version)
            promisechain.run(argvArg).catch((err) => { console.log(err) })
        })
    npmtsCli.addVersion(npmtsProjectInfo.version)
    npmtsCli.startParse()
    return done.promise
}
