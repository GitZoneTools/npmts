/// <reference path="../ts/typings/tsd.d.ts" />
declare module NpmtsPlugins {
    var init: () => {
        beautylog: any;
        gulp: any;
        g: {
            insert: any;
            sequence: any;
            tsd: any;
            typescript: any;
        };
        mergeStream: any;
        path: any;
        smartcli: any;
    };
}
declare module NpmtsPaths {
    var init: () => any;
}
declare module NpmtsDefault {
    var init: () => void;
}
declare var plugins: {
    beautylog: any;
    gulp: any;
    g: {
        insert: any;
        sequence: any;
        tsd: any;
        typescript: any;
    };
    mergeStream: any;
    path: any;
    smartcli: any;
};
declare var paths: any;
