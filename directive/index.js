'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var path = require('path');
var cgUtils = require('../utils.js');

var DirectiveGenerator = module.exports = function DirectiveGenerator() {

  yeoman.generators.NamedBase.apply(this, arguments);

  try {
    this.appname = require(path.join(process.cwd(), 'package.json')).name;
  } catch (e) {
    this.appname = 'Cant find name from package.json';
  }

};

util.inherits(DirectiveGenerator, yeoman.generators.NamedBase);

DirectiveGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  var prompts = [{
    type:'confirm',
    name: 'needpartial',
    message: 'Does this directive need an external html file (i.e. partial)?',
    default: true
  }];

  this.prompt(prompts, function (props) {
    this.needpartial = props.needpartial;

    cb();
  }.bind(this));
};

DirectiveGenerator.prototype.files = function files() {
  var nameName = this.name + '/' + this.name;
  var pathEnd = '.js"></script>';

  if (this.needpartial) {
    this.template('directive.js',
                  'directive/' + nameName + '.js');
    this.template('directive.html',
                  'directive/' + nameName + '.html');
    this.template('directive.less',
                  'directive/' + nameName + '.less');
    this.template('spec.js',
                  'test/unit/directive/' + this.name + '.js');

    cgUtils.addToFile('index.html',
                      '<script src="directive/' + nameName + pathEnd,
                      cgUtils.DIRECTIVE_JS_MARKER,
                      '  ');
    cgUtils.addToFile('test/unit/index.html',
                      '<script src="../../directive/' + nameName + pathEnd,
                      cgUtils.DIRECTIVE_JS_MARKER,'  ');
    cgUtils.addToFile('test/unit/index.html',
                      '<script src="directive/' + this.name + pathEnd,
                      cgUtils.DIRECTIVE_JS_TEST_MARKER,
                      '  ');

    this.log.writeln(' updating'.green + ' %s', 'index.html');

    cgUtils.addToFile('css/app.less',
                      '@import "../directive/'+ nameName + '";',
                      cgUtils.DIRECTIVE_LESS_MARKER,
                      '');
    this.log.writeln(' updating'.green + ' %s', 'app/app.less');
  } else {
    this.template('directive_simple.js', 'directive/' + this.name + '.js');
    this.template('spec_simple.js', 'test/unit/directive/' + this.name + '.js');

    cgUtils.addToFile('index.html',
                      '<script src="directive/' + this.name + pathEnd,
                      cgUtils.DIRECTIVE_JS_MARKER,
                      '  ');
    cgUtils.addToFile('test/unit/index.html',
                      '<script src="../../directive/' + this.name + pathEnd,
                      cgUtils.DIRECTIVE_JS_MARKER,
                      '  ');
    cgUtils.addToFile('test/unit/index.html',
                      '<script src="directive/' + this.name + pathEnd,
                      cgUtils.DIRECTIVE_JS_TEST_MARKER,
                      '  ');
    this.log.writeln(' updating'.green + ' %s', 'index.html');
  }

};
