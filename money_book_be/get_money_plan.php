<?php
require_once("config.php");
	$conn=mysqli_connect(DBHOST,DBUSER,DBPASS,DBNAME);
	$money_plan_table="money_plan";
	$user_info_table="user_info";
	$username=$_POST["username"];
	 // $username="admin";
	$error=mysqli_connect_error();
	if($error != null){
		$output = "<p>Unable to connect to database</p>".$error;
		exit($output);
	}
	else{
		$sql = "SELECT * FROM `money_plan` WHERE `username` = '$username' ;";
		$result = mysqli_query($conn,$sql);
		 
		if($result->num_rows > 0){
			$row =  $result -> fetch_assoc();
			$month_total = $row["monthly_save"];
			$food = $row["food"];
			$commodity = $row["commodity"];
			$clothes = $row["clothes"];
			$luxury = $row["luxury"];
			$utility = $row["utility"];
			$other = $row["other"];
			$status = "ok";
			// echo($food." ".$commodity." ".$clothes." ".$luxury." ".$utility." ".$other." ");
			$array = array("status"=>$status,"month_total"=>$month_total,"food"=>$food,"commodity"=>$commodity,"clothes"=>$clothes,"luxury"=>$luxury,"utility"=>$utility,"other"=>$other);
			echo json_encode($array);
		}else{
			$status = "error";
			$array = array("status"=>$status);
			echo (json_encode($array));
		}
	}
mysqli_close($conn);
?>
