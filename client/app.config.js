angular
	.module('app')
	.config(config)

function config($stateProvider, $urlRouterProvider, $authProvider) {
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

	$authProvider
		.loginUrl = 'http://localhost:3000/auth/login'
		.signupUrl = 'http://localhost:3000/auth/signup'
		.oauth2({
			name: 'instagram',
			url: 'http://localhost:3000/auth/instagram',
			redirectUri: 'http://localhost:8000',
			clientId: 'd949fcc019f249eb9ac8cf68693e5034',
			requiredUrlParams: ['scope'],
			scope: ['likes'],
			scopeDelimiter: '+',
			authorizationEndpoint: 'https://api.instagram.com/oauth/authorize'
		})
}