<?php
require_once("config.php");
$conn=mysqli_connect(DBHOST,DBUSER,DBPASS,DBNAME);
$db_table="user_info";

$username=$_POST["username"];
$password=$_POST["password"];
$gender=$_POST["gender"];
$dob=$_POST["dob"];
$monthly_income=$_POST["mincome"];

// $username="jackson";
// $password="234567";
// $gender="male";
// $dob="12/12/1999";
// $monthly_income=1000;
$money_plan_activation=0;

$error=mysqli_connect_error();
	if($error != null){
		$output = "<p>Unable to connect to database</p>".$error;
		exit($output);
	}
	else{
			$sql = "SELECT * FROM ".$db_table." WHERE username = '".$username."'";
			$result = mysqli_query($conn,$sql);
			if($result->num_rows > 0){
				echo  ("user_exist");
		}
			else{
				$sql2 = "INSERT INTO `user_info` (`username`,`password`,`gender`,`date_of_birth`,`money_plan_activation`,`monthly_income`) VALUES ('$username','$password','$gender','$dob','$money_plan_activation','$monthly_income');";
				 // echo $sql2;
				 $result2 = mysqli_query($conn,$sql2);
				 
				echo ("success");
			}
	}	
mysqli_close($conn);
?>