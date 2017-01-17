/* ------------------------------------------
 * This module creates TypeScript documentation
 * -------------------------------------------- */
import * as q from 'smartq'

import * as paths from '../npmts.paths'
import { npmtsOra } from '../npmts.log'
import { INpmtsConfig } from '../npmts.config'

import * as plugins from './mod01.plugins'

export let run = function (configArg: INpmtsConfig) {
    let done = q.defer<INpmtsConfig>()
    done.resolve(configArg)
    return done.promise
}
