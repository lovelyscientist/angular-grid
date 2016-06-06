angular
    .module('myApp')
    .controller('GridController', GridController);

GridController.$inject = ['$scope'];

function GridController ($scope) { 

    $scope.config = {
      heads: []
    };

    $scope.config.data = [
        {"name": "Jay","age": 27,"company": "ABC","tech": "JS"},
        {"name": "Rayn","age": 30,"company": "NBC","tech": ".net"},
        {"name": "Stan","age": 29,"company": "Amazon","tech": "Java"},
        {"name": "Pit","age": 29,"company": "Amazon","tech": "Java"},
        {"name": "Bob","age": 40,"company": "E-bay","tech": "C"},
        {"name": "Clark","age": 32,"company": "Google","tech": "Python"},
        {"name": "Sam","age": 29,"company": "Atlassian","tech": "JavaScript"},
        {"name": "John","age": 41,"company": "SoftServe","tech": "C++"},
        {"name": "Steve","age": 32,"company": "Deloitte","tech": "Python"}
    ];

    setHeaders();

    function setHeaders () {
        let object = $scope.config.data[0],
            result = [];

        for (let header in object) {
            $scope.config.heads.push(header);
        }
    }
}