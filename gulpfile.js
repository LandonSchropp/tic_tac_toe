'use strict';

const FileCache = require("gulp-file-cache");
const connect = require('gulp-connect');
const del = require('del');
const gulp = require('gulp');
const gutil = require('gulp-util')
const rollup = require('rollup-stream');
const runSequence = require('run-sequence');
const sass = require('gulp-sass');
const sassGlob = require('gulp-sass-glob');
const source = require('vinyl-source-stream');
const transform = require('gulp-transform');
const watch = require('gulp-watch');

const fetchColors = require('./source/javascripts/lib/fetch_colors');
const rollupConfig = require('./rollup.config');

function handleError(error) {
  gutil.log(gutil.colors.red(error.stack));
  this.emit('end');
}

gulp.task('clean', () => {
  return del(["build", "temp"]);
});

gulp.task('colors', () => {
  let fileCache = new FileCache("temp/color_file_cache");

  return gulp
    .src("source/config/colors.json")
    .pipe(fileCache.filter())
    .pipe(transform(colors => {
      return fetchColors(JSON.parse(colors))
        .then(colors => JSON.stringify(colors, null, 2));
    }))
    .pipe(fileCache.cache())
    .pipe(gulp.dest("temp"));
});

gulp.task('html', () => {
  return gulp
    .src("source/**/*.html")
    .pipe(gulp.dest("build"))
    .pipe(connect.reload());
});

gulp.task('sounds', () => {
  return gulp
    .src('source/sounds/**')
    .pipe(gulp.dest('build/sounds'))
    .pipe(connect.reload());
});

gulp.task('images', () => {
  return gulp
    .src('source/images/**')
    .pipe(gulp.dest('build/images'))
    .pipe(connect.reload());
});

gulp.task('stylesheets', () => {
  return gulp
    .src('source/stylesheets/index.sass')
    .pipe(sassGlob())
    .pipe(sass())
    .pipe(gulp.dest('build/stylesheets'))
    .pipe(connect.reload());
});

gulp.task('javascripts', [ "colors" ], () => {
  return rollup(rollupConfig)
    .on('error', handleError)
    .pipe(source('index.js'))
    .pipe(gulp.dest('build/javascripts'))
    .pipe(connect.reload());
});

gulp.task('build', (callback) => {
  runSequence('clean', 'html', 'sounds', 'images', 'stylesheets', 'javascripts', callback);
});

gulp.task('watch', ["build"], () => {

  // Create a callback that runs a task.
  function run(task) {
    return () => runSequence(task);
  }

  // Kick off the watchers
  watch("source/config/colors.json", run('javascripts'));
  watch("source/sounds/**", run('sounds'));
  watch("source/images/**", run('images'));
  watch("source/**/*.html", run('html'));
  watch("source/javascripts/**", run('javascripts'));
  watch("source/stylesheets/**", run('stylesheets'));

  // Start the server
  connect.server({ root: "build", livereload: true });
});

