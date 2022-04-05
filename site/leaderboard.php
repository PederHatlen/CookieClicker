<?php
	require 'php/dblogin.php'; 	// login Details is retrieved from dblogin.php, which is gitignored
	$con = mysqli_connect(constant("DB_HOST"), constant("DB_USERNAME"), constant("DB_PASSWORD"), constant("DB_NAME"));
	if (!$con) {die("Connection failed: " . mysqli_connect_error());} // Check connection
	$con->set_charset("utf8"); //Angi UTF-8 som tegnsett

	$stmt = $con->prepare('SELECT ROW_NUMBER() OVER (ORDER BY klikk desc) rn, resultat.navn, resultat.klikk, resultat.created_at FROM resultat ORDER BY klikk desc');
	$stmt->execute();
	$leadeboardResults = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);

	$timeResults = $leadeboardResults;
	usort($timeResults, function ($a, $b) {return $b['created_at'] <=> $a['created_at'];});

	$stmt = $con->prepare('SELECT COUNT(DISTINCT resultat.resultat_id) as plays, klienter.navn, klienter.klient_id FROM klienter LEFT JOIN resultat on klienter.klient_id = resultat.klient_id GROUP BY klienter.navn ORDER BY plays desc');
	$stmt->execute();
	$klientStats = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
	
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
	<main><table><?php foreach ($leadeboardResults as $row) {echo("<tr><th>#".$row["rn"]."</th><td>".$row["klikk"]." klikk</td><td>|</td><td>".$row["navn"]."</td></tr>");}?></table></main>
	<div id="newest"><table><?php foreach ($timeResults as $row) {echo("<tr><th>#".$row["rn"]."</th><td>".$row["klikk"]." klikk</td><td>|</td><td>".$row["navn"]."</td><td>".$row["created_at"]."</td></tr>");}?></table></div>
	<div id="clients"><table><?php for ($i = 0; $i < count($klientStats); $i++) {echo("<tr><th>#".($i+1)."</th><th>".$klientStats[$i]["plays"]."</th><td>gang".($klientStats[$i]["plays"] != 1? "er":"")."</td><td>|</td><td>".$klientStats[$i]["navn"]."</td></tr>");}?></table></div>
	<footer><h2>Laget av IMI på Kuben</h2><img src="images/im.svg" alt="IM"></h2></footer>
</body>
<script></script>
</html>