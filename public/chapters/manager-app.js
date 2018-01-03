var app = angular.module("ChapterManagerApp", [
    "ngRoute",
    "ui.bootstrap"
]).config(function($routeProvider) {
    
    console.log("App Initialized!");
    
    $routeProvider.when("/", {
        templateUrl: "list.html",
        controller: "ListController"
    }).when("/chapters/:idChapter/view", {
        templateUrl: "view.html",
        controller: "ViewController"
    }).when("/chapters/:idChapter/edit", {
        templateUrl: "edit.html",
        controller: "EditController"
    }).when("/chapters/create", {
        templateUrl: "create.html",
        controller: "CreateController"
    }).when("/graph", {
        templateUrl: "graph.html",
        controller: "GraphController"
    }).when("/news-chapters", {
        templateUrl: "news-chapters.html",
        controller: "NewChapterController"
    });
});
