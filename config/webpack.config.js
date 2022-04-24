'use strict';

const { merge } = require('webpack-merge');

const common = require('./webpack.common.js');
const PATHS = require('./paths');

// Merge webpack configuration files
const config = (env, argv) =>
  merge(common, {
    entry: {
      background: PATHS.src + '/background.ts',
      contentScript: PATHS.src + '/contentScript.ts',
      injectedScript: PATHS.src + '/injectedScript.ts'
    },
    devtool: argv.mode === 'production' ? false : 'source-map',
  });

module.exports = config;
