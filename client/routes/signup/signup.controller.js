(function() {
	'use strict'

	angular
		.module('app')
		.controller('SignupController', SignupController)
	
	SignupController.$inject = ['$auth', '$state']
	function SignupController($auth, $state) {
		let vm = this

		vm.signup = signup
		vm.email
		vm.password

		function signup() {
			const user = {
				email: vm.email,
				password: vm.password
			}

			$auth.signup(user)
				.then(function(res) {
					$state.go('home')
				})
				.catch(function(res) {
					console.log(res.data)
				})
		}
	}
})()