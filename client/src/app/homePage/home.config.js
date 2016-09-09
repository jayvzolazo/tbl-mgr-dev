(function() {
	"use strict";

	function Configuration($routeProvider, $locationProvider) {
		$locationProvider.html5Mode({
			enabled: true,
			requireBase: false
		});

		$routeProvider
			.when("/", {
				templateUrl: "homePage/home.tpl.html",
				controller: "HomeController",
				controllerAs: "vm"
			});
	}

	Configuration.$inject = ["$routeProvider", "$locationProvider"];

	angular
		.module("MyApp")
		.config(Configuration);
})();