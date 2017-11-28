window.onload=function(){
	var cancelbtn= document.getElementById("cancel");
	cancelbtn.addEventListener("click",function(){
		document.location.href="main_page.html";
	});

	var myform = document.getElementById('register_form');
	var submit_btn = document.getElementById('submit');
	submit_btn.addEventListener('click', function(event){
		var username = document.getElementById("register_username");
		var password = document.getElementById("register_password");
		var confirm = document.getElementById("register_confirm");
		var month_income = document.getElementById("monthly_income");
		var dob = document.getElementById("register_dob");
		
		var input_name= username.value;
		var input_pw = password.value;
		var input_mincome = month_income.value;
		var input_dob= dob.value;

		var input_gender = document.querySelector('input[name = "gender"]:checked').value;
		console.log(input_gender);

		var ready = true;
		//check username is filled
		if(username.value == ""){
			if(event.cancelable){
				ready = false;
				event.preventDefault();
		}
		username.classList.add("blink");
			
		}else{
			if(username.classList.contains("blink"))
		{
			username.classList.remove("blink");
		}
		}

		//check password is filled
		if(password.value == ""){
			if(event.cancelable){
		event.preventDefault();
		}
			ready=false;
			password.classList.add("blink");
		}else{
			if(password.classList.contains("blink"))
		{
			password.classList.remove("blink");
		}
		}
			console.log(validatedate(dob.value));
		 if(dob.value==""){ //|| !validatedate(dob.value)){
		 		if(event.cancelable){
		 		event.preventDefault();
		 		}
		 		ready=false;
		 		dob.classList.add("blink");
		 	}else{
		 		if(dob.classList.contains("blink"))
		 			{
		 				dob.classList.remove("blink");
		 			}
		 	}

			function validatedate(inputText)  
				  {  
				  var dateformat = /^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/;  
				  // Match the date format through regular expression  
				  if(inputText.match(dateformat))  
				  {   
				  //Test which seperator is used '/' or '-'  
				  var opera1 = inputText.split('/');  
				  var opera2 = inputText.split('-');  
				  var lopera1 = opera1.length;  
				  var lopera2 = opera2.length;  
				  // Extract the string into month, date and year  
				  if (lopera1>1)  
				  {  
				  	var pdate = inputText.split('/');  
				  }  
				  else if (lopera2>1)  
				  {  
				  	var pdate = inputText.split('-');  
				  }  
				  var yy = parseInt(pdate[0]);  
				  var mm  = parseInt(pdate[1]);  
				  var dd = parseInt(pdate[2]);  
				  // Create list of days of a month [assume there is no leap year by default]  
				  	var ListofDays = [31,28,31,30,31,30,31,31,30,31,30,31];  
					  if (mm==1 || mm>2)  
					  {  
					  if (dd>ListofDays[mm-1])  
					  {  
					 
					  return false;  
					  }  
					  }  
					  if (mm==2)  
					  {  
					  var lyear = false;  
					  if ( (!(yy % 4) && yy % 100) || !(yy % 400))   
					  {  
					  lyear = true;  
					  }  
					  if ((lyear==false) && (dd>=29))  
					  {  
					    
					  return false;  
					  }  
					  if ((lyear==true) && (dd>29))  
					  {  
					  
					  return false;  
					  }  
					  }  
					  }  
					  else  
					  {  
					   
					  return false;  
					  } 
					 return true; 
				  }  

		//check confirm password is filled and equal to password
		if(confirm.value == "" || confirm.value!=password.value){
			if(event.cancelable){
		event.preventDefault();
		}
		ready=false;
		confirm.classList.add("blink");
		confirm.value = "";
		confirm.placeholder = "Doesn't match the password";
		}
		else{
			if(confirm.classList.contains("blink"))
		{
			confirm.classList.remove("blink");
			confirm.placeholder = "Confirm Password";
		}
		}
		//check if monthly income is filled
		if(month_income.value == "" || month_income.value<0){
			if(event.cancelable){
		event.preventDefault();
		}
			ready=false;
			month_income.classList.add("blink");
		}else{
			if(month_income.classList.contains("blink"))
		{
			month_income.classList.remove("blink");
		}
		}
		
		if (ready) {
			//send create query
			var data={username: input_name, password: input_pw, gender: input_gender, dob: input_dob, mincome: input_mincome};
			$.post( "http://localhost/money_book_be/register.php", data,
			  function( result ) {
			    console.log(result);
			    if(result == "success"){
			    	window.location.href="main_page.html";
			    }
			    else if(result=="user_exist"){
			    	if(event.cancelable){
					event.preventDefault();
					}
					username.value="";
					alert("username exist");
			    }
			});
			    // console.log(pass.result);
			
		}
	});





}