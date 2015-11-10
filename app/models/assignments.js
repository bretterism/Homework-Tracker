/*
 * model:	assignments
 * params: 	assignment_name
 * 			due_date
 *			finished
 */

var moment = require('moment');
module.exports = {
	assignment: function(id, title, due_date, finished) {
		this.id = id;
		this.title = title;
		this.due_date = due_date;
		this.finished = finished;
	},

	formatAssignments: function(data) {
		var assignments = [];
		var i, j = data.length;
		for (i = 0; i < j; i++) {
			var item = data[i];
			assignments.push({
				id: item.id,
				title: item.title,
				due_date: moment(item.due_date).format('MMM DD, YYYY'),
				finished: item.finished
			});
		}

		return assignments;
	}
};