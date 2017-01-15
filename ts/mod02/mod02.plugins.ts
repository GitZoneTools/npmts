export * from '../npmts.plugins'

import * as gulp from 'gulp'
import * as gulpFunction from 'gulp-function'
import * as gulpIstanbul from 'gulp-istanbul'
let gulpInjectModules = require('gulp-inject-modules')
import * as gulpMocha from 'gulp-mocha'
import * as gulpSourcemaps from 'gulp-sourcemaps'
import * as gulpTypeScript from 'gulp-typescript'

export {
    gulp,
    gulpFunction,
    gulpIstanbul,
    gulpInjectModules,
    gulpMocha,
    gulpSourcemaps,
    gulpTypeScript
}
