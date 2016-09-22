/// <reference types="q" />
import 'typings-global';
import plugins = require('./npmts.plugins');
import { Ora } from 'beautylog';
export declare let npmtsOra: Ora;
export declare let run: (argvArg: any) => plugins.q.Promise<{}>;
