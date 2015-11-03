var ng_module = angular.module('ng_module', []);

function mainController($scope, $http) {
	$scope.formData = {};

	$http.get('/data')
		.success(function(data) {
			$scope.assignments = data;
		})
		.error(function(data) {
			console.log('ERRRORORRR ' + data);
		});
}