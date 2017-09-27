(function() {
	'use strict'

	angular
		.module('app')
		.controller('HomeController', HomeController)

	HomeController.$inject = ['$window', '$rootScope', '$auth', 'API']
	function HomeController($window, $rootScope, $auth, API) {
		let vm = this

		vm.isAuthenticated = isAuthenticated
		vm.linkInstagram = linkInstagram
		vm.photos

		activate()

		function activate() {
			if ($auth.isAuthenticated() && ($rootScope.currentUser && $rootScope.currentUser.username)) {
				API.getFeed()
					.then(function(data) {
						vm.photos = data;
					});
			}
		}

		function isAuthenticated() {
			return $auth.isAuthenticated()
		}

		function linkInstagram() {
			$auth.link('instagram')
				.then(function(res) {
					$window.localStorage.currentUser = JSON.stringify(res.data.user)
					$rootScope.currentUser = JSON.parse($window.localStorage.currentUser)
					API.getFeed()
						.then(function(data) {
							vm.photos = data;
						});
				})
		}
	}
})()