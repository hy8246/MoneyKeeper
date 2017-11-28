
window.onload = function () 
{
  var username = window.location.hash.substring(1);
  console.log(username);

  var food, commodity, clothes, luxury, utility, other,total;
  // var input_name = "John";
  var input_name = username;

  var exit_btn = document.getElementById("exit_btn");

  exit_btn.addEventListener("click",function(){
      console.log("listen to the listner");
      window.location.href = "Dashboard.html#"+input_name;
  });

  console.log(input_name);
  var clothes_holder=0;
    var food_holder=0;
    var fees_holder=0;
    var luxury_holder=0;
    var commodity_holder=0;
    var other_holder=0;
    var sum=0; 
  var data={username: input_name};
      $.post( "http://localhost/money_book_be/get_money_plan.php", data,
        function( result ) {
          var pass = JSON.parse(result);
          if(pass.status == "ok"){
          food = parseInt(pass.food);
          commodity = parseInt(pass.commodity);
          clothes = parseInt(pass.clothes);
          luxury = parseInt(pass.luxury);
          utility = parseInt(pass.utility);
          other = parseInt(pass.other);
          total = parseInt(pass.month_total);
          var dat2s= {username:input_name};
          $.post( "http://localhost/money_book_be/get_spend_total.php", data,
        function( result ) {
          var returndata = JSON.parse(result);
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
          // console.log(food_holder);
          // console.log(clothes_holder);
          // console.log(fees_holder);
          // console.log(luxury_holder);
          // console.log(commodity_holder);
          // console.log(other_holder);
          // console.log(sum);
            var total_left = total-sum;
            if (total_left<0)
            {
              total_left=0;
            }
            console.log("total_left:"+total_left);
            //Draw the graph
            var chart = new CanvasJS.Chart("chartContainer",
            {

              title:{
                text: "Summary of Spends"
              },
              exportFileName: "Pie Chart",
              exportEnabled: true,
                          animationEnabled: true,
              legend:{
                verticalAlign: "center",
                horizontalAlign: "left"
              },

              data: [
              {       
                type: "pie",
                showInLegend: true,
                toolTipContent: "{name}: <strong>{y}</strong>",
                indexLabel: "{name} {y}",
                dataPoints: [
                  {  y: sum, name: "Used", exploded: true},
                  {  y: total_left, name: "Remain of the Month"}
                ]
            }
            ],creditText:{
              text:""
            }
            });
            chart.render();
            //graph for food category
            var food_left = food-food_holder;
            if (food_left<0)
            {
              food_left=0;
            }
            var chart2 = new CanvasJS.Chart("chartContainer2",
            {
              title:{
                text: "Summary of Food Category"
              },
              exportFileName: "Pie Chart",
              exportEnabled: true,
                          animationEnabled: true,
              legend:{
                verticalAlign: "center",
                horizontalAlign: "right"
              },

              data: [
              {       
                type: "pie",
                showInLegend: true,
                toolTipContent: "{name}: <strong>{y}</strong>",
                indexLabel: "{name} {y}",
                dataPoints: [
                  {  y: food_holder, name: "Used", exploded: true},
                  {  y: food_left, name: "Remain of the Month"}
                ]
            }
            ],creditText:{
              text:""
            }
            });
            chart2.render();
            //graph commodity 
            var commodity_left = commodity-commodity_holder;
            if(commodity_left<0)
            {
              commodity_left = 0;
            }

              var chart3 = new CanvasJS.Chart("chartContainer3",
            {
              title:{
                text: "Summary of Commodity Spending"
              },
              exportFileName: "Pie Chart",
              exportEnabled: true,
                          animationEnabled: true,
              legend:{
                verticalAlign: "center",
                horizontalAlign: "right"
              },

              data: [
              {       
                type: "pie",
                showInLegend: true,
                toolTipContent: "{name}: <strong>{y}</strong>",
                indexLabel: "{name} {y}",
                dataPoints: [
                  {  y: commodity_holder, name: "Used", exploded: true},
                  {  y: commodity_left, name: "Remain of the Month"}
                ]
            }
            ],creditText:{
              text:""
            }
            });
            chart3.render();

            // graph clothes portion
            var clothes_left = clothes - clothes_holder;
            if(clothes_left<0)
            {
              clothes_left = 0;
            }
            var chart4 = new CanvasJS.Chart("chartContainer4",
            {
              title:{
                text: "Summary of Clothes Spending"
              },
              exportFileName: "Pie Chart",
              exportEnabled: true,
                          animationEnabled: true,
              legend:{
                verticalAlign: "center",
                horizontalAlign: "right"
              },

              data: [
              {       
                type: "pie",
                showInLegend: true,
                toolTipContent: "{name}: <strong>{y}</strong>",
                indexLabel: "{name} {y}",
                dataPoints: [
                  {  y: clothes_holder, name: "Used", exploded: true},
                  {  y: clothes_left, name: "Remain of the Month"}
                ]
            }
            ],creditText:{
              text:""
            }
            });
            chart4.render();
            //utility graph
            var luxury_left = luxury - luxury_holder;
            if(luxury_left <0){
              luxury_left = 0;
            }
            var chart5 = new CanvasJS.Chart("chartContainer5",
            {
              title:{
                text: "Summary of Luxury Spending"
              },
              exportFileName: "Pie Chart",
              exportEnabled: true,
                          animationEnabled: true,
              legend:{
                verticalAlign: "center",
                horizontalAlign: "right"
              },

              data: [
              {       
                type: "pie",
                showInLegend: true,
                toolTipContent: "{name}: <strong>{y}</strong>",
                indexLabel: "{name} {y}",
                dataPoints: [
                  {  y: luxury_holder, name: "Used", exploded: true},
                  {  y: luxury_left, name: "Remain of the Month"}
                ]
            }
            ],creditText:{
              text:""
            }
            });
            chart5.render();

            var utility_left = utility - fees_holder;
            if(utility_left<0){
              utility_left = 0;
            }
            var chart6 = new CanvasJS.Chart("chartContainer6",
            {
              title:{
                text: "Summary of Utility Fee Spending"
              },
              exportFileName: "Pie Chart",
              exportEnabled: true,
                          animationEnabled: true,
              legend:{
                verticalAlign: "center",
                horizontalAlign: "right"
              },

              data: [
              {       
                type: "pie",
                showInLegend: true,
                toolTipContent: "{name}: <strong>{y}</strong>",
                indexLabel: "{name} {y}",
                dataPoints: [
                  {  y: fees_holder, name: "Used", exploded: true},
                  {  y: utility_left, name: "Remain of the Month"}
                ]
            }
            ],creditText:{
              text:""
            }
            });
            chart6.render();

              var other_left = other - other_holder;
              if(other_left<0){
                other_left =0;
              }
              var chart7 = new CanvasJS.Chart("chartContainer7",
            {
              title:{
                text: "Summary of Utility Fee Spending"
              },
              exportFileName: "Pie Chart",
              exportEnabled: true,
                          animationEnabled: true,
              legend:{
                verticalAlign: "center",
                horizontalAlign: "right"
              },

              data: [
              {       
                type: "pie",
                showInLegend: true,
                toolTipContent: "{name}: <strong>{y}</strong>",
                indexLabel: "{name} {y}",
                dataPoints: [
                  {  y: other_holder, name: "Used", exploded: true},
                  {  y: other_left, name: "Remain of the Month"}
                ]
            }
            ],creditText:{
              text:""
            }
            });
            chart7.render();

            });
            
        }
      });

       

    
      

  
  
  // var chart4 = new CanvasJS.Chart("chartContainer4",
  // {
  //   title:{
  //     text: "Summary of Spends"
  //   },
  //   exportFileName: "Pie Chart",
  //   exportEnabled: true,
  //               animationEnabled: true,
  //   legend:{
  //     verticalAlign: "bottom",
  //     horizontalAlign: "center"
  //   },

  //   data: [
  //   {       
  //     type: "pie",
  //     showInLegend: true,
  //     toolTipContent: "{name}: <strong>{y}%</strong>",
  //     indexLabel: "{name} {y}%",
  //     dataPoints: [
  //       {  y: 35, name: "Foodh", exploded: true},
  //       {  y: 20, name: "Commodity"},
  //       {  y: 18, name: "Clothes"},
  //       {  y: 15, name: "Luxury"},
  //       {  y: 5,  name: "Utility Fee"},
  //       {  y: 7,  name: "Other"}
  //     ]
  // }
  // ],creditText:{
  //   text:""
  // }
  // });
  // chart4.render();
  
  // var chart5 = new CanvasJS.Chart("chartContainer5",
  // {
  //   title:{
  //     text: "Summary of Spends"
  //   },
  //   exportFileName: "Pie Chart",
  //   exportEnabled: true,
  //               animationEnabled: true,
  //   legend:{
  //     verticalAlign: "bottom",
  //     horizontalAlign: "center"
  //   },

  //   data: [
  //   {       
  //     type: "pie",
  //     showInLegend: true,
  //     toolTipContent: "{name}: <strong>{y}%</strong>",
  //     indexLabel: "{name} {y}%",
  //     dataPoints: [
  //       {  y: 35, name: "Foodh", exploded: true},
  //       {  y: 20, name: "Commodity"},
  //       {  y: 18, name: "Clothes"},
  //       {  y: 15, name: "Luxury"},
  //       {  y: 5,  name: "Utility Fee"},
  //       {  y: 7,  name: "Other"}
  //     ]
  // }
  // ],creditText:{
  //   text:""
  // }
  // });
  // chart5.render();
  
  // var chart6 = new CanvasJS.Chart("chartContainer6",
  // {
  //   title:{
  //     text: "Summary of Spends"
  //   },
  //   exportFileName: "Pie Chart",
  //   exportEnabled: true,
  //               animationEnabled: true,
  //   legend:{
  //     verticalAlign: "bottom",
  //     horizontalAlign: "center"
  //   },

  //   data: [
  //   {       
  //     type: "pie",
  //     showInLegend: true,
  //     toolTipContent: "{name}: <strong>{y}%</strong>",
  //     indexLabel: "{name} {y}%",
  //     dataPoints: [
  //       {  y: 35, name: "Foodh", exploded: true},
  //       {  y: 20, name: "Commodity"},
  //       {  y: 18, name: "Clothes"},
  //       {  y: 15, name: "Luxury"},
  //       {  y: 5,  name: "Utility Fee"},
  //       {  y: 7,  name: "Other"}
  //     ]
  // }
  // ],creditText:{
  //   text:""
  // }
  // });
  // chart6.render();

  
  // var linechart = new CanvasJS.Chart("chartContainers",
  //   {
  //     zoomEnabled: false,
  //                       animationEnabled: true,
  //     title:{
  //       text: "Income Vs Spends"
  //     },
  //     axisY2:{
  //       valueFormatString:"0.0 bn",
        
  //       maximum: 1.2,
  //       interval: .2,
  //       interlacedColor: "#F5F5F5",
  //       gridColor: "#D7D7D7",      
  //       tickColor: "#D7D7D7"                
  //     },
  //                       theme: "theme2",
  //                       toolTip:{
  //                               shared: true
  //                       },
  //     legend:{
  //       verticalAlign: "bottom",
  //       horizontalAlign: "center",
  //       fontSize: 15,
  //       fontFamily: "Lucida Sans Unicode"

  //     },
  //     data: [
  //     {        
  //       type: "line",
  //       lineThickness:3,
  //       axisYType:"secondary",
  //       showInLegend: true,           
  //       name: "India", 
  //       dataPoints: [
  //       { x: new Date(2001, 0), y: 0 },
  //       { x: new Date(2002, 0), y: 0.001 },
  //       { x: new Date(2003, 0), y: 0.01},
  //       { x: new Date(2004, 0), y: 0.05 },
  //       { x: new Date(2005, 0), y: 0.1 },
  //       { x: new Date(2006, 0), y: 0.15 },
  //       { x: new Date(2007, 0), y: 0.22 },
  //       { x: new Date(2008, 0), y: 0.38  },
  //       { x: new Date(2009, 0), y: 0.56 },
  //       { x: new Date(2010, 0), y: 0.77 },
  //       { x: new Date(2011, 0), y: 0.91 },
  //       { x: new Date(2012, 0), y: 0.94 }


  //       ]
  //     },
  //     {        
  //       type: "line",
  //       lineThickness:3,
  //       showInLegend: true,           
  //       name: "China",
  //       axisYType:"secondary",
  //       dataPoints: [
  //       { x: new Date(2001, 00), y: 0.18 },
  //       { x: new Date(2002, 00), y: 0.2 },
  //       { x: new Date(2003, 0), y: 0.25},
  //       { x: new Date(2004, 0), y: 0.35 },
  //       { x: new Date(2005, 0), y: 0.42 },
  //       { x: new Date(2006, 0), y: 0.5 },
  //       { x: new Date(2007, 0), y: 0.58 },
  //       { x: new Date(2008, 0), y: 0.67  },
  //       { x: new Date(2009, 0), y: 0.78},
  //       { x: new Date(2010, 0), y: 0.88 },
  //       { x: new Date(2011, 0), y: 0.98 },
  //       { x: new Date(2012, 0), y: 1.04 }
  //       ]
  //     },
  //     ],
  //         legend: {
  //           cursor:"pointer",
  //           itemclick : function(e) {
  //             if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
  //             e.dataSeries.visible = false;
  //             }
  //             else {
  //               e.dataSeries.visible = true;
  //             }
  //             linechart.render();
  //           }
  //         }
  //       });

  //     linechart.render();
      
// google.charts.load('current', {'packages':['table']});
// google.charts.setOnLoadCallback(drawTable);
}
// function drawTable() 
// {
//         var data = new google.visualization.DataTable();
//         data.addColumn('string', 'Name');
//         data.addColumn('number', 'Salary');
//         data.addColumn('boolean', 'Full Time Employee');
//         data.addRows([
//           ['Mike',  {v: 10000, f: '$10,000'}, true],
//           ['Jim',   {v:8000,   f: '$8,000'},  false],
//           ['Alice', {v: 12500, f: '$12,500'}, true],
//           ['Bob',   {v: 7000,  f: '$7,000'},  true]
//         ]);

//         var table = new google.visualization.Table(document.getElementById('table_div'));

//         table.draw(data, {showRowNumber: true, width: '100%', height: '100%'});

// }