'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('bower.json'),
    meta: {
      banner: '/**\n' +
      ' * <%= pkg.description %>\n' +
      ' * @version v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
      ' * @link <%= pkg.homepage %>\n' +
      ' * @author <%= pkg.authors.join(", ") %>\n' +
      ' * @license MIT License, http://www.opensource.org/licenses/MIT\n' +
      ' */\n'
    },
    bower: {
      install: {}
    },
    concat: {
      options: {
        banner: '<%= meta.banner %>\n(function(angular, undefined) {\n\'use strict\';\n',
        footer: '})(angular);',
        process: function(src, filepath) {
          return src.replace(/(^|\n)[ \t]*('use strict'|"use strict");?\s*/g, '$1');
        }
      },
      dist: {
        files: {
          'dist/<%= pkg.name %>.js': [
            'src/module.js',
            'src/module/utils.js',
            'src/module/flot.js'
          ]
        }
      }
    },
    uglify: {
      options: {
        banner: '<%= meta.banner %>'
      },
      dist: {
        files: {
          'dist/<%= pkg.name %>.min.js': 'dist/<%= pkg.name %>.js'
        }
      }
    },
    karma: {
      options: {
        configFile: 'karma.conf.js'
      },
      build: {
        singleRun: true,
        autoWatch: false
      },
      dev: {
        autoWatch: true
      }
    },
    watch: {
      changes: {
        files: ['src/{,*/}*.js'],
        tasks: ['concat:dist', 'uglify:dist']
      }
    },
    changelog: {
      options: {
        dest: 'CHANGELOG.md'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-conventional-changelog');

  // Default task
  grunt.registerTask('default', ['build']);

  // Build task
  grunt.registerTask('build', ['bower', 'karma:build', 'concat', 'uglify']);

  // Dist task
  grunt.registerTask('dist', ['karma:build', 'concat:dist', 'uglify:dist']);

  // // Test task
  grunt.registerTask('test', ['karma:build']);


};
