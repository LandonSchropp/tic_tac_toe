'use strict';

const gulp = require('gulp');
const del = require('del');

gulp.task('clean', (callback) => {
  del(["build"]).then(callback);
});

