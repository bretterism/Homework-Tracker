angular.module('homeworkTracker')
	.controller('mainController', ['$scope', '$http', 'Assignments', function($scope, $http, Assignments) {
		$scope.formData = {};
		$scope.assignments = [];
		$scope.finishedAssignments = [];

		Assignments.get()
			.success(function(data) {
				$scope.assignments = [];
				$scope.finishedAssignments = [];
				var i, j = data.length;
				for (i = 0; i < j; i++) {
					var assignment = data[i];
					if (assignment.finished) {
						$scope.finishedAssignments.push(assignment);
					}
					else {
						$scope.assignments.push(assignment);
					}
				};
			});

		$scope.createAssignment = function() {
			Assignments.create($scope.formData)
				.success(function(data) {
					$scope.assignments = [];
					$scope.finishedAssignments = [];
					$scope.formData = {};
					var i, j = data.length;
					for (i = 0; i < j; i++) {
						var assignment = data[i];
						if (assignment.finished) {
							$scope.finishedAssignments.push(assignment);
						}
						else {
							$scope.assignments.push(assignment);
						}
					};
				});
		};

		$scope.toggleAssignment = function(assignment_id) {
			Assignments.finish(assignment_id)
				.success(function(data) {
					$scope.assignments = [];
					$scope.finishedAssignments = [];
					var i, j = data.length;
					for (i = 0; i < j; i++) {
						var assignment = data[i];
						if (assignment.finished) {
							$scope.finishedAssignments.push(assignment);
						}
						else {
							$scope.assignments.push(assignment);
						}
					};
				});
		};
	}]);