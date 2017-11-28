var user;
window.onload = function () 
{
	user = window.location.hash.substring(1);
	var type_Input = document.getElementById("Type");
	var amount_Input = document.getElementById("Amount");
	var category_Input = document.getElementById("Category");
	var transactionDate_Input = document.getElementById("TransactionDate");
	var goal_Input = document.getElementById("Goal");
	var goalTime_Input = document.getElementById("GoalTime");
	var submit_button =document.getElementById("Submit_BTN");
	var plan_button = document.getElementById("Plan_BTN");
	var profile_button = document.getElementById("Profile_BTN");
	var Logout_button = document.getElementById("LogOut_BTN");
	var planform = document.getElementById("MP_InputRetangle");
	var MP_Reset_button = document.getElementById("MP_Reset");
	var IE_Reset_button = document.getElementById("IE_Reset");
	var detail_button = document.getElementById("detail");
	
	//Load the table%chart
	google.charts.load('current', {'packages':['table']});
	google.charts.setOnLoadCallback(drawTable);
	drawPieChart();
	
	move();
	//Load chart$table end=--------------------------------------------------------------------------------
	//UI Preconfig

   if(type_Input.value=="Income")
  {
		var c = document.getElementById("Category");
		c.style.visibility="hidden";

  }
//////////////////////////////////////////////////////////////////////////////////////////////
////////////////////User Input checks/////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
  amount_Input.addEventListener("input",function(event)
  {
  		

  		if(isNaN(amount_Input.value))
  		{
			amount_Input.style.borderColor = "#FF0000"
			amount_Input.style.backgroundColor = "#FF0000"
  		}
  		else
  		{
  			amount_Input.style.borderColor = ""
			amount_Input.style.backgroundColor = ""
  		}
  });

  type_Input.addEventListener("change",function(event)
  {
  	var type = document.getElementById("Type");
	if(type.value=="Income")
	{
		var c = document.getElementById("Category");
		c.style.visibility="hidden";
	}
	if(type.value=="Expense")
	{
		var c = document.getElementById("Category");
		c.style.visibility="visible";
	}
  });
  goal_Input.addEventListener("input",function(event)
  {
  	if((isNaN(goal_Input.value)))
  	{
			goal_Input.style.borderColor = "#FF0000";
			goal_Input.style.backgroundColor = "#FF0000";
  	}
  	else
  	{
  		goal_Input.style.borderColor = "";
		goal_Input.style.backgroundColor = "";
  	}
  });
  goalTime_Input.addEventListener("input",function(event)
  {
  	if((isNaN(goalTime_Input.value)))
  	{
			goalTime_Input.style.borderColor = "#FF0000";
			goalTime_Input.style.backgroundColor = "#FF0000";
  	}
  	else
  	{
  		goalTime_Input.style.borderColor = "";
		goalTime_Input.style.backgroundColor = "";
  	}
  });

 //////////////////////////////////////////////////////////////////////////////////////////////
////////////////////User Input checks END/////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////
////////////////////All Buttons/////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
  detail_button.addEventListener("click",function(event)
  {
  		
  		window.location.href = "money_plan.html#"+user;
  });
  MP_Reset_button.addEventListener("click",function(event)
  {
  		goal_Input.style.borderColor = "";
		goal_Input.style.backgroundColor = "";
		goalTime_Input.style.borderColor = "";
		goalTime_Input.style.backgroundColor = "";
  });
  IE_Reset_button.addEventListener("click",function(event)
  {
  		
  		amount_Input.style.borderColor = "";
		amount_Input.style.backgroundColor = "";
		transactionDate_Input.style.backgroundColor="";
  });
  submit_button.addEventListener("click",function(event)
  {
   		if((isNaN(amount_Input.value))||(amount_Input.value==""))
  		{
			amount_Input.style.borderColor = "#FF0000";
			amount_Input.style.backgroundColor = "#FF0000";
			alert("Please Enter a Vaild Number!!");
  		}
  		else
  		{
  			amount_Input.style.borderColor = "";
			amount_Input.style.backgroundColor = "";
			if(transactionDate_Input.value =="")
			{
				alert("Please select a date for the transaction!!")
				transactionDate_Input.style.backgroundColor="FF0000";
			}
			else
			{
				
				submit_IE();
				move();
				drawPieChart();
    			google.charts.setOnLoadCallback(drawTable); 
			}
			

  		}
    
  });

  plan_button.addEventListener("click",function(event)
  {
    if((isNaN(goal_Input.value))||(goal_Input.value==""))
  	{
			goal_Input.style.borderColor = "#FF0000";
			goal_Input.style.backgroundColor = "#FF0000";
			

		if((isNaN(goalTime_Input.value))||(goalTime_Input.value==""))
  		{
  			
  				goalTime_Input.style.borderColor = "#FF0000";
				goalTime_Input.style.backgroundColor = "#FF0000";
				alert("Please Enter A Vaild Number For Goal AND Months!!");
  			
  		}
  		else
  		{
  			alert("Please Enter A Vaild Number For Goal!!");
  		}
  	}
  	else
  	{
  		if((isNaN(goalTime_Input.value))||(goalTime_Input.value==""))
  		{
  			
  				goalTime_Input.style.borderColor = "#FF0000";
				goalTime_Input.style.backgroundColor = "#FF0000";
				alert("Please Enter A Vaild of Months!!");
  			
  			
  		}
  		else
  		{

  			if((parseInt(goalTime_Input.value))<=0)
  			{
  				alert("Please Enter A Positive Number Of Months!!");
  				goalTime_Input.style.borderColor = "#FF0000";
				goalTime_Input.style.backgroundColor = "#FF0000";
  			}
  			else
  			{
  				goalTime_Input.style.borderColor = "";
				goalTime_Input.style.backgroundColor = "";
			 	
			 	plan();
			 	
			 	
			 	//location.href = "money_plan.html";
  			}
  			
  		}
  			
  	}
    
    
   


  })
  Logout_button.addEventListener("click",function(event)
  {

        location.href = "main_page.html";
   

  })
  profile_button.addEventListener("click",function(event)
  {
    
  })
 ////////////////////////////////////////////////////////////////////////////////////////
////////////////////All Buttons END/////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////All function definition below/////////////
////|||||||||||||||||||||||||||||||||/////////
////vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv/////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function move() 
{
    var elem = document.getElementById("myBar"); 
    var elems = document.getElementById("myProgress");
    var elemss = document.getElementById("NoPlanLabel");
    var width = 0;
    var TD = new Date();
	var CM = (TD.getMonth()+1);
	var check = "2";
	var datas = {checker:check,username:user,cm:CM}
	var sum=0;
	$.ajax({
	      url: "http://localhost/money_book_be/BackEnd.php",
	      type: "GET",
	      async: true,
	      data: datas,
	      cache: false,
	      dataType : "json",
	   	  
	      success: function(returndata)
	      { 
     		var clothes_holder=0;
     		var food_holder=0;
     		var fees_holder=0;
     		var luxury_holder=0;
     		var commodity_holder=0;
     		var other_holder=0;
     		
        	for (var i=0;i<returndata.length;i++)
        	{	
        		switch(returndata[i].category)
        		{
        			case 'Clothes':
        						clothes_holder+=parseInt(returndata[i].amount);
        				break;
        			case 'Food':
        						food_holder+=parseInt(returndata[i].amount);
        				break;
        			case 'Fees':
        						fees_holder+=parseInt(returndata[i].amount);
        				break;
        			case 'Luxury':
        						luxury_holder+=parseInt(returndata[i].amount);
        				break;
        			case 'Commodity':
        						commodity_holder+=parseInt(returndata[i].amount);
        				break;
        			case 'Other':
        						other_holder+=parseInt(returndata[i].amount);
        				break;
        			
        		}
        	}
        	sum=clothes_holder+food_holder+fees_holder+luxury_holder+commodity_holder+other_holder;

        		 var check2 ="3";
          		 var datas2 = {checker:check2,username:user}
          		 var money=0;
		          $.ajax({
			      url: "http://localhost/money_book_be/BackEnd.php",
			      type: "GET",
			      async: true,
			      data: datas2,
			      cache: false,
			      dataType : "json",
			   	  
			      success: function(returndata)
			      { 
		     		
		     		if(returndata==0)
		     		{
		     			elems.style.visibility="hidden";
		     			elemss.style.visibility="visible";
		     		}
		        	for (var i=0;i<returndata.length;i++)
		        	{	
		        		money=parseInt(returndata[i].monthly_save);
		        	}
		        	var id = setInterval(frame, 50);
				    function frame() 
				    {
				        if (width >= 100)
				         {
				            clearInterval(id);
				        } 
				        else 
				        {
				        	
				            	
				            	if(width==(Math.round(sum/money*100)))
				            	{
				            		return;

				            	}
				            	else
				            	{

				            		width++; 
				        	    	elem.style.width = width + '%'; 
				            		
				            		if(width>=0&&width<=60)
				            		{
				            			elem.style.backgroundColor = "#4CAF50";
				            			elem.innerHTML = width * 1 + '%'+'Good!';
				            		}
				            		else if(width>60&&width<=70)
				            		{
				            			elem.style.backgroundColor = "blue";
				            			elem.innerHTML = width * 1 + '%'+'   Control Youself!';
				            		}
				            		else if(width>70&&width<=84)
				            		{
				            			elem.style.backgroundColor = "orange";
				            			elem.innerHTML = width * 1 + '%'+'   Warning!';
				            		}
				            		else if(width>84&&width<=99)
				            		{
				            			elem.style.backgroundColor = "red";
				            			elem.innerHTML = width * 1 + '%'+'   StayHome!';
				            		}
				            		else
				            		{
				            			elem.style.backgroundColor = "red";
				            			elem.innerHTML = width * 1 + '%'+'   OverSpend!';
				            		}

				            	}

				        }
				    }
		        	
				  },
				  error: function(j,t,e)
				  {
					console.log(j); 
					width=0;
				  }
				});
        	
			},
			 error: function(j,t,e)
			{
				//console.log(j); 
			}
		});
	


    
    
}
function plan()
{
	
    var today= new Date();
   	var today_date= today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  //checker 1 means to insert transaction into database
    var datas = {username:user,goal: goal_Input.value,time: goalTime_Input.value,date: today_date}
    
    $.ajax({
      url: "http://localhost/money_book_be/money_plan.php",
      type: "POST",
      async: true,
      data: datas,
      cache: false,
      success: function(data)
      {
      		move();
      		
      },
      error: function(e,j,t)
      {  
        console.log(e);
        
      }
    })
 }     


function submit_IE()
{
    var check = "1";
   
    
  //checker 1 means to insert transaction into database
    var datas = {checker:check,username:user,type: type_Input.value,category:category_Input.value,amount:amount_Input.value,date_of_spend: transactionDate_Input.value}
    $.ajax({
      url: "http://localhost/money_book_be/BackEnd.php",
      type: "POST",
      async: true,
      data: datas,
      cache: false,
      dataType: "json",
      success: function(data)
      {
          var resultObj = JSON.parse(data);
          console.log(resultObj);  
      },
      error: function(e){
        
        console.log(e);
      }
    })
  }     
}

