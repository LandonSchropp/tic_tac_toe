'use strict';

const del = require('del');
const gulp = require('gulp');
const runSequence = require('run-sequence');

gulp.task('clean', () => {
  return del(["build"]);
});

gulp.task('copy', () => {
  return gulp.src("source/**/*.html").pipe(gulp.dest("build"));
});

gulp.task('build', (callback) => {
  runSequence('clean', 'copy', callback);
});
