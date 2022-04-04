<?php
	require 'php/dblogin.php'; 	// login Details is retrieved from dblogin.php, which is gitignored
	$con = mysqli_connect(constant("DB_HOST"), constant("DB_USERNAME"), constant("DB_PASSWORD"), constant("DB_NAME"));
	if (!$con) {die("Connection failed: " . mysqli_connect_error());} // Check connection
	$con->set_charset("utf8"); //Angi UTF-8 som tegnsett

	$stmt = $con->prepare('SELECT navn, klikk, created_at FROM resultat ORDER BY klikk desc');
	$stmt->execute();
	$numResults = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
	
?>
<!DOCTYPE html>
<html lang="no">
<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Leaderboard</title>
	<link rel="stylesheet" href="css/leaderboardStyle.css">
</head>
<body>
	<header><img src="images/Pointer.svg" alt="Pointer"><h1>Leaderboard</h1></header>
	<main>
		<table>
			<?php
			for ($i=0; $i < count($numResults); $i++) {echo("<tr><th>#".($i+1)."</th><td>$numResults[$i][klikk] klikk</td><td>|</td><td>$numResults[$i][navn]</td></tr>");}
			?>
		</table>
	</main>
	<div id="newest"></div>
	<div></div>
	<footer><h2>Laget av IMI på Kuben</h2><img src="images/im.svg" alt="IM"></h2></footer>
</body>
<script></script>
</html>