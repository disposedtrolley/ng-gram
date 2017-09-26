angular
	.module('app')
	.config(config)

function config($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state('home', {
			url: '/',
			templateUrl: 'app/routes/home/home.html',
			controller: 'HomeController as vm',
		})
		.state('login', {
			url: '/login',
			templateUrl: 'app/routes/login/login.html',
			controller: 'LoginController as vm',
		})
		.state('signup', {
			url: '/signup',
			templateUrl: 'app/routes/signup/signup.html',
			controller: 'SignupController as vm',
		})
		.state('photo', {
			url: '/photo/{id}',
			templateUrl: 'app/routes/photo/photo.html',
			controller: 'PhotoController as vm'
		})
	$urlRouterProvider.otherwise('/')
}