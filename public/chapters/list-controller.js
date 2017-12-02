// Como no le paso segundo parámetro, lo que estoy pidiendo es que me de el módulo que ya está creado
var app = angular.module("ChapterManagerApp");

app.controller("ListController", ["$scope", "$http", function($scope, $http) {

    $scope.currentPage = 1;
    $scope.itemsPerPage = 25;
    $scope.totalItems = $scope.itemsPerPage;
    $scope.maxButtonSize = 5;

    $scope.setPage = (pageNo) => {
        $scope.currentPage = pageNo;
    };

    $scope.pageChanged = () => {
        $scope.reload();
    };
    
    $scope.reload = (newSearch) => {
        
        var params = ($scope.searchChapter) ? $scope.searchChapter : {};
        params["skip"] = (newSearch) ? 0 : ($scope.currentPage - 1) * $scope.itemsPerPage;
        params["limit"] = $scope.itemsPerPage;
        
        $http({
            url: "/api/v1/chapters",
            method: "GET",
            params: params
        }).then((response) => {
            
            $scope.chapters = response.data;
            
            $http({
                url: "/api/v1/chapters/stats",
                method: "GET",
                params: params
            }).then((response) => {
                
                $scope.totalItems = response.data.total;
                $scope.firstElement = (($scope.currentPage - 1) * $scope.itemsPerPage) + 1;
                $scope.lastElement = Math.min(($scope.currentPage * $scope.itemsPerPage), $scope.totalItems);
            });
        });
    };

    $scope.deleteChapter = (idChapter) => {

        $http
            .delete("/api/v1/chapters/" + idChapter)
            .then(function(response) {
                $scope.reload();
            });
    };
    
    $scope.reload(false);
}]);
