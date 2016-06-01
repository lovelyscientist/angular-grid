var myApp = angular.module('myApp', []);

myApp.controller('myCtrl', function($scope) { 
    $scope.config = {
      heads: ['name', 'age', 'company', 'tech']
    };

    $scope.config.data = [
        {"name": "Jay","age": 27,"company": "ABC","tech": "JS"},
        {"name": "Rayn","age": 30,"company": "NBC","tech": ".net"},
        {"name": "Stan","age": 29,"company": "Amazon","tech": "Java"},
        {"name": "Stan","age": 29,"company": "Amazon","tech": "Java"},
        {"name": "Bob","age": 40,"company": "E-bay","tech": "C"},
        {"name": "Clark","age": 32,"company": "Google","tech": "Python"}
    ];
});