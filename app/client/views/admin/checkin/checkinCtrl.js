angular.module('reg')
	.controller('AdminCheckinCtrl', [
		'$scope',
		'$state',
		'$stateParams',
		'UserService',
		function ($scope, $state, $stateParams, UserService) {
			$scope.user = false;
			var scanner = new Instascan.Scanner({ video: document.getElementById('preview') });
			scanner.addListener('scan', function (userId) {
				UserService
				.checkIn(userId)
				.success(function (user) {
					$scope.user = user;
					$scope.error = null;
				})
				.error(function (error) {
					$scope.error = error;
				});
			});
			Instascan.Camera.getCameras().then(function (cameras) {
				if (cameras.length > 0) {
					scanner.start(cameras[0]);
				} else {
					console.error('No cameras found.');
				}
			}).catch(function (e) {
				console.error(e);
			});
		}]);











































