'use strict';

var util = require('util');
var yeoman = require('yeoman-generator');
var path = require('path');
var cgUtils = require('../utils.js');
var _ = require('underscore');

_.str = require('underscore.string');
_.mixin(_.str.exports());

var InterceptorGenerator = module.exports = function ModelGenerator(args, options, config) {

    yeoman.generators.NamedBase.apply(this, arguments);

    try {
        this.appname = require(path.join(process.cwd(), 'package.json')).name;
    } catch (e) {
        this.appname = 'Cant find name from package.json';
    }

};

util.inherits(InterceptorGenerator, yeoman.generators.NamedBase);

InterceptorGenerator.prototype.files = function files() {
    this.name = _.classify(this.name);

    this.template('interceptor.js', 'interceptor/' + this.name + '.js');
    this.template('spec.js', 'test/unit/interceptor/' + this.name + '.js');

    cgUtils.addToFile('index.html', '<script src="interceptor/' + this.name + '.js"></script>', cgUtils.INTERCEPTOR_JS_MARKER, '    ');
    cgUtils.addToFile('test/unit/index.html', '<script src="../../interceptor/' + this.name + '.js"></script>', cgUtils.INTERCEPTOR_JS_MARKER, '    ');
    cgUtils.addToFile('test/unit/index.html', '<script src="interceptor/' + this.name + '.js"></script>', cgUtils.INTERCEPTOR_JS_TEST_MARKER, '    ');
    cgUtils.addToFile('js/setup.js', '$httpProvider.interceptors.push(\'' + this.name + '\');', cgUtils.INTERCEPTOR_MARKER, '    ');
    this.log.writeln(' updating'.green + ' %s', 'index.html');
};
