angular
	.module('app')
	.config(config)
	.run(run)

function config($stateProvider, $urlRouterProvider, $authProvider) {
	$stateProvider
		.state('home', {
			url: '/',
			templateUrl: 'client/routes/home/home.html',
			controller: 'HomeController as vm',
		})
		.state('login', {
			url: '/login',
			templateUrl: 'client/routes/login/login.html',
			controller: 'LoginController as vm',
		})
		.state('signup', {
			url: '/signup',
			templateUrl: 'client/routes/signup/signup.html',
			controller: 'SignupController as vm',
		})
		.state('photo', {
			url: '/photo/{id}',
			templateUrl: 'client/routes/photo/photo.html',
			controller: 'PhotoController as vm'
		})
	$urlRouterProvider.otherwise('/')

	$authProvider.loginUrl = 'http://localhost:3000/auth/login'
	$authProvider.signupUrl = 'http://localhost:3000/auth/signup'
	$authProvider.oauth2({
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

function run($rootScope, $window, $auth) {
	if ($auth.isAuthenticated()) {
    $rootScope.currentUser = JSON.parse($window.localStorage.currentUser)
  }
}