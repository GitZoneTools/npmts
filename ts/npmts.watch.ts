import * as plugins from './npmts.plugins'
import * as promisechain from './npmts.promisechain'

import * as q from 'q'

import { INpmtsConfig } from './npmts.options'

let npmtsSmartchok: plugins.smartchok.Smartchok = null
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
        npmtsSmartchok = new plugins.smartchok.Smartchok(pathsToWatch)
        npmtsSmartchok.getObservableFor('change').then((changeObservableArg) => {
            plugins.beautylog.info('now watching...')
            changeObservableArg.subscribe(() => {
                promisechain.run(configArg)
            })
        })
        npmtsSmartchok.start()
        done.resolve(configArg)
    } else {
        done.resolve(configArg)
    }
    return done.promise
}
