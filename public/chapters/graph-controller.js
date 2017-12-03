// Como no le paso segundo parámetro, lo que estoy pidiendo es que me de el módulo que ya está creado
var app = angular.module("ChapterManagerApp");

app.controller("GraphController", ["$scope", "$http", function($scope, $http) {

    $http
        .get('https://si1718-npg-chapters.herokuapp.com/api/v1/chapters')
        .then(function(response) {

            $scope.chapters = response.data;

            $http
                .get('https://si1718-lgm-books.herokuapp.com/api/v1/books')
                .then(function(response) {

                    var series = [];

                    $scope.books = response.data;

                    $scope.books.forEach((book) => {

                        $scope.chapters.forEach((chapter) => {

                            if (chapter.book.key.indexOf(book.idBooks) !== -1) {

                                if (series[book.year]) {
                                    series[book.year] += chapter.researchers.length;
                                }
                                else {
                                    series[book.year] = chapter.researchers.length;
                                }
                            }
                        });
                    });

                    var categories = [];
                    var values = [];

                    for (var category in series) {
                        categories.push(category);
                        values.push(series[category]);
                    }

                    Highcharts.chart('books-graph', {
                        chart: {
                            type: 'line'
                        },
                        title: {
                            text: 'Researchers in chapter\'s books by year'
                        },
                        yAxis: {
                            title: {
                                text: '# of researchers'
                            }
                        },
                        xAxis: {
                            categories: categories
                        },
                        plotOptions: {
                            line: {
                                dataLabels: {
                                    enabled: true
                                },
                                enableMouseTracking: false
                            }
                        },
                        series: [{
                            name: 'Researchers',
                            data: values
                        }],
                    });

                }, function(error) {
                    iziToast.error({
                        icon: "fa fa-times",
                        title: 'Error!',
                        position: "topRight",
                        message: 'Error getting books.'
                    });
                });

            var series = [];

            $scope.chapters.forEach((chapter) => {
                
                let numberOfResearchers = chapter.researchers.length;
                
                (series[numberOfResearchers]) ? series[numberOfResearchers]++ : series[numberOfResearchers] = 1;
            });

            var categories = [];
            var values = [];

            for (var category in series) {
                categories.push(category);
                values.push(series[category]);
            }

            Highcharts.chart('chapters-graph', {
                chart: {
                    type: 'line'
                },
                title: {
                    text: 'Researchers per chapter'
                },
                yAxis: {
                    title: {
                        text: '# of researchers'
                    }
                },
                xAxis: {
                    categories: categories
                },
                plotOptions: {
                    line: {
                        dataLabels: {
                            enabled: true
                        },
                        enableMouseTracking: false
                    }
                },
                series: [{
                    name: 'Researchers',
                    data: values
                }],
            });

        }, function(error) {
            iziToast.error({
                icon: "fa fa-times",
                title: 'Error!',
                position: "topRight",
                message: 'Error getting chapters.'
            });
        });
}]);
