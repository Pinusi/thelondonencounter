module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Project configuration.
  grunt.initConfig({

    //JSON Configs
    gruntConfig: grunt.file.readJSON('gruntConfig.json'),
    pkg: grunt.file.readJSON('package.json'),

    //Cartelle
    cartelle: {
      development: 'IN',
      distribution: 'OUT',
      temporary: '.tmp',
      test: 'TESTS'
    },

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      js: {
          files: ['<%= cartelle.development %>/scripts/{,*/}*.js',
                  'gruntConfig.json'],
          tasks: ['jshint','concat']
      },
      gruntfile: {
          files: ['Gruntfile.js'],
          tasks: ['build-test']
      },
      sass: {
          files: ['<%= cartelle.development %>/styles/{,*/}*.{scss,sass}'],
          tasks: ['sass', 'cssmin']
      },
      styles: {
          files: ['gruntConfig.json',
                  '<%= cartelle.development %>/styles/{,*/}*.css'],
          tasks: ['cssmin']
      },
      other:{
        files: ['<%= cartelle.development %>imgs/{,*/}*.{ico,png,jpg}',
                '<%= cartelle.development %>/{,*/}*.html',
                '<%= cartelle.development %>styles/fonts/{,*/}*.*'],
        tasks: ['copy']
      },
      livereload: {
          options: {
              livereload: '<%= connect.options.livereload %>'
          },
          files: [
              '<%= cartelle.distribution %>/{,*/}*.html',
              '<%= cartelle.distribution %>/styles/{,*/}*.css',
              '<%= cartelle.distribution %>/scripts/{,*/}*.js',
              '<%= cartelle.distribution %>/images/{,*/}*.{jpeg,jpg,png}'
          ]
      }
    },

    // The actual grunt server settings
    connect: {
      options: {
          port: 5000,
          livereload: 35729,
          // Change this to '0.0.0.0' to access the server from outside
          hostname: 'localhost'
      },
      livereload: {
          options: {
              open: true,
              base: [
                  '<%= cartelle.distribution %>'
              ]
          }
      }
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
       options: {
          curly: true,
          eqeqeq: true,
          eqnull: true,
          browser: true,
          globals: {
            jQuery: true
          },
        },
        all: [
            'Gruntfile.js',
            '<%= cartelle.development %>/scripts/{,*/}*.js'
        ]
    },

    // Run some tasks in parallel to speed up build process
    concurrent: {
      dist: [
          'imagemin',
          'svgmin',
          'sass'
      ]
    },

    // Copies remaining files to places other tasks can use
    copy: {
        dist: {
            files: [{
                expand: true,
                dot: true,
                cwd: '<%= cartelle.development %>',
                dest: '<%= cartelle.distribution %>',
                src: [
                    '{,*/}*.html',
                    'styles/fonts/{,*/}*.*'
                ]
            }]
        }
    },

    // 'ftp-deploy': {
    //     build: {
    //       auth: {
    //         host: '23.229.173.40',
    //         port: 21,
    //         authKey: 'key1'
    //       },
    //       src: '<%= cartelle.distribution %>',
    //       dest: 'public_html/test'
    //     }
    // },

    concat: {
      options: {
        separator: ';',
      },
      main_scripts: {
        src: ['<%= gruntConfig.scripts.main %>'],
        dest: '<%= cartelle.distribution %>/scripts/scripts.min.js',
      },
      third_parties_scripts:{
        src: '<%= gruntConfig.scripts.3rd_parties %>',
        dest: '<%= cartelle.distribution %>/scripts/3rd_parties.min.js'
      }
    },

    cssmin: {
      main_css: {
          files: {
              '<%= cartelle.distribution %>/styles/main.css': [
                  '.tmp/styles/{,*/}*.css',
                  '<%= cartelle.development %>/styles/{,*/}*.css'
              ]
          }
      },
      third_parties_css: {
          files: {
              '<%= cartelle.distribution %>/styles/3rd_parties.css': ['<%= gruntConfig.css.3rd_parties %>']
          }
      }
    },

    imagemin: {
        dist: {
            files: [{
                expand: true,
                cwd: '<%= cartelle.development %>/imgs',
                src: '{,*/}*.{gif,jpeg,jpg,png}',
                dest: '<%= cartelle.distribution %>/imgs'
            }]
        }
    },

    //Jasmine
    jasmine: {
      test: {
        src: '<%= cartelle.development %>/scripts/{,*/,**/}*.js',
        options: {
          specs: '<%= cartelle.test %>/*Spec.js',
          helpers: '<%= cartelle.test %>/*Helper.js',
          vendor: '<%= gruntConfig.3rd_parties %>'
        }
      }
    },

    sass: {                              // Task
      dist: {                            // Target
        options: {                       // Target options
          style: 'expanded'
        },
        files: {                         // Dictionary of files
          '<%= cartelle.temporary %>/styles/style.css': '<%= cartelle.development %>/styles/style.scss'
        }
      }
    },

    svgmin: {
        dist: {
            files: [{
                expand: true,
                cwd: '<%= cartelle.development %>/imgs',
                src: '{,*/}*.svg',
                dest: '<%= cartelle.distribution %>/imgs'
            }]
        }
    },

    uglify: {
      main: {
        src: '<%= cartelle.development %>/scripts/{,*/,**/}*.js',
        dest: '<%= cartelle.distribution %>/scripts/scripts.min.js'
      },
      // bower: {
      //   src: '<%= cartelle.temporary %>/scripts/bower.js',
      //   dest: '<%= cartelle.distribution %>/scripts/bower.min.js'
      // },
      third_parties: {
        src: '<%= gruntConfig.3rd_parties %>',
        dest: '<%= cartelle.distribution %>/scripts/3rd_parties.min.js'
      }
    },

    // Empties folders to start fresh
    clean: [
            '.tmp',
            '<%= cartelle.distribution %>/*',
            '!<%= cartelle.distribution %>/.git*'
            ]
  });
  
  grunt.registerTask('build-prod', [
        'clean',
        'jshint',
        'concurrent',
        'uglify',
        'cssmin',
        'copy'
    ]);

  grunt.registerTask('build-test', [
        'clean',
        'jshint',
        'concurrent',
        'concat',
        'cssmin',
        'copy'
    ]);

  // Default task(s).
  grunt.registerTask('default', [
    'build-prod',
    'connect:livereload',
    'watch'
    ]);

  // grunt.registerTask('ftp-test', [
  //   'build',
  //   'ftp-deploy'
  //   ]);

  // grunt.registerTask('ftp-prod', [
  //   'build',
  //   'ftp:production'
  //   ]);

  grunt.registerTask('test', [
    // 'jasmine',
    'build-test',
    'connect:livereload',
    'watch'
    ]);
};