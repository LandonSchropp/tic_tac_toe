'use strict';

const del = require('del');
const gulp = require('gulp');
const rollup = require('rollup-stream');
const runSequence = require('run-sequence');
const sass = require('gulp-sass');
const sassGlob = require('gulp-sass-glob');
const source = require('vinyl-source-stream');

const rollupConfig = require('./rollup.config');

gulp.task('clean', () => {
  return del(["build"]);
});

gulp.task('copy', () => {
  return gulp.src("source/**/*.html").pipe(gulp.dest("build"));
});

gulp.task('build', (callback) => {
  runSequence('clean', 'copy', callback);
});

gulp.task('stylesheets', function () {
  return gulp
    .src('source/stylesheets/index.sass')
    .pipe(sassGlob())
    .pipe(sass())
    .pipe(gulp.dest('build/stylesheets'));
});

gulp.task('javascripts', () => {
  return rollup(rollupConfig)
    .pipe(source('index.js'))
    .pipe(gulp.dest('build/javascripts'));
});
