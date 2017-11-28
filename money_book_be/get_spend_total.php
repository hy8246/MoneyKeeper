<?php
require_once("config.php");
	$conn=mysqli_connect(DBHOST,DBUSER,DBPASS,DBNAME);
	$table="spend_data";
	$username_h = $_POST["username"];
	// $username_h = "John";
    $getTable  = "SELECT * FROM spend_data WHERE (username)=('".$username_h."')";
    $result=mysqli_query($conn,$getTable);
    $array = array(); 
   
   if (mysqli_num_rows($result) > 0) 
   {
      // output data of each row
      while($row = mysqli_fetch_assoc($result)) 
      {
        
        $array[] = $row;
        
         
      }
       echo json_encode($array);
  } 
  else 
  {
     
  }
mysqli_close($conn);
?>