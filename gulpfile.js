'use strict';

const gulp = require('gulp');
const del = require('del');

gulp.task('clean', () => {
  return del(["build"]);
});

gulp.task('copy', () => {
  return gulp.src("source/**/*.html").pipe(gulp.dest("build"));
});
