export * from '../npmts.plugins'

import * as gulp from 'gulp'
import * as gulpBabel from 'gulp-babel'
import * as gulpIstanbul from 'gulp-istanbul'
import * as gulpFunction from 'gulp-function'
let gulpInjectModules = require('gulp-inject-modules')
import * as gulpMocha from 'gulp-mocha'
import * as gulpSourcemaps from 'gulp-sourcemaps'

export {
    gulp,
    gulpBabel,
    gulpIstanbul,
    gulpFunction,
    gulpInjectModules,
    gulpMocha,
    gulpSourcemaps
}
