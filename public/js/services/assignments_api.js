/*
 *	assignments_api.js
 *	This is where angular interacts with node
 *	with a set of promises.
 */

angular.module('homeworkTracker')
	.factory('Assignments', function($http){
		return {
			get : function() {
				return $http.get('/data');
			},
			create : function(assignmentData) {
				return $http.post('/data', assignmentData);
			}//,
			//delete : function(id) {

			//}
		}
	});