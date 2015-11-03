/*
 * model:	assignments
 * params: 	assignment_name
 * 			due_date
 *			finished
 */
module.exports = {
	assignment: function(title, due_date, finished) {
		this.title = title;
		this.due_date = due_date;
		this.finished = finished;
	}
};