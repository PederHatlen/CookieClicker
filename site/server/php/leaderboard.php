<?php
	require 'dblogin.php'; 	// login Details is retrieved from dblogin.php, which is gitignored
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
	$clients = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
?>
<!DOCTYPE html>
<html lang="no">
<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Leaderboard</title>
	<link rel="shortcut icon" href="../images/im.svg" type="image/x-icon">
	<link rel="stylesheet" href="../css/leaderboardStyle.css">
</head>
<body>
	<header>
		<h1 class="horizontal"><img src="../images/Pointer.svg" alt="Pointer">Leaderboard</h1>
		<img src="../images/kuben_im.svg" alt="Kuben IM">
	</header>
	<div id="main">
		<h2>Toppliste</h2>
		<table><tbody><?php foreach ($leadeboardResults as $row) {echo("<tr><th class=\"placement\">#".$row["rn"]."</th><td class=\"num\">".$row["klikk"]."</td><td>".$row["navn"]."</td></tr>");}?></tbody></table>
	</div>
	<div id="newest">
		<h2>Nyeste</h2>
		<table><tbody><?php foreach ($timeResults as $row) {echo("<tr><th class=\"placement\">#".$row["rn"]."</th><td class=\"num\">".$row["klikk"]."</td><td>".$row["navn"]."</td>");}?></tbody></table>
	</div>
	<div id="client">
		<h2>Klienter</h2>
		<table><tbody><?php for ($i=0;$i<count($clients);$i++) {echo("<tr><th class=\"placement\">#".($i+1)."</th><td class=\"num\">".$clients[$i]["plays"]."</td><td>".$clients[$i]["navn"]."</td></tr>");}?></tbody></table>
	</div>
</body>
</html>