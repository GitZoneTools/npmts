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
export declare let run: (argvArg: any) => Promise<{}>;
