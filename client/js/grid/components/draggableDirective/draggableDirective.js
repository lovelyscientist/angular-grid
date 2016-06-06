angular
    .module('myApp')
    .directive('draggable', draggable);

function draggable () {
  return {

    link: function (scope, elem, attr) {
            	elem.attr("draggable", true);
            	var dragDataValue = '';

              attr.$observe('dragdata', function (newValue) {
                  dragDataValue = newValue;
              });

            	elem.bind("dragstart", function(e) {
                  var sendData = angular.toJson(dragDataValue),
                      dragFn = attr.drag;

                  e.dataTransfer.setData("Text", sendData);
              
                  if (dragFn !== 'undefined') {
                      scope.$apply(function () {
                          scope[dragFn](sendData);
                      });
                  }
              });
          }
  };
}
