'use strict';

var util = require('util'),
  yeoman = require('yeoman-generator'),
  path = require('path'),
  cgUtils = require('../utils.js');

var ServiceGenerator = module.exports = function ServiceGenerator(/*args, options, config*/) {

  yeoman.generators.NamedBase.apply(this, arguments);

  try {
    this.appname = require(path.join(process.cwd(), 'package.json')).name;
  } catch (e) {
    this.appname = 'Cant find name from package.json';
  }

};

util.inherits(ServiceGenerator, yeoman.generators.NamedBase);

ServiceGenerator.prototype.files = function files() {
  this.template('service.js', 'service/' + this.name + '.js');
  this.template('spec.js', 'test/unit/service/' + this.name + '.js');

  cgUtils.addToFile('index.html', '<script src="service/' + this.name + '.js"></script>', cgUtils.SERVICE_JS_MARKER, '  ');
  cgUtils.addToFile('test/unit/index.html', '<script src="../../service/' + this.name + '.js"></script>', cgUtils.SERVICE_JS_MARKER, '  ');
  cgUtils.addToFile('test/unit/index.html', '<script src="service/' + this.name + '.js"></script>', cgUtils.SERVICE_JS_TEST_MARKER, '  ');
  this.log.writeln(' updating'.green + ' %s', 'index.html');
};
