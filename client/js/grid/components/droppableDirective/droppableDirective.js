angular
    .module('myApp')
    .directive('droppable', ['$parse', droppable]);

  function droppable ($parse) {
    return {

      link: function (scope, element, attr) {

          element.bind("dragover", onDragOver);
          element.bind("drop", onDrop);

          function onDragOver (e) {
            preventAndStop(e);
          }

          function onDrop (e) {
            var data = e.dataTransfer.getData("Text"),
                dropfn = attr.drop,
                headerElem = e.target.closest('th'),
                textOfHeader = angular.element(headerElem).find("a");

            preventAndStop(e);
            data = angular.fromJson(data);
           
            scope.$apply(function () {
              scope[dropfn](data, textOfHeader[0]);
            });

          }

          function preventAndStop (e) {
              if (e.preventDefault) e.preventDefault();
              if (e.stopPropagation) e.stopPropagation();
          }

        }
    }
  }


