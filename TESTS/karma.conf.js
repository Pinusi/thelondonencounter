// Karma configuration

module.exports = function(config) {
  config.set({

  	runnerPort: 9876,

  	// base path, that will be used to resolve files and exclude
    basePath: '../',

    // list of files / patterns to load in the browser
    files: [
    	"IN/bower_components/jquery/dist/jquery.js",
		"IN/bower_components/foundation/js/foundation.js",
		"IN/bower_components/mobile-detect/mobile-detect.js",
		"IN/3rd_parties_lib/supersized/js/supersized.3.2.7.js",
    	"IN/scripts/**/*.js",
    	"TESTS/specs/**/*.js",
    	{
			pattern: 'TESTS/fixtures/**/*.html',
			watched: true,
			included: false,
			served: true
		}
  	],

  	preprocessors: { "TESTS/fixtures/**/*.html": [] },

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['PhantomJS','Chrome'],

    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ['jasmine-jquery','jasmine'],

    // Which plugins to enable
    plugins:[
      'karma-phantomjs-launcher',
      'karma-jasmine',
      'karma-jasmine-jquery',
	  'karma-coverage'
    ]
  });
};
