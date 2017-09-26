(function() {
	'use strict'

	angular
		.module('app')
		.controller('SignupController', SignupController)
	
	SignupController.$inject = ['$auth']
	function SignupController($auth) {
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
				.catch(function(res) {
					console.log(res.data)
				})
		}
	}
})()