/// <reference types="q" />
import * as q from 'q';
export declare type npmtsMode = 'default' | 'custom';
export interface INpmtsConfig {
    argv: any;
    coverageTreshold: number;
    mode: npmtsMode;
    test: boolean;
    testTs: any;
    ts: any;
    tsOptions: any;
    watch: boolean;
}
export declare var run: (argvArg: any) => q.Promise<{}>;
