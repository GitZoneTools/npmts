/// <reference types="q" />
import * as plugins from './npmts.plugins';
import { INpmtsConfig } from './npmts.options';
export declare let run: (configArg: INpmtsConfig) => plugins.q.Promise<{}>;
