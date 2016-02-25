// import gulp
var plugins = {
    beautylog: require("beautylog"),
    gulp: require("gulp"),
    g:{
        typescript: require("gulp-typescript"),
        typings:require("gulp-typings")
    },
    mergeStream: require("merge2"),
    path: require("path")
};

paths = {
    packageBase: plugins.path.resolve(
        plugins.path.join(__dirname,"../")
    )
};

plugins.beautylog.log('now compiling NPMTS');

plugins.gulp.task("typings",function(){
    var stream = plugins.gulp.src(plugins.path.join(paths.packageBase,"ts/typings.json"))
        .pipe(plugins.g.typings());
    return stream;
});

plugins.gulp.task("TS",["typings"], function() {
    var stream = plugins.gulp.src([
            plugins.path.join(paths.packageBase,'ts/**/*.ts'),
            "!" + plugins.path.join(paths.packageBase,'ts/typings/**/*.d.ts')
        ])
        .pipe(plugins.g.typescript({
            target:"ES5",
            module:"commonjs"
        }))
        .pipe(plugins.gulp.dest(plugins.path.join(paths.packageBase, 'dist/')));
    return stream;
});

plugins.gulp.task("CLI",function(){
    var stream = plugins.gulp.src(plugins.path.join(paths.packageBase,"assets/cli.js"))
        .pipe(plugins.gulp.dest(plugins.path.join(paths.packageBase, 'dist/')))
});

plugins.gulp.task('default',['TS',"CLI"], function() {
	plugins.beautylog.success('Typescript compiled');
});

plugins.gulp.start.apply(plugins.gulp, ['default']);