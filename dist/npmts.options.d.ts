/// <reference types="q" />
import 'typings-global';
import plugins = require('./npmts.plugins');
export declare type npmtsMode = 'default' | 'custom';
export interface INpmtsConfig {
    argv: any;
    coverageTreshold: number;
    docs: boolean;
    mode: npmtsMode;
    test: boolean;
    testTs: any;
    ts: any;
    tsOptions: any;
}
export declare var run: (argvArg: any) => plugins.Q.Promise<{}>;
