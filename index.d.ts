/// <reference path="../ts/typings/tsd.d.ts" />
declare module NpmtsPlugins {
    var init: () => {
        beautylog: any;
        fs: any;
        gulp: any;
        g: {
            insert: any;
            sequence: any;
            tsd: any;
            typescript: any;
        };
        mergeStream: any;
        mocha: any;
        path: any;
        q: any;
        smartcli: any;
    };
}
declare module NpmtsPaths {
    var init: () => any;
}
declare module NpmtsOptions {
    var run: () => any;
}
declare module NpmtsDefault {
    var run: () => any;
}
declare module NpmtsTests {
    var run: () => any;
}
declare module NpmtsPromisechain {
    var init: () => any;
}
declare var plugins: {
    beautylog: any;
    fs: any;
    gulp: any;
    g: {
        insert: any;
        sequence: any;
        tsd: any;
        typescript: any;
    };
    mergeStream: any;
    mocha: any;
    path: any;
    q: any;
    smartcli: any;
};
declare var paths: any;
declare var promisechain: any;
