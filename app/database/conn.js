/*
 * conn.js
 * Database connection credentials.
 * Don't share with the outside world!
 */

module.exports = {
	// host : 'localhost',
	// user : 'hw_user',
	// password : 'pass',
	// database : 'homework_tracker_db'
	host     : process.env.RDS_HOSTNAME,
	user     : process.env.RDS_USERNAME,
	password : process.env.RDS_PASSWORD,
	port     : process.env.RDS_PORT
};