'use strict';

var util = require('util'),
  yeoman = require('yeoman-generator'),
  path = require('path'),
  cgUtils = require('../utils.js'),
  _ = require('underscore');

_.str = require('underscore.string');
_.mixin(_.str.exports());

var PartialGenerator = module.exports = function PartialGenerator(args/*, options, config*/) {

  this.log.writeln(args);
  yeoman.generators.NamedBase.apply(this, arguments);

  try {
    this.appname = require(path.join(process.cwd(), 'package.json')).name;
  } catch (e) {
    this.appname = 'Cant find name from package.json';
  }

};

util.inherits(PartialGenerator, yeoman.generators.NamedBase);

PartialGenerator.prototype.askFor = function () {
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

PartialGenerator.prototype.files = function () {

  this.ctrlname = _.capitalize(_.camelize(this.name)) + 'Ctrl';

  this.template('partial.js', 'partial/' + this.name + '/' + this.name + '.js');
  this.template('partial.html', 'partial/' + this.name + '/' + this.name + '.html');
  this.template('partial.less', 'partial/' + this.name + '/' + this.name + '.less');
  this.template('spec.js', 'test/unit/controller/' + this.name + '.js');

  cgUtils.addToFile('index.html', '<script src="partial/' + this.name + '/' + this.name + '.js"></script>', cgUtils.PARTIAL_JS_MARKER, '  ');

  cgUtils.addToFile('test/unit/index.html', '<script src="../../partial/' + this.name + '/' + this.name + '.js"></script>', cgUtils.PARTIAL_JS_MARKER, '  ');
  cgUtils.addToFile('test/unit/index.html', '<script src="controller/' + this.name + '.js"></script>', cgUtils.PARTIAL_JS_TEST_MARKER, '  ');
  
  this.log.writeln(' updating'.green + ' %s', 'index.html');

  cgUtils.addToFile('css/app.less', '@import "../partial/' + this.name + '/' + this.name + '.less";', cgUtils.PARTIAL_LESS_MARKER, '');
  this.log.writeln(' updating'.green + ' %s', 'app/app.less');

  if (this.route && this.route.length > 0) {
    var js = [
      '$stateProvider.state(\'' + _.slugify(this.name) + '\', {',
      '    url: \'' + this.route + '\',',
      '    templateUrl: \'partial/' + this.name + '/' + this.name + '.html\'',
      '  });'
    ];
    cgUtils.addToFile('js/setup.js', js.join('\r'), cgUtils.ROUTE_MARKER, '\t');
    this.log.writeln(' updating'.green + ' %s', 'js/setup.js');
  }
};
