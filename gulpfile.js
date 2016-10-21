var del = require("del"),
    eslint = require("gulp-eslint"),
    eslintConfig = require("./.eslintrc.js"),
    gulp = require("gulp"),
    path = require("path"),
    shell = require("gulp-shell"),
    size = require("gulp-size"),
    webpack = require("webpack"),
    webpackConfig = require("./webpack.config.js"),
    webpackStream = require("webpack-stream"),
    zip = require("gulp-zip"),
    karma = require("karma").Server;

gulp.task("setEnvDevelopment", function () {

});

gulp.task("setEnvProduction", function() {
    webpackConfig.plugins = webpackConfig.plugins.concat([
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify("production")
        }),
        new webpack.optimize.UglifyJsPlugin({
            "comments": false,
            "compress": {
                "drop_console": true,
                "warnings": true
            }
        })
    ]);
});

gulp.task("clean", function () {
    del([
        path.resolve(__dirname, "build"),
        path.resolve(__dirname, "dist")
    ]);
});

gulp.task("cleanNode", function () {
    del([
        path.resolve(__dirname, "node_modules")
    ]);
});

gulp.task("copy_index", function () {
    return gulp.src(path.resolve(__dirname, "index.html"))
        .pipe(gulp.dest(webpackConfig.output.path));
});

gulp.task("copy_configuration", function () {
    return gulp.src(path.resolve(__dirname, "configuration.js"))
        .pipe(gulp.dest(webpackConfig.output.path));
});

gulp.task("karmaNoWatch", shell.task([
    "npm run karmaNoWatch"
]))

gulp.task("karmaWatch", shell.task([
    "npm run karmaWatch"
]))

gulp.task("webpackDevServer", shell.task([
    "npm run webpackDevServer"
]))

gulp.task("lint", function () {
    return gulp.src(["lib/**/*.js"])
        .pipe(eslint(eslintConfig))
        .pipe(eslint.format());
});

gulp.task("test", function (done) {
    karma.start({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, function (code) {
        if (code === 1) {
            console.log('Unit Test failures, exiting process');
            done('There are unit test failures.');
        }
    });
});

gulp.task("lintWatch", ["lint"], function () {
    gulp.watch("lib/**/*.js", ["lint"]);
});

gulp.task("crlfCorrect", function () {
    return gulp.src(["lib/**/*.js"])
        .pipe(lec({verbose:true, eolc: 'LF', encoding:'utf8'}))
        .pipe(gulp.dest("lib/"));
});

gulp.task("webpack", ["clean", "copy_index", "copy_configuration"], function() {
    return gulp.src(webpackConfig.index)
        .pipe(webpackStream(webpackConfig))
        .pipe(gulp.dest(webpackConfig.output.path));
});

gulp.task("zip", ["webpack"], function () {
    return gulp.src(webpackConfig.output.path + "/**/*")
        .pipe(size({"showFiles": true}))
        .pipe(zip("survey.zip"))
        .pipe(size({"showFiles": true}))
        .pipe(gulp.dest(path.resolve(__dirname, "dist")));
});

gulp.task("development", ["setEnvDevelopment", "zip"]);
gulp.task("production", ["setEnvProduction", "zip"]);
gulp.task("start", ["setEnvDevelopment", "webpackDevServer"]);

gulp.task("default", ["start"]);
