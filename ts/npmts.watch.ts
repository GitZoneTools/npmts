import * as plugins from './npmts.plugins'
import * as promisechain from './npmts.promisechain'
let npmtsSmartchok: plugins.smartchok.Smartchok = null

export let run = (configArg) => {
    let done = plugins.q.defer()
    if (configArg.watch && npmtsSmartchok === null) {
        let pathsToWatch: string[] = []
        for (let key in configArg.ts) {
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
