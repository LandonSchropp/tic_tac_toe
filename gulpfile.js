'use strict';

const FileCache = require("gulp-file-cache");
const connect = require('gulp-connect');
const del = require('del');
const gulp = require('gulp');
const gutil = require('gulp-util')
const mobileIcons = require('gulp-mobile-icons');
const rename = require('gulp-rename');
const rollup = require('rollup-stream');
const runSequence = require('run-sequence');
const sass = require('gulp-sass');
const sassGlob = require('gulp-sass-glob');
const source = require('vinyl-source-stream');
const svg2png = require('gulp-svg2png');
const transform = require('gulp-transform');
const watch = require('gulp-watch');

const fetchColors = require('./source/javascripts/lib/fetch_colors');
const rollupConfig = require('./rollup.config');

function handleError(error) {
  gutil.log(gutil.colors.red(error.stack));
  this.emit('end');
}

gulp.task('clean', () => {
  return del(["www", "temp", "plugins", "platforms"]);
});

// Rather than mess around with trying to get Phaser to work with Rollup, I'm simply copying the
// pre-built library to the www directory. Phaser 3 supports module imports, which should eliminate
// the need for this kind of thing.
gulp.task('vendor', () => {
  return gulp
    .src([
      'node_modules/phaser/build/phaser.js',
      'node_modules/phaser/build/phaser.map',
      'node_modules/phaser/build/pixi.js',
      'node_modules/phaser/build/pixi.map'
    ])
    .pipe(gulp.dest('www/javascripts/vendor'));
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

gulp.task('icons', function () {
  return gulp.src(`source/resources/icon.svg`)
    .pipe(mobileIcons())
    .pipe(gulp.dest('www/resources'));
});

gulp.task('splash', function () {
  return gulp.src(`source/resources/splash.svg`)
    .pipe(svg2png())
    .pipe(rename({ basename: `Default@3x~universal~anyany` }))
    .pipe(gulp.dest('www/resources'));
});

gulp.task('html', () => {
  return gulp
    .src("source/**/*.html")
    .pipe(gulp.dest("www"))
    .pipe(connect.reload());
});

gulp.task('sounds', () => {
  return gulp
    .src('source/sounds/**')
    .pipe(gulp.dest('www/sounds'))
    .pipe(connect.reload());
});

gulp.task('images', () => {
  return gulp
    .src('source/images/**')
    .pipe(gulp.dest('www/images'))
    .pipe(connect.reload());
});

gulp.task('stylesheets', () => {
  return gulp
    .src('source/stylesheets/index.sass')
    .pipe(sassGlob())
    .pipe(sass())
    .pipe(gulp.dest('www/stylesheets'))
    .pipe(connect.reload());
});

gulp.task('javascripts', [ "colors" ], () => {
  return rollup(rollupConfig)
    .on('error', handleError)
    .pipe(source('index.js'))
    .pipe(gulp.dest('www/javascripts'))
    .pipe(connect.reload());
});

gulp.task('build', (callback) => {
  runSequence(
    'icons',
    'splash',
    'html',
    'vendor',
    'sounds',
    'images',
    'stylesheets',
    'javascripts',
    callback
  );
});

gulp.task('watch', ["build"], () => {

  // Create a callback that runs a task.
  function run(task) {
    return () => runSequence(task);
  }

  // Kick off the watchers
  watch("source/config/colors.json", run('javascripts'));
  watch("source/resources/icon.svg", run('icons'));
  watch("source/resources/splash.svg", run('splash'));
  watch("source/sounds/**", run('sounds'));
  watch("source/images/**", run('images'));
  watch("source/**/*.html", run('html'));
  watch("source/javascripts/**", run('javascripts'));
  watch("source/stylesheets/**", run('stylesheets'));

  // Start the server
  connect.server({ root: "www", livereload: true, port: 4567 });
});

