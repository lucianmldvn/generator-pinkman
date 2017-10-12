'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var path = require('path');
var cgUtils = require('../utils.js');

var DirectiveGenerator = module.exports = function DirectiveGenerator(args, options, config) {

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
        type: 'confirm',
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

    if (this.needpartial) {
        this.template('directive.js', 'directive/' + _.trim(_.dasherize(this.name), '-') + '/' + _.trim(_.dasherize(this.name), '-') + '.js');
        this.template('directive.html', 'directive/' + _.trim(_.dasherize(this.name), '-') + '/' + _.trim(_.dasherize(this.name), '-') + '.html');
        this.template('directive.scss', 'directive/' + _.trim(_.dasherize(this.name), '-') + '/' + _.trim(_.dasherize(this.name), '-') + '.scss');
        this.template('spec.js', 'test/unit/directive/' + _.trim(_.dasherize(this.name), '-') + '.js');

        cgUtils.addToFile('index.html', '<script src="directive/' + _.trim(_.dasherize(this.name), '-') + '/' + _.trim(_.dasherize(this.name), '-') + '.js"></script>', cgUtils.DIRECTIVE_JS_MARKER, '  ');
        cgUtils.addToFile('test/unit/index.html', '<script src="../../directive/' + _.trim(_.dasherize(this.name), '-') + '/' + _.trim(_.dasherize(this.name), '-') + '.js"></script>', cgUtils.DIRECTIVE_JS_MARKER, '  ');
        cgUtils.addToFile('test/unit/index.html', '<script src="directive/' + _.trim(_.dasherize(this.name), '-') + '.js"></script>', cgUtils.DIRECTIVE_JS_TEST_MARKER, '  ');
        this.log.writeln(' updating'.green + ' %s', 'index.html');

        cgUtils.addToFile('css/app.scss', '@import "../directive/' + _.trim(_.dasherize(this.name), '-') + '/' + _.trim(_.dasherize(this.name), '-') + '.scss";', cgUtils.DIRECTIVE_SCSS_MARKER, '');
        this.log.writeln(' updating'.green + ' %s', 'app/app.scss');
    } else {
        this.template('directive_simple.js', 'directive/' + _.trim(_.dasherize(this.name), '-') + '.js');
        this.template('spec_simple.js', 'test/unit/directive/' + _.trim(_.dasherize(this.name), '-') + '.js');

        cgUtils.addToFile('index.html', '<script src="directive/' + _.trim(_.dasherize(this.name), '-') + '.js"></script>', cgUtils.DIRECTIVE_JS_MARKER, '  ');
        cgUtils.addToFile('test/unit/index.html', '<script src="../../directive/' + _.trim(_.dasherize(this.name), '-') + '.js"></script>', cgUtils.DIRECTIVE_JS_MARKER, '  ');
        cgUtils.addToFile('test/unit/index.html', '<script src="directive/' + _.trim(_.dasherize(this.name), '-') + '.js"></script>', cgUtils.DIRECTIVE_JS_TEST_MARKER, '  ');
        this.log.writeln(' updating'.green + ' %s', 'index.html');
    }

};
