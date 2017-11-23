// Como no le paso segundo parámetro, lo que estoy pidiendo es que me de el módulo que ya está creado
var app = angular.module("ChapterManagerApp");

app.controller("EditController", ["$scope", "$http", "$routeParams", "$location", function($scope, $http, $routeParams, $location) {

    $scope.idChapter = $routeParams.idChapter;

    $http
        .get("/api/v1/chapters/" + $scope.idChapter)
        .then(function(response) {
            
            $scope.updateChapter = response.data;
            
            if(Array.isArray($scope.updateChapter.researchersName)) {
                $scope.updateChapter.researchersName = $scope.updateChapter.researchersName.toString();
            }
            
            if(Array.isArray($scope.updateChapter.researchers)) {
                $scope.updateChapter.researchers = $scope.updateChapter.researchers.toString();
            }
            
        }, function(error) {
            alert(error.data);
        });

    $scope.putChapter = function() {

        delete $scope.updateChapter._id;
        
        $scope.updateChapter.researchersName = $scope.updateChapter.researchersName.split(",");
        $scope.updateChapter.researchers = $scope.updateChapter.researchers.split(",");

        $http
            .put("/api/v1/chapters/" + $scope.idChapter, $scope.updateChapter)
            .then(function(response) {
                $location.path("/");
            }, function(error) {
                alert(error.data);
            });
            
        $scope.updateChapter = null;
    };

}]);
