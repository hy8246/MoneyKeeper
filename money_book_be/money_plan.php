<?php
	require_once("config.php");
	$conn=mysqli_connect(DBHOST,DBUSER,DBPASS,DBNAME);
	$money_plan_table="money_plan";
	$user_info_table="user_info";

	$username=$_POST["username"];
	$goal=$_POST["goal"];
	$time=$_POST["time"];
	$date=$_POST["date"];

	
	$month_save = $goal/$time;
	// echo ($month_save);
	$error=mysqli_connect_error();
	if($error != null)
	{
		$output = "<p>Unable to connect to database</p>".$error;
		exit($output);
	}
	else
	{
		$sql = "SELECT * FROM ".$user_info_table." WHERE username = '".$username."'";
		$result = mysqli_query($conn,$sql);
		if($result->num_rows > 0)
		{
			$row = $result -> fetch_assoc();
			
			$month_income=$row["monthly_income"];
			
			if($month_income>$month_save)
			{
				$leftover = $month_income-$month_save;
				$piggy_bank = $leftover*0.1;
				$leftover_after = $leftover-$piggy_bank;
				$food = $leftover_after * 0.3;
				$commodity = $leftover_after*0.1;
				$clothes = $leftover_after*0.1;
				$luxury = $leftover_after*0.5;
				$utility = $leftover_after * 0.2;
				$other = $leftover_after *0.2;
				$insert_query = "UPDATE `money_plan` SET `username`='".$username."',"."`month`='".$time."',"."`start_date`='".$date."',"."`goal`='".$goal."',"."`monthly_save`='".$leftover_after."',"."`food`='".$food."',"."`commodity`='".$commodity."',"."`clothes`='".$clothes."',"."`luxury`='".$luxury."',"."`utility`='".$utility."',"."`other`='".$other."',"."`piggy_bank`='".$piggy_bank."'"."WHERE `username`=('".$username."')";

				echo($insert_query);
				
				$result2 = mysqli_query($conn,$insert_query);

			}
		}
		
		}

	mysqli_close($conn);

?>