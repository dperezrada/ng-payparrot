'use strict';

angular.module('ngPayparrot')
  .directive('popchart', function ($http) {
    return {
      template: '<div class="popover_container"><i alt="hola" class="icon-bar-chart" popover-placement="right" popover="loading..." class="btn" popover-title="{{customTitle}}"></i></div>',
      restrict: 'E',
      scope: {showEventAttrs: "=",showEvent: "=", ngModel: "=", customTitle: "="},
      link: function(scope, element, attrs) {
        var chart = null,
          options = {
            grid: {
              hoverable: true,
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

        var updateChart = function(){
          if(!scope.ngModel || scope.ngModel.length === 0)
            return ;
          var elem = $('.popover-content', element);
          if(elem.length === 0){
            return;
          }
          if(!chart){
            elem.html('');
            chart = $.plot(elem, scope.ngModel , options);
            elem.show();
          }else{
            chart.setData(scope.ngModel);
            chart.setupGrid();
            chart.draw();
          }
        };
        scope.$watch('ngModel', function(){
          updateChart();
        }, true);

        $(element).click(function(){
          scope.show = !scope.show;
          if(scope.show){
            // Calling On show event function
            var apply_attrs = scope.showEventAttrs;
            if(!(apply_attrs instanceof Array )){
              apply_attrs = [scope.showEventAttrs,];
            }
            scope.showEvent.apply(this, apply_attrs);

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
  });