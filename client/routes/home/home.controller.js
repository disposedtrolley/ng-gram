(function() {
	'use strict'

	angular
		.module('app')
		.controller('HomeController', HomeController)

	HomeController.$inject = ['$window', '$rootScope', '$auth']
	function HomeController($window, $rootScope, $auth) {
		let vm = this

		vm.isAuthenticated = isAuthenticated
		vm.linkInstagram = linkInstagram


		function isAuthenticated() {
			return $auth.isAuthenticated()
		}

		function linkInstagram() {
			$auth.link('instagram')
				.then(function(res) {
					$window.localStorage.currentUser = JSON.stringify(res.data.user)
					$rootScope.currentUser = JSON.parse($window.localStorage.currentUser)
				})
		}
	}
})()