// Como no le paso segundo parámetro, lo que estoy pidiendo es que me de el módulo que ya está creado
var app = angular.module("ChapterManagerApp");

app.controller("CreateController", ["$scope", "$http", "$location", function($scope, $http, $location) {



    // MARK: Manage Researchers

    $scope.validateAndAddResearchers = function() {

        var researcherKey = $scope.researcher;

        var researcherSet = {
            key: null,
            name: null,
            view: null
        };

        if (researcherKey) {

            let key = 'https://si1718-dfr-researchers.herokuapp.com/api/v1/researchers/' + researcherKey;

            $http({
                url: key,
                method: "GET"
            }).then(function success(response) {

                researcherSet.key = key;
                researcherSet.name = response.data.name;
                researcherSet.view = response.data.viewURL;

                if (!checkIfExistsKeyInResearchers(key, $scope.newChapter.researchers)) {

                    iziToast.success({
                        icon: "fa fa-check",
                        title: 'Success!',
                        position: "topRight",
                        message: 'That\'s ok, researcher found with that key'
                    });

                    $scope.newChapter.researchers.push(researcherSet);

                }
                else {

                    iziToast.warning({
                        icon: "fa fa-warning",
                        title: 'Warning!',
                        position: "topRight",
                        message: 'That\'s key already exists!'
                    });
                }

                delete $scope.researcher;

            }, function error(response) {

                switch (response.status) {

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

        }
        else {

            iziToast.warning({
                icon: "fa fa-warning",
                title: 'Warning!',
                position: "topRight",
                message: 'Please, indicate a valid key'
            });
        }
    };

    $scope.deleteResearcher = function(index) {
        $scope.newChapter.researchers.splice(index, 1);
    };

    $scope.validateResearcher = function(index) {

        var researcherKey = $scope.newChapter.researchers[index].key;
        var researcherName = $scope.newChapter.researchers[index].name;

        var researcherSet = {
            key: null,
            name: null,
            view: null
        };

        if (researcherKey) {

            let key = 'https://si1718-dfr-researchers.herokuapp.com/api/v1/researchers/' + researcherKey;

            $http({
                url: key,
                method: "GET"
            }).then(function success(response) {

                researcherSet.key = key;
                researcherSet.name = response.data.name;
                researcherSet.view = response.data.viewURL;

                if (!checkIfExistsKeyInResearchers(key, $scope.newChapter.researchers)) {

                    iziToast.success({
                        icon: "fa fa-check",
                        title: 'Success!',
                        position: "topRight",
                        message: 'That\'s ok, researcher found with that key'
                    });

                    $scope.newChapter.researchers[index] = researcherSet;

                }
                else {

                    iziToast.warning({
                        icon: "fa fa-warning",
                        title: 'Warning!',
                        position: "topRight",
                        message: 'That\'s key already exists!'
                    });
                }

            }, function error(response) {

                switch (response.status) {

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

        }
        else if (researcherName) {

            let url = 'https://si1718-dfr-researchers.herokuapp.com/api/v1/researchers';

            $http({
                url: url,
                method: "GET",
                params: {
                    search: researcherName
                }
            }).then(function success(response) {

                if (response.data.length > 0) {

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

                    $scope.newChapter.researchers[index] = researcherSet;

                }
                else {

                    iziToast.error({
                        icon: "fa fa-times",
                        title: 'Error!',
                        position: "topRight",
                        message: 'That\'s ok, researcher not found with that name'
                    });
                }

            }, function error(response) {

                switch (response.status) {

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

        }
        else {

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

        while (i < researchers.length && !exists) {

            if (researchers[i].key == key) {
                exists = true;
            }

            i++;
        }

        return exists;
    }



    // MARK: Manage new chapters

    function getNewChapters() {

        $http({
            url: '/api/v1/new-chapters',
            method: 'GET',
        }).then((response) => {

            $scope.newChapters = response.data;

        }, function error(response) {

            swal({
                title: 'Error',
                text: 'Has been an error getting new chapters',
                type: 'error',
                showCancelButton: true,
                confirmButtonText: 'Retry!',
                cancelButtonText: 'Abort'
            }).then((result) => {

                if (result.value) {
                    getNewChapters();
                }
            });
        });
    }

    $scope.nextNewChapter = function() {

        if ($scope.newChapters.length > 0) {

            if ($scope.currentNewChapterIndex == null) {
                $scope.currentNewChapterIndex = -1;
            }

            $scope.currentNewChapterIndex++;
            $scope.currentNewChapter = $scope.newChapters[$scope.currentNewChapterIndex];

            updateForm($scope.currentNewChapter);
        }
    };

    $scope.previousNewChapter = function() {

        if ($scope.newChapters.length > 0) {

            if ($scope.currentNewChapterIndex > 0) {

                $scope.currentNewChapterIndex--;
                $scope.currentNewChapter = $scope.newChapters[$scope.currentNewChapterIndex];

                updateForm($scope.currentNewChapter);

            }
            else {

                $scope.currentNewChapter = null;
                $scope.currentNewChapterIndex--;
            }
        }
    };

    function updateForm(chapter) {
        $scope.newChapter = chapter;
    }



    // MARK: Manage Book

    $scope.validateISBN = function() {

        var book = $scope.newChapter.book.key;

        var bookSet = {
            key: null,
            title: null,
            view: null
        };

        if (book) {

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

                $scope.newChapter.book = bookSet;

                document.getElementById('book').setAttribute('disabled', true);
                document.getElementById('book-validate-button').setAttribute('disabled', true);

            }, function error(response) {

                switch (response.status) {

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

        }
        else {

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

        if (!$scope.newChapter.keywords.includes($scope.keyword)) {
            $scope.newChapter.keywords.push($scope.keyword);
        }
        else {
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
        $scope.newChapter.keywords.splice(index, 1);
    };

    $scope.cleanKeywords = function() {
        $scope.newChapter.keywords = [];
    };



    // MARK: Manage Chapters

    function initializeNewChapter() {
        $scope.newChapter = {
            "idChapter": null,
            "book": null,
            "name": null,
            "pages": null,
            "researchers": [],
            "keywords": []
        };
    }

    $scope.postChapter = function() {

        $http
            .post("/api/v1/chapters", $scope.newChapter)
            .then(function success(response) {

                $http
                    .delete('/api/v1/new-chapters/' + response.data.idChapter)
                    .then(response => {

                        initializeNewChapter();

                        $location.path('/');

                    }, function(error) {

                        iziToast.error({
                            icon: "fa fa-times",
                            title: 'Error!',
                            position: "topRight",
                            message: error.data
                        });
                    });

            }, function error(error) {

                if (error.status === 409) {

                    $http
                        .delete('/api/v1/new-chapters/' + error.config.data.idChapter)
                        .then(response => {

                            initializeNewChapter();

                            $location.path('/');

                        }, function(error) {

                            iziToast.error({
                                icon: "fa fa-times",
                                title: 'Error!',
                                position: "topRight",
                                message: error.data
                            });
                        });

                }
                else {

                    iziToast.error({
                        icon: "fa fa-times",
                        title: 'Error!',
                        position: "topRight",
                        message: error.data
                    });
                }
            });
    };



    // MARK: Invocations
    initializeNewChapter();
    getNewChapters();
}]);
