'use strict';

const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync').create();
const gulp = require('gulp');
const { src, dest } = require('gulp');
const sass = require('gulp-sass');
const minifyCSS = require('gulp-csso');

function css() {
    return src('sass/**/*.scss') // 1.Location of source filest
        .pipe(sass()) // 2.Compile the SCSS to CSS
        .pipe(minifyCSS()) // .3 Minfiy the CSS
        .pipe(dest('css')) // 4. Write the CSS file to css/
        .pipe(browserSync.stream()) // 5. Inject CSS into browser
}

exports.css = css;

function watchFiles() {
    gulp.watch('sass/**/*.scss', css);
}

exports.watch = watchFiles;

function sync() {
    browserSync.init({
        server: {
            baseDir: './',
        }
    });
    gulp.watch('./sass/**/*.scss', css);
    gulp.watch('./*.html').on('change', browserSync.reload)
}

function imageim() {
    gulp.src('src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'))
}

exports.minimg = imageim;
exports.default = sync;
