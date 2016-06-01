var myApp = angular.module('myApp');

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


