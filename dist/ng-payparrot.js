/**
 * Payparrot angular modules
 * @version v0.0.1 - 2013-11-04
 * @link 
 * @author Daniel Pérez <dperezrada@gmail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */

(function(angular, undefined) {
'use strict';
angular.module('ngPayparrot', ['ng', 'ui.bootstrap']);

var Utils = {

};

// make this available
angular.module('ngPayparrot').constant('Utils', Utils);

angular.module('ngPayparrot')
  .directive('popchart', function ($http) {
    return {
      template: '<div class="popover_container"><button popover-placement="right" popover="loading..." class="btn" popover-title="Visitantes últimos 3 meses">chart</button></div>',
      restrict: 'E',
      scope: {},
      link: function(scope, element, attrs) {
        var chart = null,
          options = {
            grid: { hoverable: true,
               clickable: true,
               tickColor: '#f9f9f9',
               borderWidth: 0
            },
            legend: {
              labelBoxBorderColor: '#fff'
            },
            yaxis: {
              min: 0
            },
            points: {
              show: true,
              lineWidth: 2,
              radius: 5
            },
            lines: { show: true,
               lineWidth: 3,
               //fill: true, 
               //fillColor: { colors: [ { opacity: 0.1 }, { opacity: 0.13 } ] }
            },
            xaxis: {
              mode: 'time',
              tickDecimals: 0
            }
          };

        var data = scope.$parent[attrs.ngModel];

        var updateChart = function(){
          if(!data || data.length === 0)
            return ;
          var elem = $('.popover-content', element);
          if(elem.length === 0){
            return;
          }
          if(!chart){
            elem.html('');
            chart = $.plot(elem, data , options);
            elem.show();
          }else{
            chart.setData(data);
            chart.setupGrid();
            chart.draw();
          }
        };
        scope.$watch('data', function(){
          updateChart();
        });

        $(element).click(function(){
          scope.show = !scope.show;
          if(scope.show){
            console.log("callback");
            console.log("");
            // Calling On click function
            scope.$parent[attrs.showEvent].apply(
              this, attrs.showEventAttrs.split(',')
            );

            $('.popover', element).css({
              'max-width': 'none',
              'height': '250px'
            });
            $('.popover-content', element).css({
              'width': '450px',
              'height': '220px'
            });
            updateChart();
          }
        });
      }
    };
  });})(angular);