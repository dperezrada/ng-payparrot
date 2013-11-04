'use strict';

describe('Flot-Chart Directive:', function() {

  beforeEach(module('ngPayparrot'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should create a new chart', inject(function ($compile) {
    element = angular.element('<popchart></popchart>');
    element = $compile(element)(scope);
    
    console.log($('button', element).length);
    $('button', element).click();
    
    waitsFor(function() {
      return $('.popover', element).length > 0;
    }, 'popover never loaded', 5000);

  }));
});

