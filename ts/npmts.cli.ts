import * as q from 'smartq'

import * as plugins from './npmts.plugins'
import * as paths from './npmts.paths'
import * as NpmtsConfig from './npmts.config'
import * as NpmtsMods from './npmts.mods'
import * as NpmtsWatch from './npmts.watch'
import * as NpmtsShip from './npmts.ship'

/**
 * smartanalytics
 * this data is fully anonymized (no Ips or any other personal information is tracked).
 * It just keeps track which of our tools are really used...
 * ... so we know where to spend our limited resources for improving them.
 * Since yarn is out and there is heavy caching going on,
 * pure download stats are just not reliable enough for us anymore
 * Feel free to dig into the smartanalytics package, if you are interested in how it works.
 * It is just an https call to our own Lossless Analytics API.
 * Our privacy policy can be found here: https://lossless.gmbh/privacy.html
 */
let npmtsAnalytics = new plugins.smartanalytics.Analytics({
  apiEndPoint: 'https://pubapi-1.lossless.one/analytics',
  projectId: 'gitzone',
  appName: 'npmts'
})

process.nextTick(async () => {
  // make the analytics call
  npmtsAnalytics.recordEvent('npmToolExecution', {
    executionMode: (await NpmtsConfig.configPromise).mode,
    tsOptions: (await NpmtsConfig.configPromise).tsOptions,
    watch: (await NpmtsConfig.configPromise).watch,
    coverageTreshold: (await NpmtsConfig.configPromise).coverageTreshold
  }).catch(err => {
    plugins.beautylog.warn('Lossless Analytics API not available...')
  })
})

export let run = async () => {
  let done = q.defer()

  plugins.beautylog.figletSync('NPMTS')
  let npmtsProjectInfo = new plugins.projectinfo.ProjectinfoNpm(paths.npmtsPackageRoot)
  // check for updates
  await plugins.smartupdate.standardHandler.check('npmts', npmtsProjectInfo.version, 'http://gitzone.gitlab.io/npmts/changelog.html')
  plugins.beautylog.log('---------------------------------------------')
  let npmtsCli = new plugins.smartcli.Smartcli()
  npmtsCli.standardTask()
    .then((argvArg) => {
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
    .catch((err) => { if (err instanceof Error) { console.log(err) } })
  npmtsCli.addVersion(npmtsProjectInfo.version)
  npmtsCli.startParse()
  return await done.promise
}
