export * from '../npmts.plugins';
import * as gulp from 'gulp';
import * as gulpBabel from 'gulp-babel';
import * as gulpIstanbul from 'gulp-istanbul';
import * as gulpFunction from 'gulp-function';
declare let gulpInjectModules: any;
import * as gulpMocha from 'gulp-mocha';
import * as gulpSourcemaps from 'gulp-sourcemaps';
export { gulp, gulpBabel, gulpIstanbul, gulpFunction, gulpInjectModules, gulpMocha, gulpSourcemaps };
