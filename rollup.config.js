"use strict";

const babel = require('rollup-plugin-babel');
const commonjs = require('rollup-plugin-commonjs');
const resolve = require('rollup-plugin-node-resolve');
const json = require('rollup-plugin-json');

module.exports = {
  entry: 'source/javascripts/index.js',
  format: 'iife',
  plugins: [
    json({ include: "temp/**" }),
    babel({ exclude: 'node_modules/**' }),
    resolve(),
    commonjs({
      include: 'node_modules/**'
    })
  ]
};
