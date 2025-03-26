const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const obfuscate = require('gulp-obfuscate');
const imagemin = require('gulp-imagemin');

function imgCompressor(){
    return gulp.src('./source/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./build/images'));
}

function jsMinifier(){
    return gulp.src('./source/scripts/*.js')
        .pipe(uglify())
        .pipe(obfuscate())
        .pipe(gulp.dest('./build/scripts'))
}

function sassCompilator(){
    return gulp.src('./source/styles/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            style: 'compressed'
        }))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./build/styles'));
}


exports.default =  function(){
    gulp.watch('./source/styles/*.scss', {ignoreInitial: false}, gulp.series(sassCompilator));
    gulp.watch('./source/scripts/*.js', {ignoreInitial: false}, gulp.series(jsMinifier));
    gulp.watch('./source/images/*', {ignoreInitial: false}, gulp.series(imgCompressor));
}
