'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var path = require('path');
var cgUtils = require('../utils.js');
var _ = require('underscore');

_.str = require('underscore.string');
_.mixin(_.str.exports());

var PartialGenerator = module.exports = function PartialGenerator(args, options, config) {

    this.log.writeln(args);
    yeoman.generators.NamedBase.apply(this, arguments);

    try {
        this.appname = require(path.join(process.cwd(), 'package.json')).name;
    } catch (e) {
        this.appname = 'Cant find name from package.json';
    }

};

util.inherits(PartialGenerator, yeoman.generators.NamedBase);

PartialGenerator.prototype.askFor = function askFor() {
    var cb = this.async();

    var prompts = [
        {
            name: 'route',
            message: 'Enter your route url (i.e. /mypartial/:id).  If you don\'t want a route added for you, leave this empty.'
    }
  ];

    this.prompt(prompts, function (props) {
        this.routeName = props.routeName;
        this.route = props.route;

        cb();
    }.bind(this));
};

PartialGenerator.prototype.files = function files() {

    this.ctrlname = _.capitalize(_.camelize(this.name.replace(/\//g, '-'))) + 'Ctrl';
    this.asCtrlname = _.camelize(this.name.replace(/\//g, '-')) + 'Ctrl';
    var filename = _.trim(_.dasherize(this.name), '-');
    var directoryName = _.trim(_.dasherize(this.name), '-');

    this.template('partial.js', 'partial/' + directoryName + '/' + filename + '.js');
    this.template('partial.html', 'partial/' + directoryName + '/' + filename + '.html');
    this.template('partial.less', 'partial/' + directoryName + '/' + filename + '.less');
    this.template('spec.js', 'test/unit/controller/' + directoryName + '.js');

    cgUtils.addToFile('index.html', '<script src="partial/' + directoryName + '/' + filename + '.js"></script>', cgUtils.PARTIAL_JS_MARKER, '  ');

    cgUtils.addToFile('test/unit/index.html', '<script src="../../partial/' + directoryName + '/' + filename + '.js"></script>', cgUtils.PARTIAL_JS_MARKER, '  ');
    cgUtils.addToFile('test/unit/index.html', '<script src="controller/' + directoryName + '.js"></script>', cgUtils.PARTIAL_JS_TEST_MARKER, '  ');

    this.log.writeln(' updating'.green + ' %s', 'index.html');

    cgUtils.addToFile('css/app.less', '@import "../partial/' + directoryName + '/' + filename + '.less";', cgUtils.PARTIAL_LESS_MARKER, '');
    this.log.writeln(' updating'.green + ' %s', 'app/app.less');

    if (this.route && this.route.length > 0) {
        var js = [
      "$stateProvider.state('" + filename + "', {",
      "    url: '" + this.route + "',",
      "    templateUrl: 'partial/" + directoryName + "/" + filename + ".html'",
      "  });"
    ];
        cgUtils.addToFile('js/setup.js', js.join('\r'), cgUtils.ROUTE_MARKER, '\t');
        this.log.writeln(' updating'.green + ' %s', 'js/setup.js');
    }

    /*
      .state('state1', {
        url: "/state1",
        templateUrl: "partials/state1.html"
      })
      .state('state1.list', {
        url: "/list",
        templateUrl: "partials/state1/list.html"
      })
      .state('state2', {
        url: "/state2",
        templateUrl: "partials/state2.html"
      })
     */

};
