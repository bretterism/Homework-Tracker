
module.exports = {
	selectAssignments:
		'SELECT ' +
			'id, title, due_date, finished ' +
		'FROM assignments ' +
		'ORDER BY finished ASC, due_date ASC',
	
	insertAssignment: 
		'INSERT INTO assignments SET ?',

	finishedAssignment:
		'UPDATE assignments ' +
		'SET finished = 1 ' +
		'WHERE id = ?'
};