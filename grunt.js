module.exports = function(grunt) {
  "use strict";
  // Project configuration.
  grunt.initConfig({
    qunit: {
      all: ['test/**/*.html']
    },
    lint: {
      all: [
        '*.js'
      ]
    },
    watch: {
      scripts: {
        files: '<config:lint.all>',
        tasks: 'lint qunit'
      }
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        node: true,
        es5: true,
        strict: true,
        browser: true
      },
      globals: {}
    },
    min: {
      'build/viddybg.min.js': ['src/**/*.js']
    }
  });

  // Default task.
  grunt.registerTask('default', 'lint qunit min');

};