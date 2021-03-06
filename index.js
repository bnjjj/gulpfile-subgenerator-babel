'use strict';
var generators = require('yeoman-generator');
var _ = require('lodash');

var gulpfileGenerator = module.exports = generators.Base.extend({
  initializing: function () {
    this.vars = {};
  },

  prompting: function () {
    var self = this;
    var done = self.async();

    self.prompt([{
      type: 'value',
      name: 'src',
      message: 'What is the relative directory path for your js source files (babel)?',
      default: './app/**/*.js'
    }, {
      type: 'value',
      name: 'dist',
      message: 'What is the relative directory path for your js dist files (babel)??',
      default: './dist/es6'
    }], function (answers) {
      _.assign(self.vars, answers);
      done();
    });
  },

  writing: function () {
    var self = this;
    self.template(self.templatePath(), self.destinationPath('./gulp-scripts'), self.vars);
  },

  install: function () {
    var self = this;

    self.installDependencies();
    self.npmInstall(['gulp-babel'], { 'saveDev': true });
  },

  end: function () {

  }
});
