'use strict';

const connect = require('gulp-connect');
const del = require('del');
const gulp = require('gulp');
const rollup = require('rollup-stream');
const runSequence = require('run-sequence');
const sass = require('gulp-sass');
const sassGlob = require('gulp-sass-glob');
const source = require('vinyl-source-stream');
const watch = require('gulp-watch');

const rollupConfig = require('./rollup.config');

gulp.task('clean', () => {
  return del(["build"]);
});

gulp.task('html', () => {
  return gulp.src("source/**/*.html").pipe(gulp.dest("build"));
});

gulp.task('build', (callback) => {
  runSequence('clean', 'html', 'stylesheets', 'javascripts', callback);
});

gulp.task('stylesheets', () => {
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

gulp.task('watch', ["build"], () => {

  // Create a callback that runs a task.
  function run(task) {
    return () => runSequence(task);
  }

  // Kick off the watchers
  watch("source/images/**", run('images'));
  watch("source/**/*.html", run('html'));
  watch("source/javascripts/**/*.js", run('javascripts'));
  watch("source/stylesheets/**/*.sass", run('stylesheets'));

  // Start the server
  connect.server({ root: "build", livereload: true });
});

