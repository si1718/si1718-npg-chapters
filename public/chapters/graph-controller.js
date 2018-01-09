// Como no le paso segundo parámetro, lo que estoy pidiendo es que me de el módulo que ya está creado
var app = angular.module("ChapterManagerApp");

app.controller("GraphController", ["$scope", "$http", function($scope, $http) {

    // $http
    //     // Limit of the chapter's quantity because heroku returns a memory exception
    //     .get('https://si1718-npg-chapters.herokuapp.com/api/v1/chapters?skip=0&limit=10000')
    //     .then(function(response) {

    //         $scope.chapters = response.data;

    //         $http
    //             .get('https://si1718-lgm-books.herokuapp.com/api/v1/books')
    //             .then(function(response) {

    //                 var series = [];

    //                 $scope.books = response.data;

    //                 $scope.books.forEach((book) => {

    //                     $scope.chapters.forEach((chapter) => {

    //                         if (chapter.book.key.indexOf(book.idBooks) !== -1) {

    //                             if (series[book.year]) {
    //                                 series[book.year] += chapter.researchers.length;
    //                             }
    //                             else {
    //                                 series[book.year] = chapter.researchers.length;
    //                             }
    //                         }
    //                     });
    //                 });

    //                 var categories = [];
    //                 var values = [];

    //                 for (var category in series) {
    //                     categories.push(category);
    //                     values.push(series[category]);
    //                 }

    //                 Highcharts.chart('books-graph', {
    //                     chart: {
    //                         type: 'line'
    //                     },
    //                     title: {
    //                         text: 'Researchers in chapter\'s books by year'
    //                     },
    //                     yAxis: {
    //                         title: {
    //                             text: '# of researchers'
    //                         }
    //                     },
    //                     xAxis: {
    //                         title: {
    //                             text: 'Years'
    //                         },
    //                         categories: categories
    //                     },
    //                     plotOptions: {
    //                         line: {
    //                             dataLabels: {
    //                                 enabled: true
    //                             },
    //                             enableMouseTracking: false
    //                         }
    //                     },
    //                     series: [{
    //                         name: 'Researchers',
    //                         showInLegend: false,
    //                         data: values
    //                     }],
    //                 });

    //             }, function(error) {
    //                 iziToast.error({
    //                     icon: "fa fa-times",
    //                     title: 'Error!',
    //                     position: "topRight",
    //                     message: 'Error getting books.'
    //                 });
    //             });

    //         var series = [];

    //         $scope.chapters.forEach((chapter) => {

    //             let numberOfResearchers = chapter.researchers.length;

    //             (series[numberOfResearchers]) ? series[numberOfResearchers]++: series[numberOfResearchers] = 1;
    //         });

    //         var categories = [];
    //         var values = [];

    //         for (var category in series) {
    //             categories.push(category);
    //             values.push(series[category]);
    //         }

    //         Highcharts.chart('chapters-graph', {
    //             chart: {
    //                 type: 'line'
    //             },
    //             title: {
    //                 text: 'Researchers per chapter'
    //             },
    //             yAxis: {
    //                 title: {
    //                     text: '# of chapters'
    //                 }
    //             },
    //             xAxis: {
    //                 title: {
    //                     text: '# of reserarchers'
    //                 },
    //                 categories: categories
    //             },
    //             plotOptions: {
    //                 line: {
    //                     dataLabels: {
    //                         enabled: true
    //                     },
    //                     enableMouseTracking: false
    //                 }
    //             },
    //             series: [{
    //                 name: 'Researchers',
    //                 showInLegend: false,
    //                 data: values
    //             }],
    //         });

    //     }, function(error) {
    //         iziToast.error({
    //             icon: "fa fa-times",
    //             title: 'Error!',
    //             position: "topRight",
    //             message: 'Error getting chapters.'
    //         });
    //     });

    // $http
    //     .get('https://si1718-npg-chapters.herokuapp.com/api/v1/reports/daily')
    //     // .get('https://si1718-npg-chapters-pozas91.c9users.io/api/v1/reports/daily')
    //     .then(function(response) {

    //         $scope.statistics = response.data;

    //         var seriesDaily = [];
    //         var categoriesDaily = [];

    //         var dates = [];
    //         var keywords = [];

    //         var count = 0;

    //         $scope.statistics.forEach((statistic) => {

    //             statistic.date = new Date(statistic.date);

    //             if (!isDateInArray(dates, statistic.date)) {
    //                 dates.push(statistic.date);
    //             }

    //             if (!isStringInArray(keywords, statistic.keyword)) {
    //                 keywords.push(statistic.keyword);
    //             }

    //             count += statistic.count;
    //         });

    //         console.info("# total of tweets is: " + count);

    //         dates.sort((a, b) => {
    //             return a - b;
    //         });

    //         keywords.sort((a, b) => {
    //             if (a < b) return -1;
    //             if (a > b) return 1;
    //             return 0;
    //         });

    //         keywords.forEach((keyword) => {
    //             seriesDaily.push({
    //                 name: keyword,
    //                 data: []
    //             });
    //         });

    //         dates.forEach((date) => {

    //             // DAILY
    //             var fullDateDaily = toDateString(date);
    //             categoriesDaily.push(fullDateDaily);

    //             seriesDaily.forEach((serie) => {

    //                 var index = $scope.statistics.findIndex(i => (i.date.getTime() === date.getTime()) && (i.keyword === serie.name));
    //                 var count = (index >= 0) ? $scope.statistics[index].count : 0;

    //                 serie.data.push(count);
    //             });
    //         });

    //         Highcharts.chart('statistics-daily-graph', {
    //             chart: {
    //                 type: 'line'
    //             },
    //             title: {
    //                 text: 'Keywords statistics daily'
    //             },
    //             legend: {
    //                 layout: 'vertical',
    //                 align: 'right',
    //                 verticalAlign: 'middle'
    //             },
    //             yAxis: {
    //                 title: {
    //                     text: '# of tweets'
    //                 }
    //             },
    //             xAxis: {
    //                 title: {
    //                     text: 'days'
    //                 },
    //                 categories: categoriesDaily
    //             },
    //             plotOptions: {
    //                 line: {
    //                     dataLabels: {
    //                         enabled: true
    //                     },
    //                     enableMouseTracking: false
    //                 }
    //             },
    //             series: seriesDaily,
    //         });

    //     }, function(error) {
    //         iziToast.error({
    //             icon: "fa fa-times",
    //             title: 'Error!',
    //             position: "topRight",
    //             message: 'Error getting statistics.'
    //         });
    //     });

    $http
        .get('https://si1718-npg-chapters.herokuapp.com/api/v1/reports/monthly')
        // .get('https://si1718-npg-chapters-pozas91.c9users.io/api/v1/reports/monthly')
        .then(function(response) {

            $scope.statistics = response.data;

            var seriesMonthly = [];
            var categoriesMonthly = [];

            var datesMonthly = [];
            var keywords = [];

            var statisticsMonthly = [];

            var count = 0;

            $scope.statistics.forEach((statistic) => {

                statistic.date = new Date(statistic.date);

                if (!isStringInArray(keywords, statistic.keyword)) {
                    keywords.push(statistic.keyword);
                }

                var index = statisticsMonthly.findIndex(i => ((toDateMonthString(i.date) === toDateMonthString(statistic.date)) && (i.keyword) === statistic.keyword));

                if (index >= 0) {

                    statisticsMonthly[index].count += statistic.count;

                }
                else {

                    statisticsMonthly.push({
                        keyword: statistic.keyword,
                        date: statistic.date,
                        count: statistic.count,
                    });
                }

                count += statistic.count;
            });

            console.info("# total of tweets is: " + count);

            statisticsMonthly.forEach((statistic) => {

                statistic.date = new Date(statistic.date);
                var monthOfYear = toMonthOfYearString(statistic.date);

                if (!isStringInArray(datesMonthly, monthOfYear)) {
                    datesMonthly.push(monthOfYear);
                }
            });

            datesMonthly.sort((a, b) => {
                if (a < b) return -1;
                if (a > b) return 1;
                return 0;
            });

            keywords.sort((a, b) => {
                if (a < b) return -1;
                if (a > b) return 1;
                return 0;
            });

            keywords.forEach((keyword) => {

                seriesMonthly.push({
                    name: keyword,
                    data: []
                });
            });

            datesMonthly.forEach((date) => {

                // MONTHLY
                categoriesMonthly.push(date);

                seriesMonthly.forEach((serie) => {

                    var index = statisticsMonthly.findIndex(i => (toMonthOfYearString(i.date) === date) && (i.keyword === serie.name));
                    var count = (index >= 0) ? statisticsMonthly[index].count : 0;

                    serie.data.push(count);
                });
            });

            Highcharts.chart('statistics-monthly-graph', {
                chart: {
                    type: 'line'
                },
                title: {
                    text: 'Keywords statistics monthly'
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle'
                },
                yAxis: {
                    title: {
                        text: '# of tweets'
                    }
                },
                xAxis: {
                    title: {
                        text: 'months'
                    },
                    categories: categoriesMonthly
                },
                plotOptions: {
                    line: {
                        dataLabels: {
                            enabled: true
                        },
                        enableMouseTracking: false
                    }
                },
                series: seriesMonthly,
            });

        }, function(error) {
            iziToast.error({
                icon: "fa fa-times",
                title: 'Error!',
                position: "topRight",
                message: 'Error getting statistics.'
            });
        });

    function isDateInArray(array, value) {
        return !!array.find(item => { return item.getTime() == value.getTime() });
    }

    function isStringInArray(array, value) {
        return !!array.find(item => { return item == value });
    }

    function toDateString(date) {
        return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    }

    function toDateMonthString(date) {
        return date.getFullYear() + '-' + (date.getMonth() + 1);
    }

    function toMonthOfYearString(date) {
        return months[date.getMonth()] + ' of ' + date.getFullYear();
    }

    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

}]);
