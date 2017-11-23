// Como no le paso segundo parámetro, lo que estoy pidiendo es que me de el módulo que ya está creado
var app = angular.module("ChapterManagerApp");

app.controller("CreateController", ["$scope", "$http", "$location", function($scope, $http, $location) {

    $scope.postChapter = function() {

        $scope.newChapter.researchersName = $scope.newChapter.researchersName.split(",");
        $scope.newChapter.researchers = $scope.newChapter.researchers.split(",");

        $http
            .post("/api/v1/chapters", $scope.newChapter)
            .then(function(response) {
                $location.path("/");
            }, function(error) {
                alert(error.data);
            });

        initializeNewChapter();
    };

    function initializeNewChapter() {
        $scope.newChapter = {
            "idChapter": "",
            "book": "",
            "name": "",
            "pages": "",
            "researchers": [],
            "researchersName": []
        };
    }

    initializeNewChapter();
}]);
