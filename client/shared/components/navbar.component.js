(function() {
	'use strict'
	
	const Navbar = {
		templateUrl: 'client/shared/components/navbar.html',
		controller: NavbarController,
		controllerAs: 'vm'
	}

	NavbarController.$inject = ['$rootScope', '$window', '$auth']
	function NavbarController($rootScope, $window, $auth) {
		let vm = this

		vm.isAuthenticated = isAuthenticated
		vm.logout = logout
		vm.currentUser = $rootScope.currentUser

		function isAuthenticated() {
			return $auth.isAuthenticated()
		}

		function logout() {
			$auth.logout()
			delete $window.localStorage.currentUser
		}
	}

	angular
		.module('app')
		.component('navbar', Navbar)
})()