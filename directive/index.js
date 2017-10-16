'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var path = require('path');
var cgUtils = require('../utils.js');
var _ = require('underscore');

_.str = require('underscore.string');
_.mixin(_.str.exports());

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

    var filename = _.trim(_.dasherize(this.name), '-');

    if (this.needpartial) {
        this.template('directive.js', 'directive/' + filename + '/' + filename + '.js');
        this.template('directive.html', 'directive/' + filename + '/' + filename + '.html');
        this.template('directive.less', 'directive/' + filename + '/' + filename + '.less');
        this.template('spec.js', 'test/unit/directive/' + filename + '.js');

        cgUtils.addToFile('index.html', '<script src="directive/' + filename + '/' + filename + '.js"></script>', cgUtils.DIRECTIVE_JS_MARKER, '  ');
        cgUtils.addToFile('test/unit/index.html', '<script src="../../directive/' + filename + '/' + filename + '.js"></script>', cgUtils.DIRECTIVE_JS_MARKER, '  ');
        cgUtils.addToFile('test/unit/index.html', '<script src="directive/' + filename + '.js"></script>', cgUtils.DIRECTIVE_JS_TEST_MARKER, '  ');
        this.log.writeln(' updating'.green + ' %s', 'index.html');

        cgUtils.addToFile('css/app.less', '@import "../directive/' + filename + '/' + filename + '.less";', cgUtils.DIRECTIVE_LESS_MARKER, '');
        this.log.writeln(' updating'.green + ' %s', 'app/app.less');
    } else {
        this.template('directive_simple.js', 'directive/' + filename + '.js');
        this.template('spec_simple.js', 'test/unit/directive/' + filename + '.js');

        cgUtils.addToFile('index.html', '<script src="directive/' + filename + '.js"></script>', cgUtils.DIRECTIVE_JS_MARKER, '    ');
        cgUtils.addToFile('test/unit/index.html', '<script src="../../directive/' + filename + '.js"></script>', cgUtils.DIRECTIVE_JS_MARKER, '    ');
        cgUtils.addToFile('test/unit/index.html', '<script src="directive/' + filename + '.js"></script>', cgUtils.DIRECTIVE_JS_TEST_MARKER, '    ');
        this.log.writeln(' updating'.green + ' %s', 'index.html');
    }

};
