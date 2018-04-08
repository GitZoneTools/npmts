import * as plugins from './npmts.plugins';

import { LazyModule } from 'smartsystem';

import * as _modCompile from './mod_compile/index';
import * as _modDocs from './mod_docs/index';
import * as _modTest from './mod_test/index';

export let modCompile = new LazyModule<typeof _modCompile>('./mod_compile/index', __dirname);
export let modDocs = new LazyModule<typeof _modDocs>('./mod_docs/index', __dirname);
export let modTest = new LazyModule<typeof _modTest>('./mod_test/index', __dirname);
