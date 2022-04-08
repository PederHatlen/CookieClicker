<?php 
    require 'dblogin.php'; 	// login Details is retrieved from dblogin.php, which is gitignored
    $con = mysqli_connect(constant("DB_HOST"), constant("DB_USERNAME"), constant("DB_PASSWORD"), constant("DB_NAME"));
    if (!$con) {die("Connection failed: " . mysqli_connect_error());} // Check connection
    $con->set_charset("utf8"); //Angi UTF-8 som tegnsett

    $stmt = $con->prepare('SELECT resultat.navn, resultat.klikk as ak, resultat.created_at as ts, resultat.klient_id as cid FROM resultat');
    $stmt->execute();
    $leadeboardResults = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);

    $stmt = $con->prepare('SELECT klienter.klient_id as cid, klienter.navn FROM klienter');
    $stmt->execute();
    $klientResults = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);

    echo "let leaderboardres = ".json_encode($leadeboardResults).";\nlet klienterres = ".json_encode($klientResults).";";
?>