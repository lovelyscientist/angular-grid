var myApp = angular.module('myApp');

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
