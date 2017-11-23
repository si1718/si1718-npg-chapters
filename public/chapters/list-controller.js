// Como no le paso segundo parámetro, lo que estoy pidiendo es que me de el módulo que ya está creado
var app = angular.module("ChapterManagerApp");

app.controller("ListController", ["$scope", "$http", function($scope, $http) {

    function refresh() {
        $http
            .get("/api/v1/chapters")
            .then(function(response) {
                $scope.chapters = response.data;
            });
    }

    $scope.deleteChapter = function(idChapter) {

        $http
            .delete("/api/v1/chapters/" + idChapter)
            .then(function(response) {
                refresh();
            });
    };

    $scope.searchChapters = function() {

        $http({
                url: "/api/v1/chapters",
                params: $scope.searchChapter
            })
            .then(function(response) {
                $scope.chapters = response.data;
            });
    };

    refresh();

}]);
