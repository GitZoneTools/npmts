// import gulp
var plugins = {
    beautylog: require("beautylog"),
    gulp: require("gulp"),
    g:{
        typescript: require("gulp-typescript"),
        insert: require("gulp-insert")
    },
    mergeStream: require("merge2")

};


plugins.beautylog.log('now compiling the mojo.io gulp tasks');

plugins.gulp.task('indexTS', function() {
    var tsResult = plugins.gulp.src('../ts/index.ts')
        .pipe(plugins.g.typescript({
            out:"index.js",
            declaration:true
        }));

    return plugins.mergeStream([
        tsResult.dts.pipe(plugins.gulp.dest('../')),
        tsResult.js
            .pipe(plugins.g.insert.prepend('#!/usr/bin/env node\n\n'))
            .pipe(plugins.gulp.dest('../'))
    ]);
});

plugins.gulp.task('default',['indexTS'], function() {
	plugins.beautylog.success('Typescript compiled');
});

plugins.gulp.start.apply(plugins.gulp, ['default']);