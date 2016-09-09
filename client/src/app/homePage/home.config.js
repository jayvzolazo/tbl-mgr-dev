MyApp.config(["$routeProvider", "$locationProvider", function ($routeProvider, $locationProvider) {
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
}]);