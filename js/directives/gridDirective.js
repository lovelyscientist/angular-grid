var myApp = angular.module('myApp');

myApp.directive('angTable', ['$compile',
  function($compile) {
    return {
      restrict: 'E',
      templateUrl: 'js/directives/todoTemplate.html',
      replace: true,
      scope: {
        conf: "="
      },
      controller: function($scope) {

      $scope.predicate = 'age';
      $scope.reverse = true;
      $scope.numLimit = 7;
      $scope.start = 0;
      $scope.dragHead = '';
      $scope.dragImageId = "dragtable";

      $scope.$watch('conf.myData',function(newVal){
        if(newVal){
      		$scope.pages=Math.ceil($scope.conf.myData.length/$scope.numLimit);
        }
      });

      $scope.hideNext=function(){
        if(($scope.start+ $scope.numLimit) < $scope.conf.data.length){
          return false;
        }
        else return true;
      };

       $scope.hidePrev=function(){
        if($scope.start===0){
          return true;
        }
        else return false;
      };

      $scope.nextPage=function(){
        $scope.start=$scope.start+ $scope.numLimit;
      };

      $scope.PrevPage=function(){
        $scope.start=$scope.start - $scope.numLimit;
      };
      
      $scope.order = function(predicate) {
        $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
        $scope.predicate = predicate;
      };

      $scope.handleDrop = function(draggedData, targetElem) {
      		//draggedData - header which we are dragging;
      		//targetElem - DOM header a to which we drop ;
      		
	      	var srcInd = $scope.conf.heads.indexOf(draggedData),
	        	destInd = $scope.conf.heads.indexOf(targetElem.textContent);

	        swapArrayElements($scope.conf.heads, srcInd, destInd);

	        function swapArrayElements(array_object, index_a, index_b) {
	            var temp = array_object[index_a];

	            array_object[index_a] = array_object[index_b];
	            array_object[index_b] = temp;
	        }
        };

        $scope.handleDrag = function(columnName) {
          $scope.dragHead = columnName.replace(/["']/g, "");
        };

      },

      compile: function(elem) {
        return function(ielem, $scope) {
          $compile(ielem)($scope);
        };
      }

    };
  }
]);