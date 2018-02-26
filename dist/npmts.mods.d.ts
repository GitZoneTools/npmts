import * as plugins from './npmts.plugins';
import * as _modCompile from './mod_compile/index';
import * as _modDocs from './mod_docs/index';
import * as _modTest from './mod_test/index';
export declare let modCompile: plugins.smartsystem.LazyModule<typeof _modCompile>;
export declare let modDocs: plugins.smartsystem.LazyModule<typeof _modDocs>;
export declare let modTest: plugins.smartsystem.LazyModule<typeof _modTest>;
