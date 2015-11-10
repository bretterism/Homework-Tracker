angular.module('homeworkTracker')
	.controller('mainController', ['$scope', '$http', 'Assignments', function($scope, $http, Assignments) {
		$scope.formData = {};

		Assignments.get()
			.success(function(data) {
				$scope.assignments = data;
			});

		$scope.createAssignment = function() {
			Assignments.create($scope.formData)
				.success(function(data) {
					$scope.formData = {};
					$scope.assignments = data;
				});
		};

		$scope.finishAssignment = function(assignment_id) {
			Assignments.finish(assignment_id)
				.success(function(data) {
					$scope.assignments = data;
				});
		};

	}]);