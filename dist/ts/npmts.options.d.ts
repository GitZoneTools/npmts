/// <reference types="q" />
import "typings-global";
import plugins = require("./npmts.plugins");
export declare let isCi: () => any;
export declare var run: (configArg: any) => plugins.Q.Promise<{}>;
