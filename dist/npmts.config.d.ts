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
    runData: {
        coverageLcovInfo?: string;
        coverageResult?: number;
    };
}
export declare let run: (argvArg: any) => Promise<{}>;
