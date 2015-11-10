var Assignment = require('./models/assignments');
var models = require('./models/assignments');
var queries = require('./database/queries');


module.exports = function(app, conn) {
	app.get('/', function(req, res) {
		res.sendFile('index.html');
		// It will find and locate index.html from public folder
	});

	app.get('/data', function(req, res) {
		conn.query(queries.selectAssignments, function(error, results, fields) {
			var i, j = results.length;
			var a = [];
			for (i = 0; i < j; i++) {
				a.push(new models.assignment(results[i].id, results[i].title, results[i].due_date, results[i].finished));
			}

			res.send(models.formatAssignments(a));
		});
	});

	app.post('/data', function(req, res) {
			var vals = { title: req.body.title, 
						 due_date: req.body.due_date, 
						 finished: false
					   };

			var query = conn.query(queries.insertAssignment, vals, function(err, result) {
				if (err) {
					console.log('Mysql: Insert post data failed.');
				}
			});

			conn.query(queries.selectAssignments, function(error, results, fields) {
				var i, j = results.length;
				var a = [];
				for (i = 0; i < j; i++) {
					a.push(new models.assignment(results[i].id, results[i].title, results[i].due_date, results[i].finished));
				}
				
				res.send(models.formatAssignments(a));
			});
		});

	app.put('/data/:assignment_id', function(req, res) {
		var assignment_id = req.params.assignment_id;

		conn.query(queries.finishedAssignment, assignment_id);

		conn.query(queries.selectAssignments, function(error, results, fields) {
			var i, j = results.length;
			var a = [];
			for (i = 0; i < j; i++) {
				a.push(new models.assignment(results[i].id, results[i].title, results[i].due_date, results[i].finished));
			}
			
			res.send(models.formatAssignments(a));
		});
	});
};