module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],

    files: [
      'bower_components/angular/angular.js',
      'bower_components/angular-animate/angular-animate.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'angular-lite-accordion.js',
      'test/**/*.spec.js'
    ],

    reporters: ['mocha', 'junit'],

    autoWatch: true,

    browsers: ['PhantomJS']
  });
};
