(function() {
	'use strict'

	angular
		.module('app')
		.directive('serverError', serverError)
	
	function serverError() {
		const directive = {
			restrict: 'A',
			require: 'ngModel',
			link: linkFunc
		}

		function linkFunc(scope, elem, attrs, ctrl) {
			elem.on('keydown', function() {
				ctrl.$setValidity('server', true)
			})
		}

		return directive
	}
})()