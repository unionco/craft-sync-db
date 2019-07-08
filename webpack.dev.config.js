/*eslint-disable*/

const base = require('./webpack.base.config');

base.mode = 'development';
base.devtool = 'inline-source-map';

module.exports = base;