// import gulp
var gulp = require("gulp");
var gulpTypescript = require("gulp-typescript");
var gulpInsert = require("gulp-insert");
var plugins = {
	beautylog: require("beautylog")
};

plugins.beautylog.log('now compiling the mojo.io gulp tasks');

gulp.task('indexTS', function() {
	var stream = gulp.src('../ts/index.ts')
	  	.pipe(gulpTypescript({
			out: "index.js"
		}))
		.pipe(gulpInsert.prepend('#!/usr/bin/env node\n\n'))
	  	.pipe(gulp.dest("../"));
	return stream;
});

gulp.task('default',['indexTS'], function() {
	plugins.beautylog.success('Typescript compiled');
});

gulp.start.apply(gulp, ['default']);