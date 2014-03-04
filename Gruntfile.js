
module.exports = function (grunt) {
  grunt.initConfig({
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      files: ['Gruntfile.js', './**/*.js', '!./node_modules/**/*.js', '!./**/templates/**/*.js']
    },
    mochaTest: {
      options: {
        reporter: 'Spec'
      },
      unit: {
        src: ['test/unit/**/*.js']
      }
    },
    watch: {
      test: {
        files: ['Gruntfile.js', './**/*.js', '!./node_modules/**/*.js', '!./**/templates/**/*.js'],
        tasks: ['test']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('test', ['jshint', 'mochaTest']);
  grunt.registerTask('default', ['test', 'watch']);
};