/**
 * specifies the different modes available
 * default -> uses default options no matterm what
 * merge -> uses merged default + custom options
 * custom -> only uses specified options
 */
export declare type npmtsMode = 'default' | 'custom' | 'merge';
export interface INpmtsConfig {
    argv: any;
    coverage: boolean;
    coverageTreshold: number;
    checkDependencies: boolean;
    mode: npmtsMode;
    test: boolean;
    testTs: any;
    testConfig: any;
    ts: any;
    tsOptions: any;
    watch: boolean;
    runData: {
        coverageLcovInfo?: string;
        coverageResult?: number;
    };
}
export declare let run: (argvArg: any) => Promise<{}>;
