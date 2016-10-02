import 'typings-global'
import * as beautylog from 'beautylog'
let depcheck = require('depcheck')
import * as gulp from 'gulp'
let g = {
    babel: require('gulp-babel'),
    istanbul: require('gulp-istanbul'),
    gFunction: require('gulp-function'),
    injectModules: require('gulp-inject-modules'),
    mocha: require('gulp-mocha'),
    sourcemaps: require('gulp-sourcemaps'),
    typedoc: require('gulp-typedoc')
}
import * as lodash from 'lodash'
import * as npmextra from 'npmextra'
import * as projectinfo from 'projectinfo'
import * as path from 'path'
import * as shelljs from 'shelljs'
import * as smartchok from 'smartchok'
import * as smartcli from 'smartcli'
import * as smartcov from 'smartcov'
import * as smartenv from 'smartenv'
import * as smartfile from 'smartfile'
import * as smartpath from 'smartpath'
import * as smartstream from 'smartstream'
import * as smartstring from 'smartstring'
export let sourceMapSupport = require('source-map-support').install() // display errors correctly during testing
import * as tsn from 'tsn'

export {
    beautylog,
    depcheck,
    gulp,
    g,
    lodash,
    npmextra,
    projectinfo,
    path,
    shelljs,
    smartchok,
    smartcli,
    smartcov,
    smartenv,
    smartfile,
    smartpath,
    smartstream,
    smartstring,
    tsn
}
