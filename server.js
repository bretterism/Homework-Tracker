/* 
 *	server.js
 *	mysql user: hw_user
 *	mysql pass: pass
 */

var express = require('express');
var app = express();
var mysql = require('mysql');
var path = require('path');
var bodyParser = require('body-parser');
var models = require('./app/models/assignments');
var database_conns = require('./app/database/conn');

app.use(bodyParser.json());  
// Storing static html files in public folder.
app.use(express.static(__dirname + '/public'));

// Database Connections
var conn = mysql.createConnection(database_conns);

conn.connect(function(err){
	if (err) {
		console.error('mysql: error connecting: ' + err.stack);
		return;
	}

	console.log('mysql: connected as id ' + conn.threadId);
});

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
	console.log(req.body);
	var vals = { title: req.body.title, 
				 due_date: req.body.due_date, 
				 finished: false
			   };

	var query = conn.query('INSERT INTO assignments SET ?', vals, function(err, result) {
		if (err) {
			console.log('Mysql: Insert post data failed.');
		}
	});
});

app.listen(3000);
console.log('Listening on port 3000.');

// killing the process
process.on('SIGINT', function() {
	console.log('\nending server connections.');
	
	conn.end(function(err) {
		if (err) {
			console.error('mysql: there was an error ending connection to db with id ' + conn.threadId);
		}
		console.log('mysql: connection ' + conn.threadId + ' ended successfully.');
		process.exit();
	});
});