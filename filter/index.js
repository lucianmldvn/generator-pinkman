'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var path = require('path');
var cgUtils = require('../utils.js');
var _ = require('underscore');

_.str = require('underscore.string');
_.mixin(_.str.exports());

var FilterGenerator = module.exports = function FilterGenerator(args, options, config) {

    yeoman.generators.NamedBase.apply(this, arguments);

    try {
        this.appname = require(path.join(process.cwd(), 'package.json')).name;
    } catch (e) {
        this.appname = 'Cant find name from package.json';
    }

};

util.inherits(FilterGenerator, yeoman.generators.NamedBase);

FilterGenerator.prototype.files = function files() {
    this.template('filter.js', 'filter/' + _.trim(_.dasherize(this.name), '-') + '.js');
    this.template('spec.js', 'test/unit/filter/' + _.trim(_.dasherize(this.name), '-') + '.js');

    cgUtils.addToFile('index.html', '<script src="filter/' + _.trim(_.dasherize(this.name), '-') + '.js"></script>', cgUtils.FILTER_JS_MARKER, '  ');
    cgUtils.addToFile('test/unit/index.html', '<script src="../../filter/' + _.trim(_.dasherize(this.name), '-') + '.js"></script>', cgUtils.FILTER_JS_MARKER, '  ');
    cgUtils.addToFile('test/unit/index.html', '<script src="filter/' + _.trim(_.dasherize(this.name), '-') + '.js"></script>', cgUtils.FILTER_JS_TEST_MARKER, '  ');
    this.log.writeln(' updating'.green + ' %s', 'index.html');
};
