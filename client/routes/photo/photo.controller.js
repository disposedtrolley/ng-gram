(function() {
	'use strict'

	angular
		.module('app')
		.controller('PhotoController', PhotoController)
	
	PhotoController.$inject = ['$rootScope', '$location', 'API']
	function PhotoController($rootScope, $location, API) {
		let vm = this

		vm.like = like
		vm.hasLiked
		vm.photo

		const mediaId = $location.path().split('/').pop()

		activate()

		function activate() {
			API.getMediaById(mediaId)
				.then(function(media) {
					vm.hasLiked = media.data.user_has_liked
					vm.photo = media.data
				})
		}

		function like() {
			vm.hasLiked = true
			API.likeMedia(mediaId)
				.catch(function(err) {
					swal('Error', err.message, 'error')
				})
		}
	}
})()