/*jshint node:true*/
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');
var stew = require('broccoli-stew');
var concat = require('broccoli-concat');
var babel = require('broccoli-babel-transpiler');
var find = stew.find;
var merge = require('broccoli-merge-trees');

var moduleResolver = require('./lib/module-resolver'); // should come from the loader.js
var babelOptions = {
  modules: 'amdStrict',
  resolveModuleSource: moduleResolver
};

module.exports = function() {
  var es6 = find(__dirname + '/app/lib/', {
    include: ['**/*.js']
  });

  var amd = find(babel(es6, babelOptions), {
    destDir: 'amd'
  });

  return merge([
    find(es6, { destDir: 'es6' }),
    amd,
    concat(merge([
      stew.npm.main('loader.js'),
      amd
    ]), {
      headerFiles: ['loader.js'],
      inputFiles: ['**/*.js'],
      outputFile: 'conways.js'
    })
  ]);
};
