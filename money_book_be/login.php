<?php
require_once("config.php");
	//$username = "haohaozero";
	//$password = "123456";
	$username = $_POST["username"];
	$password = $_POST["password"];
	//echo $username.$password;
	$valid = true;
	$invalid = false;
	$conn=mysqli_connect(DBHOST,DBUSER,DBPASS,DBNAME);
	$db_table="user_info";
	$error=mysqli_connect_error();
	if($error != null){
		$output = "<p>Unable to connect to database</p>".$error;
		exit($output);
	}
	else{
		//echo "Connect to DB successfully <br/>";
		$sql = "SELECT password FROM ".$db_table." WHERE username = '".$username."'";
		//echo $sql."<br/>";
		$result = mysqli_query($conn,$sql);
		if($result->num_rows > 0){
			$row = $result -> fetch_assoc();
			if($row["password"]==$password){
					//echo $password." is correct.<br/>";
					echo json_encode(array("result" => "success"));
			}
			else{
			echo json_encode(array("result" => "password incorrect"));
			}
		}else{
			echo json_encode(array("result" => "username incorrect"));
		}
	}
	mysqli_close($conn);
?>