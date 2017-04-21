"use strict";

const babel = require('rollup-plugin-babel');
const commonjs = require('rollup-plugin-commonjs');
const resolve = require('rollup-plugin-node-resolve');

module.exports = {
  entry: 'source/javascripts/index.js',
  format: 'iife',
  plugins: [
    babel({ exclude: 'node_modules/**' }),
    resolve(),
    commonjs({
      include: 'node_modules/**'
    })
  ]
};
