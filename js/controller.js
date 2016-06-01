var myApp = angular.module('myApp');
myApp.controller('myCtrl', function($scope,candidates) {
  var candidates = [{
     "name": "Jay",
     "age": 27,
     "company": "ABC",
     "tech": "Js"
   }, {
     "name": "Rayn",
     "age": 30,
     "company": "NBC",
     "tech": ".net"
   }, {
     "name": "Stan",
     "age": 29,
     "company": "Amazon",
     "tech": "Java"
   }, {
     "name": "Stan",
     "age": 29,
     "company": "Amazon",
     "tech": "Java"
   },
    {
     "name": "Bob",
     "age": 40,
     "company": "E-bay",
     "tech": "C"
   },
   {
     "name": "Clark",
     "age": 32,
     "company": "Google",
     "tech": "Python"
   }];

  $scope.config.myData=candidates;

  $scope.config = {
    heads: ['name', 'age', 'company', 'tech']
  };
  
});

myApp.directive('droppable', ['$parse',
  function($parse) {
    return {

      link: function(scope, element, attr) {
        function onDragOver(e) {
          if (e.preventDefault) {
            e.preventDefault();
          }
          if (e.stopPropagation) {
            e.stopPropagation();
          }
          e.dataTransfer.dropEffect = 'move';
          return false;
        }

        function onDrop(e) {
          console.log("dropped");
          if (e.preventDefault) {
            e.preventDefault();
          }
          if (e.stopPropagation) {
            e.stopPropagation();
          }
          var data = e.dataTransfer.getData("Text");
          data = angular.fromJson(data);
          var dropfn = attr.drop;
          var fn = $parse(attr.drop);
          var headerElem=e.target.closest('th');
          var textOfHeader=angular.element(headerElem).find("a");
          scope.$apply(function() {
            scope[dropfn](data, textOfHeader[0]);
          });

        }
        element.bind("dragover", onDragOver);
        element.bind("drop", onDrop);
      }
    };
  }
]);

myApp.directive('draggable', function() {
  return {
    link: function(scope, elem, attr) {
      elem.attr("draggable", true);
      var dragDataVal = '';
      var draggedGhostImgElemId = '';
      attr.$observe('dragdata', function(newVal) {
        dragDataVal = newVal;

      });
      attr.$observe('dragimage', function(newVal) {
        draggedGhostImgElemId = newVal;
      });
      elem.bind("dragstart", function(e) {
        var sendData = angular.toJson(dragDataVal);
        e.dataTransfer.setData("Text", sendData);
        if (attr.dragimage !== 'undefined') {
          e.dataTransfer.setDragImage(
            document.getElementById(draggedGhostImgElemId), 0, 0
          );
        }
        var dragFn = attr.drag;
        if (dragFn !== 'undefined') {
          scope.$apply(function() {
            scope[dragFn](sendData);
          })
        }
      });
    }
  };
});

myApp.directive('angTable', ['$compile',
  function($compile) {
    return {
      restrict: 'E',
      templateUrl: 'tabletemplate.html',
      replace: true,
      scope: {
        conf: "="
      },
      controller: function($scope) {
        $scope.predicate = 'age';
      $scope.reverse = true;
      $scope.numLimit=5;
      $scope.start = 0;
      $scope.$watch('conf.myData',function(newVal){
        if(newVal){
      $scope.pages=Math.ceil($scope.conf.myData.length/$scope.numLimit);
   
        }
      });
      $scope.hideNext=function(){
        if(($scope.start+ $scope.numLimit) < $scope.conf.myData.length){
          return false;
        }
        else 
        return true;
      };
       $scope.hidePrev=function(){
        if($scope.start===0){
          return true;
        }
        else 
        return false;
      };
      $scope.nextPage=function(){
        console.log("next pages");
        $scope.start=$scope.start+ $scope.numLimit;
        console.log( $scope.start)
      };
      $scope.PrevPage=function(){
        console.log("next pages");
        $scope.start=$scope.start - $scope.numLimit;
        console.log( $scope.start)
      };
      
         $scope.order = function(predicate) {
        $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
        $scope.predicate = predicate;
      };
        $scope.dragHead = '';
        $scope.dragImageId = "dragtable";
        $scope.handleDrop = function(draggedData,
          targetElem) {

          var swapArrayElements = function(array_object, index_a, index_b) {
            var temp = array_object[index_a];
            array_object[index_a] = array_object[index_b];
            array_object[index_b] = temp;
          };
          var srcInd = $scope.conf.heads.indexOf(draggedData);
          var destInd = $scope.conf.heads.indexOf(targetElem.textContent);
          swapArrayElements($scope.conf.heads, srcInd, destInd);
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