const gulp = require('gulp');
const path = require('path');
const webpack = require('webpack-stream');
const gls = require("gulp-live-server");
const uglify = require('gulp-uglify');
const plumber = require('gulp-plumber');

const build = require('./build.js');

const paths = {
    main_js: "src/index.js",
    css: ["src/**/*.*css"],
    js : [ "src/**/*.js*" ]
};

gulp.task('js', async function () {
    const BuildJS  = await new Promise((resolve, reject) => {
        gulp.src(path.resolve(__dirname, paths.main_js))
        .pipe(plumber())
        .pipe(webpack(require('./webpack.config.js')))
        .pipe(uglify())
        .pipe(gulp.dest('static/js/')).on("end", resolve);
    });
    build()
    return BuildJS
});

gulp.task("dev", gulp.series("js", function () {
    // Generic watch tasks for SASS and Browserify
    gulp.watch(paths.js, gulp.series("js"));
    // Start the app server. change port dynamically
    const server = gls("server/server.js", {
        stdio: "inherit"
    });
    server.start();
    // Reload server when backend files change.
    gulp.watch(["server/**/*.js"], function () {
        server.start.bind(server)();
    });
    // Notify server when frontend files change.
    gulp.watch(["static/**/*.js"], function (file) {
        
        server.notify(file);
    });
}));