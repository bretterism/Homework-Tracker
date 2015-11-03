USE homework_tracker_db;

DROP TABLE assignments;

CREATE TABLE assignments(
	id 			INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	title 		VARCHAR(50) NOT NULL,
	due_date	DATETIME NOT NULL,
	finished	BOOL DEFAULT 0
);