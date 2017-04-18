"use strict";

const commonjs = require('rollup-plugin-commonjs');
const resolve = require('rollup-plugin-node-resolve');

module.exports = {
  entry: 'source/javascripts/index.js',
  format: 'iife',
  plugins: [
    resolve(),
    commonjs({
      include: 'node_modules/**'
    })
  ]
};
