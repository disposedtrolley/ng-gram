(function() {
	'use strict'

	angular
		.module('app')
		.controller('LoginController', LoginController)

	LoginController.$inject = ['$window', '$location', '$rootScope', '$auth']
	function LoginController($window, $location, $rootScope, $auth) {
		let vm = this

		vm.errorMessage
		vm.instagramLogin = instagramLogin
		vm.emailLogin = emailLogin
		vm.email
		vm.password

		function instagramLogin() {
			$auth.authenticate('instagram')
				.then(function(res) {
					$window.localStorage.currentUser = JSON.stringify(res.data.user)
					$rootScope.currentUser = JSON.parse($window.localStorage.currentUser)
				})
				.catch(function(res) {
					console.log(res.data)
				})
		}

		function emailLogin() {
			$auth.login({
				email: vm.email,
				password: vm.password
			})
				.then(function(res) {
					$window.localStorage.currentUser = JSON.stringify(res.data.user)
					$rootScope.currentUser = JSON.parse($window.localStorage.currentUser)
				})
				.catch(function(res) {
					vm.errorMessage = {}
					angular.forEach(res.data.message, function(message, field) {
						vm.loginForm[field].$setValidity('server', false)
						vm.errorMessage[field] = res.data.message[field]
					})
				})
		}
	}
})()