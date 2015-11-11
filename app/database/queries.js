
module.exports = {
	selectAssignments:
		'SELECT ' +
			'id, title, due_date, finished ' +
		'FROM assignments ' +
		'ORDER BY finished ASC, due_date ASC',
	
	insertAssignment: 
		'INSERT INTO assignments SET ?',

	toggleAssignment:
		'UPDATE assignments ' +
		'SET finished = finished ^ 1 ' +
	  	'WHERE id = ?'
};