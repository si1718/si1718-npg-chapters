var app = angular.module("ChapterManagerApp", [
    "ngRoute",
    "ui.bootstrap"
]).config(function($routeProvider) {
    
    console.log("App Initialized!");
    
    $routeProvider.when("/", {
        templateUrl: "list.html",
        controller: "ListController"
    }).when("/chapters/:idChapter/edit", {
        templateUrl: "edit.html",
        controller: "EditController"
    }).when("/chapters/create", {
        templateUrl: "create.html",
        controller: "CreateController"
    });
});
