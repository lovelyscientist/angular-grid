angular
    .module('myApp')
    .directive('grid', ['$compile', grid]);

function grid ($compile) {
    return {
      restrict: 'E',
      templateUrl: 'js/grid/components/gridDirective/gridDirective.html',
      replace: true,

      scope: {
        conf: "="
      },

      controller: function($scope) {
          $scope.predicate = 'name';
          $scope.reverse = true;
          $scope.PAGE_SIZE = 3;
          $scope.start = 0;
          $scope.dragHead = '';

          $scope.hideNext = function () {
              return !($scope.start +  $scope.PAGE_SIZE < $scope.conf.data.length);
          }

          $scope.hidePrev = function () {
              return ($scope.start === 0);
          };

          $scope.nextPage = function () {
              $scope.start = $scope.start + $scope.PAGE_SIZE;
          };

          $scope.prevPage = function(){
            $scope.start= $scope.start - $scope.PAGE_SIZE;
          };
          
          $scope.order = function (predicate) {
              if ($scope.predicate === predicate) {
                  $scope.reverse = !$scope.reverse;
              } else {
                  $scope.reverse = false;
                  $scope.predicate = predicate;
              }              
          };

          $scope.handleDrop = function(draggedData, targetElem) {
    	      	let srcInd = $scope.conf.heads.indexOf(draggedData),
    	        	  destInd = $scope.conf.heads.indexOf(targetElem.textContent);

    	        swapArrayElements($scope.conf.heads, srcInd, destInd);

    	        function swapArrayElements(array, index_a, index_b) {
    	            let temp = array[index_a];
    	            array[index_a] = array[index_b];
    	            array[index_b] = temp;
    	        }

            };

            $scope.handleDrag = function (columnName) {
                $scope.dragHead = columnName.replace(/["']/g, '');
            };

      }

    };
  }