const gulp = require('gulp');
const fs = require('fs');
const path = require('path');
const webpack = require('webpack-stream');
const gls = require("gulp-live-server");
const uglify = require('gulp-uglify');
const uglifjs = require('uglify-js');
const plumber = require('gulp-plumber');

const through = require('through2');

const build = require('./build.js');

const paths = {
    main_js: "src/index.js",
    css: ["src/**/*.*css"],
    js: ["src/**/*.js*","!src/index2.js"]
};

gulp.task('js', async function () {
    const BuildJS = await new Promise((resolve, reject) => {
        gulp.src(path.resolve(__dirname, paths.main_js))
            .pipe(plumber())
            .pipe(through.obj(function (file, enc, cb) {
                if (file.isBuffer()) {
                    const regex = /\[mista-script-([^\]]+)/gm;
                    const match = [...file.contents.toString().matchAll(regex)];
                    if(match.length > 0) {
                        for(let i = 0; i < match.length; i++) {
                            match[i] = match[i][1];
                            // get content of the file
                            let text = "";
                            if(fs.existsSync(`src/Libs/${match[i]}.js`)) {
                                try {
                                    text = fs.readFileSync(path.resolve(__dirname, `src/Libs/${match[i]}.js`), 'utf8');
                                    // babel and uglify
                                    const code = uglifjs.minify(text,{
                                        mangle: {
                                            toplevel: true,
                                        },
                                        nameCache: {}
                                    });
                                    file.contents = Buffer.from(file.contents.toString().replace(`[mista-script-${match[i]}]`, code.code));
                                }   catch (err) {
                                    console.error(err)
                                }
                            }
                        }
                    }
                }
                fs.writeFile(path.resolve(__dirname, `src/index2.js`), file.contents.toString(), function (err) {
                    if (err) throw err;
                    console.log('Saved!');
                });
                cb(null, file);

            }))
            .pipe(webpack(require('./webpack.config.js')))
            .pipe(through.obj(function (file, enc, cb) {
                // rm index2.js
                // fs.unlink(path.resolve(__dirname, `src/index2.js`), function (err) {
                //     if (err) throw err;
                //     console.log('File deleted!');
                // });
                cb(null, file);
            }))
            // .pipe(uglify())
            .pipe(gulp.dest('static/js/')).on("end", resolve)
            .pipe(through.obj(function (file, enc, cb) {
                build();
                cb(null, file);
            }));
    });
    // build()
    return BuildJS
});

gulp.task("dev", gulp.series("js", function () {
    // Generic watch tasks for SASS and Browserify
    // watch all js different from index2.js

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