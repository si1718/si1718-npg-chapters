// Como no le paso segundo parámetro, lo que estoy pidiendo es que me de el módulo que ya está creado
var app = angular.module("ChapterManagerApp");

app.controller("EditController", ["$scope", "$http", "$routeParams", "$location", function($scope, $http, $routeParams, $location) {

    $scope.idChapter = $routeParams.idChapter;

    $http
        .get("/api/v1/chapters/" + $scope.idChapter)
        .then(function(response) {

            $scope.updateChapter = response.data;
            
            if($scope.isUrlValid($scope.updateChapter.book.key)) {
                
                document.getElementById('book').setAttribute('disabled', true);
                document.getElementById('book-validate-button').setAttribute('disabled', true);
            }

        }, function(error) {
            iziToast.error({
                icon: "fa fa-times",
                title: 'Error!',
                position: "topRight",
                message: error.data
            });
        });
        
        
    // MARK: Manage Researchers
    
    $scope.validateAndAddResearchers = function() {
        
        var researcherKey = $scope.researcher;
       
        var researcherSet = {
            key: null,
            name: null,
            view: null
        };
        
        if(researcherKey) {
            
            let key = 'https://si1718-dfr-researchers.herokuapp.com/api/v1/researchers/' + researcherKey;
            
            $http({
                url: key,
                method: "GET"
            }).then(function success(response) {
                
                researcherSet.key = key;
                researcherSet.name = response.data.name;
                researcherSet.view = response.data.viewURL;
                
                if(!checkIfExistsKeyInResearchers(key, $scope.updateChapter.researchers)) {
                
                    iziToast.success({
                        icon: "fa fa-check",
                        title: 'Success!',
                        position: "topRight",
                        message: 'That\'s ok, researcher found with that key'
                    });
                
                    $scope.updateChapter.researchers.push(researcherSet);
                    
                } else {
                    
                    iziToast.warning({
                        icon: "fa fa-warning",
                        title: 'Warning!',
                        position: "topRight",
                        message: 'That\'s key already exists!'
                    });
                }
                
                delete $scope.researcher;
                
            }, function error(response) {
                
                switch(response.status) {
                    
                    case 404:
                        iziToast.error({
                            icon: "fa fa-times",
                            title: 'Error!',
                            position: "topRight",
                            message: 'Sorry, researcher not found with that key'
                        });
                        break;
                    default:
                        iziToast.error({
                            icon: "fa fa-times",
                            title: 'Error!',
                            position: "topRight",
                            message: 'Unkwon error'
                        });
                        break;
                }
            });
            
        } else {
            
            iziToast.warning({
                icon: "fa fa-warning",
                title: 'Warning!',
                position: "topRight",
                message: 'Please, indicate a valid key'
            });
        }
    };
    
    $scope.deleteResearcher = function(index) {
        $scope.updateChapter.researchers.splice(index, 1);
    };
    
    $scope.validateResearcher = function(index) {
        
        var researcherKey = $scope.updateChapter.researchers[index].key;
        var researcherName = $scope.updateChapter.researchers[index].name;
       
        var researcherSet = {
            key: null,
            name: null,
            view: null
        };
        
        if(researcherKey) {
            
            let key = 'https://si1718-dfr-researchers.herokuapp.com/api/v1/researchers/' + researcherKey;
            
            $http({
                url: key,
                method: "GET"
            }).then(function success(response) {
                
                researcherSet.key = key;
                researcherSet.name = response.data.name;
                researcherSet.view = response.data.viewURL;
                
                if(!checkIfExistsKeyInResearchers(key, $scope.updateChapter.researchers)) {
                
                    iziToast.success({
                        icon: "fa fa-check",
                        title: 'Success!',
                        position: "topRight",
                        message: 'That\'s ok, researcher found with that key'
                    });
                    
                    $scope.updateChapter.researchers[index] = researcherSet;
                    
                } else {
                    
                    iziToast.warning({
                        icon: "fa fa-warning",
                        title: 'Warning!',
                        position: "topRight",
                        message: 'That\'s key already exists!'
                    });
                }
                
            }, function error(response) {
                
                switch(response.status) {
                    
                    case 404:
                        iziToast.error({
                            icon: "fa fa-times",
                            title: 'Error!',
                            position: "topRight",
                            message: 'Sorry, researcher not found with that key'
                        });
                        break;
                    default:
                        iziToast.error({
                            icon: "fa fa-times",
                            title: 'Error!',
                            position: "topRight",
                            message: 'Unkwon error'
                        });
                        break;
                }
            });
            
        } else if(researcherName) {
            
            let url = 'https://si1718-dfr-researchers.herokuapp.com/api/v1/researchers';
            
            $http({
                url: url,
                method: "GET",
                params: {
                    search: researcherName
                }
            }).then(function success(response) {
                
                if(response.data.length > 0) {
                    
                    var first = response.data[0];
                
                    researcherSet.key = url + '/' + first.idResearcher;
                    researcherSet.name = first.name;
                    researcherSet.view = first.viewURL;
                
                    iziToast.success({
                        icon: "fa fa-check",
                        title: 'Success!',
                        position: "topRight",
                        message: 'That\'s ok, researcher found with that key'
                    });
                    
                    $scope.updateChapter.researchers[index] = researcherSet;
                    
                } else {
                    
                    iziToast.error({
                        icon: "fa fa-times",
                        title: 'Error!',
                        position: "topRight",
                        message: 'That\'s ok, researcher not found with that name'
                    });
                }
                
            }, function error(response) {
                
                switch(response.status) {
                    
                    case 404:
                        iziToast.error({
                            icon: "fa fa-times",
                            title: 'Error!',
                            position: "topRight",
                            message: 'Sorry, researcher not found with that name'
                        });
                        break;
                    default:
                        iziToast.error({
                            icon: "fa fa-times",
                            title: 'Error!',
                            position: "topRight",
                            message: 'Unkwon error'
                        });
                        break;
                }
            });
            
        } else {
            
            iziToast.warning({
                icon: "fa fa-warning",
                title: 'Warning!',
                position: "topRight",
                message: 'Please, indicate a valid key'
            });
        }
    };
    
    function checkIfExistsKeyInResearchers(key, researchers) {
        
        var exists = false;
        var i = 0;
        
        while(i < researchers.length && !exists) {
            
            if(researchers[i].key == key) {
                exists = true;
            }
            
            i++;
        }
        
        return exists;
    }
    
    
    // MARK: Manage Book
    
    $scope.validateISBN = function() {
        
        var book = $scope.updateChapter.book.key;
        
        var bookSet = {
            key: null,
            title: null,
            view: null
        };
        
        if(book) {
            
            let key = 'https://si1718-lgm-books.herokuapp.com/api/v1/books/' + book;
            
            $http({
                url: key,
                method: "GET"
            }).then(function success(response) {
                
                iziToast.success({
                    icon: "fa fa-check",
                    title: 'Success!',
                    position: "topRight",
                    message: 'That\'s ok, book found with that ISBN'
                });
                
                bookSet['key'] = key;
                bookSet['title'] = response.data.title;
                bookSet['view'] = "https://si1718-lgm-books.herokuapp.com/#!/book/" + response.data.idBooks;
                
                $scope.updateChapter.book = bookSet;
                
                document.getElementById('book').setAttribute('disabled', true);
                document.getElementById('book-validate-button').setAttribute('disabled', true);
                
            }, function error(response) {
                
                switch(response.status) {
                    
                    case 404:
                        iziToast.error({
                            icon: "fa fa-times",
                            title: 'Error!',
                            position: "topRight",
                            message: 'Sorry, book not found with that ISBN'
                        });
                        break;
                    default:
                        iziToast.error({
                            icon: "fa fa-times",
                            title: 'Error!',
                            position: "topRight",
                            message: 'Unkwon error'
                        });
                        break;
                }
            });
            
        } else {
            
            iziToast.warning({
                icon: "fa fa-warning",
                title: 'Warning!',
                position: "topRight",
                message: 'Please, indicate a valid ISBN'
            });
        }
    };
    
    
    // MARK: Manage keywords
    
    $scope.addKeyword = function() {
        
        if(!$scope.updateChapter.keywords.includes($scope.keyword)) {
            $scope.updateChapter.keywords.push($scope.keyword);
        } else {
            iziToast.warning({
                icon: "fa fa-warning",
                title: 'Warning!',
                position: "topRight",
                message: 'That\'s keyword already exists!'
            });
        }
        
        delete $scope.keyword;
    };
    
    $scope.deleteKeyword = function(index) {
        $scope.updateChapter.keywords.splice(index, 1);
    };
    
    $scope.cleanKeywords = function() {
        $scope.updateChapter.keywords = [];
    };

    $scope.putChapter = function() {

        delete $scope.updateChapter._id;

        $http
            .put("/api/v1/chapters/" + $scope.idChapter, $scope.updateChapter)
            .then(function(response) {
                
                $scope.updateChapter = null;
                
                $location.path("/");
                
            }, function(error) {
                
                iziToast.error({
                    icon: "fa fa-times",
                    title: 'Error!',
                    position: "topRight",
                    message: error.data
                });
            });
    };
    
    
    // MARK: Functions
    $scope.isUrlValid = function(url) {
        return /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(url);
    }

}]);
