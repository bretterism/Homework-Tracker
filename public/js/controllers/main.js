angular.module('homeworkTracker')
	.controller('mainController', ['$scope', '$http', 'Assignments', function($scope, $http, Assignments) {
		$scope.formData = {};

		Assignments.get()
			.success(function(data) {
				$scope.assignments = formatAssignments(data);
			});

		$scope.createAssignment = function() {
			Assignments.create($scope.formData)
				.success(function(data) {
					$scope.formData = {};
					$scope.assignments = formatAssignments(data);
				});
		};
	}]);

var formatAssignments = function(data) {
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
	return assignments;
};

		// $http.get('/data')
		// 	.success(function(data) {
		// 		var assignments = [];
				
		// 		var i, j = data.length;
		// 		for (i = 0; i < j; i++) {
		// 			var item = data[i];
		// 			assignments.push({
		// 				title: item.title,
		// 				due_date: moment(item.due_date).format('MMM DD, YYYY'),
		// 				finished: item.finished ? "Done" : "Not yet"
		// 			});
		// 		}
		// 		$scope.assignments = assignments;
		// 	})
		// 	.error(function(data) {
		// 		console.log('ERRRORORRR ' + data);
		// 	});

		// $scope.processForm = function() {
		// 	$http.post('/data', $scope.formData)
		// 		.success(function(data) {
		// 			// sanitize here.
		// 		});
		// };