function drawPieChart()
{
	var TD = new Date();
	var CM = (TD.getMonth()+1);
	var check = "2";
	
	var datas = {checker:check,username:user,cm:CM}
	$.ajax({
	      url: "http://localhost/money_book_be/BackEnd.php",
	      type: "GET",
	      async: true,
	      data: datas,
	      cache: false,
	      dataType : "json",
	   	  
	    success: function(returndata)
	    { 
	    	
	      	if(returndata==0)
	      	{

	      		var chart = new CanvasJS.Chart("piechart",
				{
				    title:{ text: "Current Month Summary"},
				    exportFileName: "Pie Chart",
				    exportEnabled: true,
				    animationEnabled: true,
				    legend:
				    {
				      verticalAlign: "bottom",
				      horizontalAlign: "center"
				    },

				    data: 
				    [{       
				      type: "pie",
				      showInLegend: true,
				      toolTipContent: "{name}: <strong>{y}%</strong>",
				      indexLabel: "{name} {y}%",
				      dataPoints: 
				      [
				        {  y: 100, name: "No Date Available"}
				       
				     ]}],
			    
			  	});
			  	chart.render();
	      	}
	      	else
	      	{
	     		var clothes_holder=0;
	     		var food_holder=0;
	     		var fees_holder=0;
	     		var luxury_holder=0;
	     		var commodity_holder=0;
	     		var other_holder=0;
	     		var sum=0;
	        	for (var i=0;i<returndata.length;i++)
	        	{
	        		
	        		switch(returndata[i].category)
	        		{
	        			case 'Clothes':
	        						clothes_holder+=parseInt(returndata[i].amount);
	        				break;
	        			case 'Food':
	        						food_holder+=parseInt(returndata[i].amount);
	        				break;
	        			case 'Fees':
	        						fees_holder+=parseInt(returndata[i].amount);
	        				break;
	        			case 'Luxury':
	        						luxury_holder+=parseInt(returndata[i].amount);
	        				break;
	        			case 'Commodity':
	        						commodity_holder+=parseInt(returndata[i].amount);
	        				break;
	        			case 'Other':
	        						other_holder+=parseInt(returndata[i].amount);
	        				break;
	        			

	        		}

	        		
	        	}
        		sum=clothes_holder+food_holder+fees_holder+luxury_holder+commodity_holder+other_holder;
	        	var chart = new CanvasJS.Chart("piechart",
				{
				    title:{ text: "Current Month Summary"},
				    exportFileName: "Pie Chart",
				    exportEnabled: true,
				    animationEnabled: true,
				    legend:
				    {
				      verticalAlign: "bottom",
				      horizontalAlign: "center"
				    },

				    data: 
				    [{       
				      type: "pie",
				      showInLegend: true,
				      toolTipContent: "{name}: <strong>{y}%</strong>",
				      indexLabel: "{name} {y}%",
				      dataPoints: 
				      [
				        {  y: Math.round((food_holder/sum*100)), name: "Food", exploded: true},
				        {  y: Math.round((commodity_holder/sum*100)), name: "Commodity"},
				        {  y: Math.round((clothes_holder/sum*100)), name: "Clothes"},
				        {  y: Math.round((luxury_holder/sum*100)), name: "Luxury"},
				        {  y: Math.round((fees_holder/sum*100)),  name: "Utility Fee"},
				        {  y: Math.round((other_holder/sum*100)),  name: "Others"}
				      ]}],
				    
				  });
				  chart.render();
			}
		},
		error: function(j,t,e)
		{
				console.log(j); 
		}
	});

}
function drawTable() 
{
	
		var check = "0";
		
		var datas = {checker:check,username:user}
		var data = new google.visualization.DataTable();
		var table = new google.visualization.Table(document.getElementById('tablelist'));
        table.draw(data, {showRowNumber: true, width: '89%', height: '400px'});
	    data.addColumn('string', 'Type');
        data.addColumn('string', 'Amount');
        data.addColumn('string', 'Category');
        data.addColumn('string', 'Date');
        table.draw(data, {showRowNumber: true, width: '89%', height: '400px'});
		$.ajax({
	      url: "http://localhost/money_book_be/BackEnd.php",
	      type: "GET",
	      async: true,
	      data: datas,
	      cache: false,
	      dataType : "json",
	   	  
	      success: function(returndata)
	      { 

	      	var data = new google.visualization.DataTable();
	      	var col_type;
	      	var col_amount;
	      	var col_category;
	      	var col_date;
       		data.addColumn('string', 'Type');
        	data.addColumn('string', 'Amount');
        	data.addColumn('string', 'Category');
        	data.addColumn('string', 'Date');
        	
        	for (var i=0;i<returndata.length;i++)
        	{
        		col_type=returndata[i].type;
        		col_amount=returndata[i].amount;
        		col_category=returndata[i].category;
        		col_date=returndata[i].date_of_spend;
        		data.addRows([[col_type,"$"+col_amount,col_category ,col_date]]);	
        		
        	}
        	
        	var table = new google.visualization.Table(document.getElementById('tablelist'));
        	table.draw(data, {showRowNumber: true, width: '89%', height: '400px'});
	      },
	      error: function(j,t,e)
	      {
	        
	        //console.log(t);
	      
	      }
    });
        
}
