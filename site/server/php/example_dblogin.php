<?php
	$account = "io";

	switch ($account) {
		case 'io':
			define("DB_HOST", host_ip);
			define("DB_USERNAME", username);
			define("DB_PASSWORD", password);
			define("DB_NAME", database);
			break;
		case 'local':
			define("DB_HOST", "localhost:3306");
			define("DB_USERNAME", "root");
			define("DB_PASSWORD", "");
			define("DB_NAME", database);
			break;
	}
?>