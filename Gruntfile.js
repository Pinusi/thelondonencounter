module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

  // Project configuration.
  grunt.initConfig({

    //Cartelle
    cartelle: {
      development: 'IN',
      distribution: 'OUT',
      temporary: '.tmp'
    },

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      js: {
          files: ['<%= cartelle.development %>/scripts/{,*/}*.js'],
          tasks: ['jshint','uglify','concat'],
          options: {
              livereload: true
          }
      },
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep']
      },
      gruntfile: {
          files: ['Gruntfile.js'],
          tasks: ['build']
      },
      compass: {
          files: ['<%= cartelle.development %>/styles/{,*/}*.{scss,sass}'],
          tasks: ['compass', 'cssmin']
      },
      styles: {
          files: ['<%= cartelle.development %>/styles/{,*/}*.css'],
          tasks: ['cssmin']
      },
      other:{
        files: ['<%= cartelle.development %>{,*/}*.{ico,png,txt,jpg}',
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
              '<%= cartelle.distribution %>/images/{,*/}*.{gif,jpeg,jpg,png,svg,webp}'
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

    // wiredep: {
    //   target: {
    //     src: 'IN/index.html' // point to your HTML file.
    //   }
    // },

    bower_concat: {
      all: {
        dest: '<%= cartelle.temporary %>/scripts/bower.js',
        exclude: [
          'fastclick'
        ],
        dependencies: {
          'foundation': ['jquery']
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

    compass: {
        options: {
            sassDir: '<%= cartelle.development %>/styles',
            cssDir: '<%= cartelle.temporary %>/styles',
            generatedImagesDir: '<%= cartelle.development %>/imgs',
            imagesDir: '<%= cartelle.development %>/imgs',
            javascriptsDir: '<%= cartelle.development %>/scripts',
            fontsDir: '<%= cartelle.development %>/styles/fonts',
            importPath: '<%= cartelle.development %>/scripts',
            httpImagesPath: '/imgs',
            httpGeneratedImagesPath: '/imgs/generated',
            httpFontsPath: '/styles/fonts',
            relativeAssets: false,
            assetCacheBuster: false
        },
            server: {
                options: {
                    debugInfo: false
                }
            }
    },

    pkg: grunt.file.readJSON('package.json'),

    // Run some tasks in parallel to speed up build process
    concurrent: {
      dist: [
          'imagemin',
          'svgmin',
          'compass'
      ]
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

    // Copies remaining files to places other tasks can use
    copy: {
        dist: {
            files: [{
                expand: true,
                dot: true,
                cwd: '<%= cartelle.development %>',
                dest: '<%= cartelle.distribution %>',
                src: [
                    '*.{ico,png,txt}',
                    '{,*/}*.html',
                    'styles/fonts/{,*/}*.*',
                    'bower_components/**'
                ]
            }]
        }
    },

    uglify: {
      build: {
        src: '<%= cartelle.development %>/scripts/scripts.js',
        dest: '<%= cartelle.distribution %>/scripts/scripts.min.js'
      },
      bower: {
        src: '<%= cartelle.temporary %>/scripts/bower.js',
        dest: '<%= cartelle.distribution %>/scripts/bower.min.js'
      }
    },

    'ftp-deploy': {
        build: {
          auth: {
            host: '23.229.173.40',
            port: 21,
            authKey: 'key1'
          },
          src: '<%= cartelle.distribution %>',
          dest: 'public_html/test'
        }
    },

    concat: {
      dist: {}
    },

    cssmin: {
      dist: {
          files: {
              '<%= cartelle.distribution %>/styles/main.css': [
                  '.tmp/styles/{,*/}*.css',
                  '<%= cartelle.development %>/styles/{,*/}*.css'
              ]
          }
      }
    },

    // Empties folders to start fresh
    clean: [
            '.tmp',
            '<%= cartelle.distribution %>/*',
            '!<%= cartelle.distribution %>/.git*'
            ]
  });
  
  grunt.registerTask('build', [
        'clean',
        'jshint',
        'concurrent',
        'bower_concat',
        'uglify',
        'concat',
        'cssmin',
        'copy'
    ]);

  // Default task(s).
  grunt.registerTask('default', [
    'build',
    'connect:livereload',
    'watch'
    ]);

  grunt.registerTask('ftp-test', [
    'build',
    'ftp-deploy'
    ]);

  grunt.registerTask('ftp-prod', [
    'build',
    'ftp:production'
    ]);
};