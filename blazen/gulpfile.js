const gulp = require('gulp');

gulp.task('bundle1', () => {
    return (new require('browserify')({
        entries: 'public/javascripts/form.jsx',
        debug: true
    })).transform(require("babelify"), {presets: ["env", "react"]}).bundle()
        .pipe(require('vinyl-source-stream')('form.js'))
        .pipe(gulp.dest('./.tmp'));
});

gulp.task('bundle2', () => {
    return (new require('browserify')({
        entries: 'public/javascripts/login.jsx',
        debug: true
    })).transform(require("babelify"), {presets: ["env", "react"]}).bundle()
        .pipe(require('vinyl-source-stream')('login.js'))
        .pipe(gulp.dest('./.tmp'));
});

gulp.task('bundle3', () => {
    return (new require('browserify')({
        entries: 'public/javascripts/drive.jsx',
        debug: true
    })).transform(require("babelify"),
        {
            plugins: ["transform-class-properties", "transform-runtime"],
            presets: ["env", "react"]
        }).bundle()
        .pipe(require('vinyl-source-stream')('drive.js'))
        .pipe(gulp.dest('./.tmp'));
});

gulp.task('serve', ['bundle1', 'bundle2', 'bundle3'], () => {
    (new require('gulp-live-server')('app.js')).start();
});