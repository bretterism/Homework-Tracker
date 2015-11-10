var Assignment = require('./models/assignments');
var models = require('./models/assignments');


module.exports = function(app, conn) {
	app.get('/', function(req, res) {
		res.sendFile('index.html');
		// It will find and locate index.html from public folder
	});

	app.get('/data', function(req, res) {
		conn.query('SELECT title, due_date, finished FROM assignments', function(error, results, fields) {
			var i, j = results.length;
			var a = [];
			for (i = 0; i < j; i++) {
				a.push(new models.assignment(results[i].title, results[i].due_date, results[i].finished));
			}
			
			res.send(a);
		});
	});

	app.post('/data', function(req, res) {
			var vals = { title: req.body.title, 
						 due_date: req.body.due_date, 
						 finished: false
					   };

			var query = conn.query('INSERT INTO assignments SET ?', vals, function(err, result) {
				if (err) {
					console.log('Mysql: Insert post data failed.');
				}
			});

			conn.query('SELECT title, due_date, finished FROM assignments', function(error, results, fields) {
			var i, j = results.length;
			var a = [];
			for (i = 0; i < j; i++) {
				a.push(new models.assignment(results[i].title, results[i].due_date, results[i].finished));
			}
			
			res.send(a);
		});
		});
};