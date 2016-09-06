import 'typings-global'
export import beautylog = require('beautylog')
export let depcheck = require('depcheck')
export import gulp = require('gulp')
export let g = {
    babel: require('gulp-babel'),
    istanbul: require('gulp-istanbul'),
    gFunction: require('gulp-function'),
    injectModules: require('gulp-inject-modules'),
    mocha: require('gulp-mocha'),
    sourcemaps: require('gulp-sourcemaps'),
    typedoc: require('gulp-typedoc')
};
export import lodashObject = require('lodash')
export import npmextra = require('npmextra')
export import projectinfo = require('projectinfo')
export import path = require('path')
export import Q = require('q')
export import shelljs = require('shelljs')
export import smartcli = require('smartcli')
export import smartcov = require('smartcov')
export import smartenv = require('smartenv')
export import smartfile = require('smartfile')
export import smartpath = require('smartpath')
export import smartstring = require('smartstring')
export let sourceMapSupport = require('source-map-support').install() // display errors correctly during testing
export import tsn = require('tsn')
