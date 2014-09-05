angular.module('lite.accordion', ['ngAnimate'])
  .constant('liteAccordionDefaults', {
    closeOthers: false
  })
  /**
   * @ngdoc object
   * @name LiteAccordionGroupCtrl
   * @requires $scope
   * @requires $attrs
   * @requires liteAccordionDefaults
   *
   * @description
   * `liteAccordionGroup` directive controller
   */
  .controller('LiteAccordionGroupCtrl',['$scope', '$attrs', 'liteAccordionDefaults', function($scope, $attrs, liteAccordionDefaults) {
    'use strict';

    this.accordions = [];

    this.closeOthers = function(openAccordion) {
      var closeOthers = angular.isDefined($attrs.closeOthers) ?
        $scope.$eval($attrs.closeOthers) :
        liteAccordionDefaults.closeOthers;

      if (closeOthers) {
        angular.forEach(this.accordions, function(accordion) {
          if (accordion !== openAccordion) {
            accordion.isOpen = false;
          }
        });
      }
    };

    this.addAccordion = function(accordionScope) {
      this.accordions.push(accordionScope);

      accordionScope.$on('$destroy', angular.bind(this, function() {
        this.removeAccordion(accordionScope);
      }));
    };

    this.removeAccordion = function(accordionScope) {
      var index = this.accordions.indexOf(accordionScope);

      if (index !== -1) {
        this.accordions.splice(index, 1);
      }
    };
  }])
  /**
   * @ngdoc object
   * @name LiteAccordionCtrl
   * @requires $scope
   *
   * @description
   * `liteAccordion` directive controller
   */
  .controller('LiteAccordionCtrl', ['$scope', function($scope) {
    'use strict';
    
    $scope.toggle = function() {
      if (!$scope.isDisabled) {
        $scope.$apply(function() {
          $scope.isOpen = !$scope.isOpen;
        });
      }
    };

    this.scope = $scope;
  }])
  /**
   * @ngdoc directive
   * @name liteAccordionGroup
   * @restrict A
   * @element ANY
   * @param {expression} closeOthers
   * 
   * @description
   * The `liteAccordionGroup` directive groups multiple `liteAccordion`
   * directives together.
   */
  .directive('liteAccordionGroup', function() {
    'use strict';

    return {
      restrict: 'A',
      transclude: true,
      controller: 'LiteAccordionGroupCtrl',
      link: function(scope, iElement, iAttrs, ctrl, transclude) {
        transclude(function(clone) {
          iElement.append(clone);
        });
      }
    };
  })
  /**
   * @ngdoc directive
   * @name liteAccordion
   * @restrict A
   * @element ANY
   * @param {expression} isOpen
   * @param {expression} isDisabled
   * 
   * @description
   * The `liteAccordion` directive represents a single accordion instance. It is
   * the container for the body and any of its toggles.
   */
  .directive('liteAccordion', function() {
    'use strict';

    return {
      restrict: 'A',
      require: '?^liteAccordionGroup',
      scope: {
        isOpen: '=?',
        isDisabled: '=?'
      },
      transclude: true,
      controller: 'LiteAccordionCtrl',
      link: function(scope, iElement, iAttrs, groupCtrl, transclude) {
        if (groupCtrl) {
          groupCtrl.addAccordion(scope);

          scope.$watch('isOpen', function(value) {
            if (value) {
              groupCtrl.closeOthers(scope);
            }
          });
        }

        transclude(function(clone) {
          iElement.append(clone);
        });
      }
    };
  })
  /**
   * @ngdoc directive
   * @name liteAccordionToggle
   * @restrict A
   * @element ANY
   * @param {string} liteAccordionToggle
   * 
   * @description
   * The `liteAccordionToggle` directive controls the `is-open` attribute
   * of its parent `liteAccordion`.
   */
  .directive('liteAccordionToggle', function() {
    'use strict';

    return {
      restrict: 'A',
      require: '^liteAccordion',
      transclude: true,
      link: function(scope, iElement, iAttrs, accordionCtrl, transclude) {
        iElement.on('click', function() {
          var action = iAttrs.liteAccordionToggle;
          var isOpen = accordionCtrl.scope.isOpen;

          if (isOpen && action !== 'open' || !isOpen && action !== 'close') {
            accordionCtrl.scope.toggle();
          }
        });

        transclude(function(clone) {
          iElement.append(clone);
        });
      }
    };
  })
  /**
   * @ngdoc directive
   * @name liteAccordionBody
   * @restrict A
   * @element ANY
   * 
   * @description
   * The `liteAccordionBody` directive contains the actual content of the
   * accordion.
   */
  .directive('liteAccordionBody', ['$animate', function($animate) {
    'use strict';

    return {
      restrict: 'A',
      require: '^liteAccordion',
      transclude: true,
      link: function(scope, iElement, iAttrs, accordionCtrl, transclude) {
        if (!accordionCtrl.scope.isOpen) {
          iElement.addClass('ng-hide');
        }

        accordionCtrl.scope.$watch('isOpen', function(value) {
          $animate[value ? 'removeClass' : 'addClass'](iElement, 'ng-hide');
        }, true);

        transclude(function(clone) {
          iElement.append(clone);
        });
      }
    };
  }]);