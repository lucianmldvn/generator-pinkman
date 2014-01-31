'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var path = require('path');
var cgUtils = require('../utils.js');
var _ = require('underscore');

_.str = require('underscore.string');
_.mixin(_.str.exports());

var ModelGenerator = module.exports = function ModelGenerator(args, options, config) {

  yeoman.generators.NamedBase.apply(this, arguments);

  try {
    this.appname = require(path.join(process.cwd(), 'package.json')).name;
  } catch (e) {
    this.appname = 'Cant find name from package.json';
  }

};

util.inherits(ModelGenerator, yeoman.generators.NamedBase);

ModelGenerator.prototype.files = function files() {
  this.name = _.capitalize(this.name);
  this.template('model.js', 'model/'+this.name+'.js');
  this.template('spec.js', 'test/unit/model/'+this.name+'.js');

  cgUtils.addToFile('index.html','<script src="model/'+this.name+'.js"></script>',cgUtils.MODEL_JS_MARKER,'  ');
  cgUtils.addToFile('test/unit/index.html','<script src="../../model/'+this.name+'.js"></script>',cgUtils.MODEL_JS_MARKER,'  ');
  cgUtils.addToFile('test/unit/index.html','<script src="model/'+this.name+'.js"></script>',cgUtils.MODEL_JS_TEST_MARKER,'  ');
  this.log.writeln(' updating'.green + ' %s','index.html');
};
