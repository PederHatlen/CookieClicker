<?php
	$msg = "";

	function connect(){
        require 'dblogin.php';
        
        // login Details is retrieved from dblogin.php, which is gitignored
        $con = mysqli_connect(constant("DB_HOST"), constant("DB_USERNAME"), constant("DB_PASSWORD"), "binærchatdb");
        // Check connection
        if (!$con) {die("Connection failed: " . mysqli_connect_error());}
    
        //Angi UTF-8 som tegnsett
        $con->set_charset("utf8");
    
        return $con;
    }

	if ($_SERVER["REQUEST_METHOD"] == "POST") {
		if (isset($_POST["klientID"]) and isset($_POST["klikk"])){
			$klient_id = $_POST["klient_id"];
			$klikk = $_POST["klikk"];
			$navn = $_POST["navn"];
			$tlf = $_POST["tlf"];

			$stmt = $con->prepare('INSERT into resultat (klient_id, klikk, navn, tlf) VALUES (?, ?, ?, ?)');
			$stmt->bind_param('iss', $klient_id, $klikk, $navn, $tlf); // 's' specifies the variable type => 'string'
			$stmt->execute();

		}else{$msg = "Ikke nokk data ble sendt med.";}
	}
?>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Document</title>
</head>
<body>
	
</body>
</html>