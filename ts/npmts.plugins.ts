import 'typings-global'
import * as beautylog from 'beautylog'
let depcheck = require('depcheck')

import * as lodash from 'lodash'
import * as npmextra from 'npmextra'
import * as projectinfo from 'projectinfo'
import * as path from 'path'
import * as smartcli from 'smartcli'
import * as smartenv from 'smartenv'
import * as smartfile from 'smartfile'
import * as smartpath from 'smartpath'
import * as smartstream from 'smartstream'
import * as smartstring from 'smartstring'
import * as smartsystem from 'smartsystem'
import * as through2 from 'through2'
export let sourceMapSupport = require('source-map-support').install() // display errors correctly during testing

export {
    beautylog,
    depcheck,
    lodash,
    npmextra,
    projectinfo,
    path,
    smartcli,
    smartenv,
    smartfile,
    smartpath,
    smartstream,
    smartstring,
    smartsystem,
    through2
}
