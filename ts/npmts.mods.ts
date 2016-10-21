import * as plugins from './npmts.plugins'

import { LazyModule } from 'smartsystem'

import * as _mod00 from './mod00/index'
import * as _mod01 from './mod01/index'
import * as _mod02 from './mod02/index'

export let mod00 = new LazyModule<typeof _mod00>('./mod00/index',__dirname)
export let mod01 = new LazyModule<typeof _mod01>('./mod01/index',__dirname)
export let mod02 = new LazyModule<typeof _mod02>('./mod02/index',__dirname)
