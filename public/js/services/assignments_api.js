/*
 *	assignments_api.js
 *	This is where angular interacts with node
 *	with a set of promises.
 */

var app = angular.module('homeworkTracker');

app.factory('Assignments', function($http){
	return {
		get : function() {
			return $http.get('/data');
		},
		create : function(assignmentData) {
			return $http.post('/data', assignmentData);
		},
		finish: function(assignment_id) {
			return $http.put('/data/' + assignment_id);
		}
	}
});