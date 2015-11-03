/* 
 *	server.js
 *	mysql user: hw_user
 *	mysql pass: pass
 */

var express = require('express');
var app = express();
var mysql = require('mysql');
var path = require('path');
var models = require('./models');

var conn = mysql.createConnection({
	host : 'localhost',
	user : 'hw_user',
	password : 'pass',
	database : 'homework_tracker_db'
});

// Storing static html files in public folder.
app.use(express.static(__dirname + '/public'));

conn.connect(function(err){
	if (err) {
		console.error('mysql: error connecting: ' + err.stack);
		return;
	}

	console.log('mysql: connected as id ' + conn.threadId);
});

//app.use(express.static(__dirname + '/public'));

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