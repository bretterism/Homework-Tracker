var ng_module = angular.module('ng_module', []);

function mainController($scope, $http) {
	$scope.formData = {};

	$http.get('/data')
		.success(function(data) {
			var assignments = [];
			
			var i, j = data.length;
			for (i = 0; i < j; i++) {
				var item = data[i];
				assignments.push({
					title: item.title,
					due_date: moment(item.due_date).format('MMM DD, YYYY'),
					finished: item.finished ? "Done" : "Not yet"
				});
			}
			$scope.assignments = assignments;
		})
		.error(function(data) {
			console.log('ERRRORORRR ' + data);
		});
}