import * as q from 'q'
import * as smartchok from 'smartchok'

import * as plugins from './npmts.plugins'
import * as cli from './npmts.cli'

import { INpmtsConfig } from './npmts.config'

let npmtsSmartchok: smartchok.Smartchok = null
export let run = (configArg: INpmtsConfig) => {
    let done = q.defer()
    if (configArg.watch && npmtsSmartchok === null) {
        let pathsToWatch: string[] = []
        for (let key in configArg.ts) {
            pathsToWatch.push(key)
        }
        for (let key in configArg.testTs) {
            pathsToWatch.push(key)
        }
        npmtsSmartchok = new smartchok.Smartchok(pathsToWatch)
        npmtsSmartchok.getObservableFor('change').then((changeObservableArg) => {
            plugins.beautylog.info('now watching...')
            changeObservableArg.subscribe(() => {
                cli.run()
            })
        })
        npmtsSmartchok.start()
        done.resolve(configArg)
    } else {
        plugins.beautylog.info('not watching')
        done.resolve(configArg)
    }
    return done.promise
}
