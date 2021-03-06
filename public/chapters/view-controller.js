// Como no le paso segundo parámetro, lo que estoy pidiendo es que me de el módulo que ya está creado
var app = angular.module("ChapterManagerApp");

app.controller("ViewController", ["$scope", "$http", "$routeParams", "$location", function($scope, $http, $routeParams, $location) {

    $scope.idChapter = $routeParams.idChapter;

    $http
        .get("/api/v1/chapters/" + $scope.idChapter)
        .then(function(response) {

            $scope.chapter = response.data;

        }, error => {
            
            iziToast.error({
                icon: "fa fa-times",
                title: 'Error!',
                position: "topRight",
                message: error.data
            });
        });

    $http
        .get('/api/v1/recommendations/' + $scope.idChapter)
        .then(response => {
            
            $scope.recommendations = response.data.recommendations;
            
        }, error => {
            
            iziToast.error({
                icon: "fa fa-times",
                title: 'Error!',
                position: "topRight",
                message: error.data
            });
        });

}]);
