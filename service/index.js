'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var path = require('path');
var cgUtils = require('../utils.js');

var ServiceGenerator = module.exports = function ServiceGenerator() {

  yeoman.generators.NamedBase.apply(this, arguments);

  try {
    this.appname = require(path.join(process.cwd(), 'package.json')).name;
  } catch (e) {
    this.appname = 'Cant find name from package.json';
  }

};

util.inherits(ServiceGenerator, yeoman.generators.NamedBase);

ServiceGenerator.prototype.files = function files() {
  var name = this.name;

  this.template('service.js', 'service/' + name + '.js');
  this.template('spec.js', 'test/unit/service/' + name + '.js');

  var fileEnd = name + '.js"></script>';
  var filePath = '<script src="service/' + fileEnd;
  var testFilePath = '<script src="../../service/' + fileEnd;
  var testPath = '<script src="service/' + fileEnd;

  cgUtils.addToFile('index.html',
                    filePath,
                    cgUtils.SERVICE_JS_MARKER,
                    '  ');
  cgUtils.addToFile('test/unit/index.html',
                    testFilePath,
                    cgUtils.SERVICE_JS_MARKER,
                    '  ');
  cgUtils.addToFile('test/unit/index.html',
                    testPath,
                    cgUtils.SERVICE_JS_TEST_MARKER,
                    '  ');
  this.log.writeln(' updating'.green + ' %s', 'index.html');
};
