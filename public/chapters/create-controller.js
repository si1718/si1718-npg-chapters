// Como no le paso segundo parámetro, lo que estoy pidiendo es que me de el módulo que ya está creado
var app = angular.module("ChapterManagerApp");

app.controller("CreateController", ["$scope", "$http", "$location", function($scope, $http, $location) {

    $scope.postChapter = function() {
        
        if($scope.newChapter.researchersName.length > 0) {
            $scope.newChapter.researchersName = $scope.newChapter.researchersName.split(",");
        }
        
        if($scope.newChapter.researchers.length > 0) {
            $scope.newChapter.researchers = $scope.newChapter.researchers.split(",");
        }

        $http
            .post("/api/v1/chapters", $scope.newChapter)
            .then(function(response) {
                $location.path("/");
            }, function(error) {
                iziToast.error({
                    icon: "fa fa-times",
                    title: 'Error!',
                    position: "topRight",
                    message: error.data
                });
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
