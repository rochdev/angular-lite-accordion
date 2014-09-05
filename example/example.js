angular.module('app', ['lite.accordion'])
  .animation('.slide', function($animate) {
    return {
      beforeAddClass: function(element, className, done) {
        if (className === 'ng-hide') {
          window.requestAnimationFrame(function() {
            element.slideUp('normal', done);
          });
        } else {
          done();
        }
      },
      removeClass: function(element, className, done) {
        if (className === 'ng-hide') {
          element.hide();

          window.requestAnimationFrame(function() {
            element.slideDown('normal', done);
          });
        } else {
          done();
        }
      }
    };
  })
  .controller('ExampleCtrl', function($scope) {
    $scope.examples = [
      {
        header: 'Example 1',
        content: 'I am the content for example 1.',
        active: true
      },
      {
        header: 'Example 2',
        content: 'I am the content for example 2.',
        active: false
      },
      {
        header: 'Example 3',
        content: 'I am the content for example 3.',
        active: false
      }
    ];
  });