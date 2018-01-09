// Como no le paso segundo parámetro, lo que estoy pidiendo es que me de el módulo que ya está creado
var app = angular.module("ChapterManagerApp");

app.controller("ListController", ["$scope", "$http", '$location', function($scope, $http, $location) {

    $scope.currentPage = 1;
    $scope.itemsPerPage = 5;
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
    
    $scope.checkIfExistsNewChapters = () => {
        
        $http({
            url: '/api/v1/new-chapters/stats',
            method: 'GET',
        }).then(response => {
            $scope.newChaptersTotal = response.data.total;
        });
    };

    $scope.deleteChapter = (idChapter) => {

        swal({
            title: 'Are you sure?',
            text: 'You will not be able to recover this chapter!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
        }).then((result) => {
            
            if (result.value) {
                
                swal('Deleted!', 'Your chapter has been deleted.', 'success');

                $http
                    .delete("/api/v1/chapters/" + idChapter)
                    .then(function(response) {
                        $scope.reload();
                    });
                    
            } else if (result.dismiss === 'cancel') {
                swal('Cancelled', 'Your chapter is safe :)', 'error');
            }
        });
    };

    $scope.reload(false);
    
    $scope.checkIfExistsNewChapters();
}]);
