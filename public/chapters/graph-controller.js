// Como no le paso segundo parámetro, lo que estoy pidiendo es que me de el módulo que ya está creado
var app = angular.module("ChapterManagerApp");

app.controller("GraphController", ["$scope", "$http", function($scope, $http) {
    
    var dailyGraphCategories = [];
    $scope.dailyGraph = null;
    
    var monthlyGraphCategories = [];
    $scope.monthlyGraph = null;
    
    $scope.selected = "";

    $http
        // .get('https://si1718-npg-chapters.herokuapp.com/api/v1/reports/researchers-per-year')
        .get('https://si1718-npg-chapters-pozas91.c9users.io/api/v1/reports/researchers-per-year')
        .then(function(response) {

            let data = response.data;

            var categories = [];
            var values = [];

            data.forEach((report) => {

                categories.push(report.year);
                values.push(report.researchers);
            });

            Highcharts.chart('researchers-per-year-graph', {
                chart: {
                    type: 'line'
                },
                title: {
                    text: 'Researchers per year'
                },
                yAxis: {
                    title: {
                        text: '# of reserarchers'
                    }
                },
                xAxis: {
                    title: {
                        text: 'Year'
                    },
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
                    showInLegend: false,
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

    $http
        // .get('https://si1718-npg-chapters.herokuapp.com/api/v1/reports/researchers-per-chapter')
        .get('https://si1718-npg-chapters-pozas91.c9users.io/api/v1/reports/researchers-per-chapter')
        .then(function(response) {

            let data = response.data;

            var categories = [];
            var values = [];

            data.forEach((report) => {

                values.push(report.chapters);
                categories.push(report.researchers);
            });

            Highcharts.chart('researchers-per-chapter-graph', {
                chart: {
                    type: 'line'
                },
                title: {
                    text: 'Researchers per chapter'
                },
                yAxis: {
                    title: {
                        text: '# of chapters'
                    }
                },
                xAxis: {
                    title: {
                        text: '# of researchers'
                    },
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
                    showInLegend: false,
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

    $http
        // .get('https://si1718-npg-chapters.herokuapp.com/api/v1/reports/daily')
        .get('https://si1718-npg-chapters-pozas91.c9users.io/api/v1/reports/daily')
        .then(function(response) {

            let data = response.data;

            var series = [];
            var dates = [];
            var keywords = [];

            data.forEach((statistic) => {

                statistic.date = new Date(statistic.date);

                if (!isDateDayInArray(dates, statistic.date)) {
                    dates.push(statistic.date);
                }

                if (!isStringInArray(keywords, statistic.keyword)) {
                    keywords.push(statistic.keyword);
                }
            });

            dates.sort((a, b) => {
                return a - b;
            });

            keywords.sort((a, b) => {
                if (a < b) return -1;
                if (a > b) return 1;
                return 0;
            });

            keywords.forEach((keyword) => {
                series.push({
                    name: keyword,
                    data: []
                });
            });

            dates.forEach((date) => {

                var fullDateDaily = toDateString(date);
                dailyGraphCategories.push(fullDateDaily);

                series.forEach((serie) => {

                    var index = data.findIndex(i => (toDateString(i.date) === toDateString(date)) && (i.keyword === serie.name));
                    var count = (index >= 0) ? data[index].count : 0;

                    serie.data.push(count);
                });
            });
            
            $scope.dailySeries = series;

            createDailyGraph();

        }, function(error) {
            iziToast.error({
                icon: "fa fa-times",
                title: 'Error!',
                position: "topRight",
                message: 'Error getting daily statistics.'
            });
        });

    $http
        // .get('https://si1718-npg-chapters.herokuapp.com/api/v1/reports/monthly')
        .get('https://si1718-npg-chapters-pozas91.c9users.io/api/v1/reports/monthly')
        .then(function(response) {
            
            let data = response.data;

            var series = [];
            var dates = [];
            var keywords = [];

            data.forEach((statistic) => {

                statistic.date = new Date(statistic.date);

                if (!isDateMonthlyInArray(dates, statistic.date)) {
                    dates.push(statistic.date);
                }

                if (!isStringInArray(keywords, statistic.keyword)) {
                    keywords.push(statistic.keyword);
                }
            });

            dates.sort((a, b) => {
                return a - b;
            });

            keywords.sort((a, b) => {
                if (a < b) return -1;
                if (a > b) return 1;
                return 0;
            });

            keywords.forEach((keyword) => {
                series.push({
                    name: keyword,
                    data: []
                });
            });

            dates.forEach((date) => {

                monthlyGraphCategories.push(toMonthOfYearString(date));

                series.forEach((serie) => {

                    var index = data.findIndex(i => (toDateMonthString(i.date) === toDateMonthString(date)) && (i.keyword === serie.name));
                    var count = (index >= 0) ? data[index].count : 0;

                    serie.data.push(count);
                });
            });
            
            $scope.monthlySeries = series;

            createMonthlyGraph();

        }, function(error) {
            iziToast.error({
                icon: "fa fa-times",
                title: 'Error!',
                position: "topRight",
                message: 'Error getting monthly statistics.'
            });
        });

    function isDateDayInArray(array, value) {
        return !!array.find(item => { return toDateString(item) === toDateString(value) });
    }
    
    function isDateMonthlyInArray(array, value) {
        return !!array.find(item => { return toDateMonthString(item) === toDateMonthString(value) });
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

    function createDailyGraph() {
        $scope.dailyGraph = new Highcharts.chart('statistics-daily-graph', {
            chart: {
                type: 'line'
            },
            title: {
                text: 'Keywords statistics daily'
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
                    text: 'days'
                },
                categories: dailyGraphCategories
            },
            plotOptions: {
                line: {
                    events: {
                        legendItemClick: function(data) {
                            
                            let index = data.target.index;
                            
                            $scope.dailyGraph.series[index].remove(false);
                            $scope.dailyGraph.redraw();
                        }
                    },
                    dataLabels: {
                        enabled: true
                    },
                    enableMouseTracking: false
                }
            },
            series: [],
        });
    }
    
    function createMonthlyGraph() {
        $scope.monthlyGraph = new Highcharts.chart('statistics-monthly-graph', {
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
                categories: monthlyGraphCategories
            },
            plotOptions: {
                line: {
                    events: {
                        legendItemClick: function(data) {
                            
                            let index = data.target.index;
                            
                            $scope.monthlyGraph.series[index].remove(false);
                            $scope.monthlyGraph.redraw();
                        }
                    },
                    dataLabels: {
                        enabled: true
                    },
                    enableMouseTracking: false
                }
            },
            series: [],
        });
    }
    
    $scope.onSelectDaily = ($item, $model, $label) => {
        
        $scope.selected = "";
        
        $scope.dailyGraph.addSeries({
            name: $item.name,
            data: $item.data
        });
        
        $scope.dailyGraph.redraw();
    };
    
    $scope.onSelectMonthly = ($item, $model, $label) => {
        
        $scope.selected = "";
        
        $scope.monthlyGraph.addSeries({
            name: $item.name,
            data: $item.data
        });
        
        $scope.monthlyGraph.redraw();
    };

    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

}]);
