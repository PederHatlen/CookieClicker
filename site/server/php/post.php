<?php
	$msg = "";

	function connect(){
        require 'dblogin.php';
        
        // login Details is retrieved from dblogin.php, which is gitignored
        $con = mysqli_connect(constant("DB_HOST"), constant("DB_USERNAME"), constant("DB_PASSWORD"), constant("DB_NAME"));
        // Check connection
        if (!$con) {die("Connection failed: " . mysqli_connect_error());}
    
        //Angi UTF-8 som tegnsett
        $con->set_charset("utf8");
    
        return $con;
    }

	if ($_SERVER["REQUEST_METHOD"] == "POST") {
		if (isset($_POST["cid"]) and isset($_POST["ak"])){
			$klient_id = $_POST["cid"];
			$klikk = $_POST["ak"];
			$navn = $_POST["navn"];
			$tlf = $_POST["tlf"];

			$con = connect();

			$stmt = $con->prepare('INSERT into resultat (klient_id, klikk, navn, tlf) VALUES (?, ?, ?, ?)');
			$stmt->bind_param('iiss', $klient_id, $klikk, $navn, $tlf); // 's' specifies the variable type => 'string'
			$stmt->execute();

			$res = $stmt->get_result();
			if ($res == true) {$msg = "Resultatet ble send inn!";}
			else{$msg = "Noe galt skjedde: ".$res;}

			$con->close();
		}else{$msg = "Ikke nokk data ble sendt med.";}
	}else{$msg = "Gå på en av klientene å spill der, dette er databasen.";}

	if (isset($_GET["url"])) {
		header("Location: ".$_GET["url"]);
		exit;
	}

?>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Document</title>
	<style>
		html{height: 100%;}
		body{
			min-height: 100%;
			font-family: arial, sans-serif;
			display: flex;
			justify-content: center;
			align-items: center;
		}
		h1, body{margin: 0; padding: 0;}
	</style>
</head>
<body>
	<h1><?php echo($msg);?></h1>
</body>
</html>