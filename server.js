/* 
 *	server.js
 *	mysql user: hw_user
 *	mysql pass: pass
 */

var express = require('express');
var app = express();
var http = require('http');
var mysql = require('mysql');
var path = require('path');
var bodyParser = require('body-parser');
var database_conns = require('./app/database/conn');
var port = process.env.PORT || 8081;

app.set('port', port);

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

// Load the routes
require('./app/routes')(app, conn);

http.createServer(app).listen(app.get('port'), function() {
	console.log('Listening on port ' + app.get('port'));
});
//console.log('Listening on port ' + port);

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