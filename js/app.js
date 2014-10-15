// We use an "Immediate Function" to initialize the application to avoid leaving anything behind in the global scope
(function () {
	/* ---------------------------------- Local Variables ---------------------------------- */
    var homeTpl = Handlebars.compile($("#home-tpl").html());
    var authTpl = Handlebars.compile($("#auth-tpl").html());
	var brandListTpl = Handlebars.compile($("#brand-list-tpl").html());
	var streamListTpl = Handlebars.compile($("#stream-list-tpl").html());
	var streamInfoTpl = Handlebars.compile($("#streamInfo").html());
	
    var service = new DataService();
    service.initialize().done(function () {
		//renderAuthView();
		
		router.addRoute('', function() {
            console.log('authxxxz');
			//alert("Router option1");
            renderAuthView();
			
			/*					
			 var jsonData = [[
				{"value2":"39.16","color":"#008000","value1":"3916","label":"Positivos","chartclass":"possClass"},
				{"value2":"11.19","color":"#FF0000","value1":"1119","label":"Negativos","chartclass":"negClass"},
				{"value2":"49.65","color":"#838383","value1":"4965","label":"Neutros","chartclass":"neuClass"}
			],[
				{"streamMsgNum":"10000","streamMsgNeuNum":"4965","streamMsgNegNum":"1119","streamMsgPostNum":"3916","streamName":"Reforma Energetica","streamLogo":"http://swbsocial.infotec.com.mx/swbadmin/css/images/social-streamOff.png"}
			]];
			*/
			/*
			[[
				{"value2":"39.16","color":"#008000","value1":"3916","label":"Positivos","chartclass":"possClass"},
				{"value2":"11.19","color":"#FF0000","value1":"1119","label":"Negativos","chartclass":"negClass"},
				{"value2":"49.65","color":"#838383","value1":"4965","label":"Neutros","chartclass":"neuClass"}
			],[
				{"streamMsgNum":"10000","streamMsgNeuNum":"4965","streamMsgNegNum":"1119","streamMsgPostNum":"3916","streamName":"Reforma Energetica","streamLogo":"http://swbsocial.infotec.com.mx/swbadmin/css/images/social-streamOff.png"}
			]]*/


			
			//console.log('jsonData Chart Data:' + jsonData[0]);
			//console.log('Other Data:' + jsonData[1]);
			
			//console.log('jsonData:'+jsonData);
			//console.log('jsonData1:'+JSON.stringify(jsonData));
			/*
			var charData = jsonData[0];
			var GeneralData = jsonData[1];					

			console.log('jsonData Chart Data:' + JSON.stringify(charData));
			console.log('Other Data:' + JSON.stringify(GeneralData[0]));
			

	   	    $('body').html(homeTpl());
			$('.content').html(streamInfoTpl(GeneralData[0]));
			pieChart(charData);	
			*/
        });

        router.addRoute('brand/:brandID', function(brandID) {
             console.log('streams');
//	      	 alert("Router option2");
			 var data=[];
			 data.push({name: 'brandID', value: brandID});
			 data.push({name: 'action', value: "brandStreams"});
			 //var headerx="<a href='#' class='ui-btn-left ui-btn ui-btn-inline ui-corner-all' data-rel='back' data-role='button' role='button'>Atras</a>"+
			//"<h1 class='ui-title' role='heading' aria-level='1'><a href='#' class='ui-btn-inline ui-link'>SWB Social</a></h1>";
			//console.log("Mi Header1:"+$('.headerNav').html()); 
			/*
			var headerButton="<button class='btn btn-link btn-nav pull-left'>"+
				"<span class='icon icon-left-nav'></span>"+
				"Atras"+
				"</button>";
			console.log("valor de header:"+$('.socialHeader').html()+",headerButton:"+headerButton);
			$('.socialHeader').html(headerButton+$('.socialHeader').html());
			*/
			//$('.headerNav').html(headerx);
             service.getData(streamListTpl, data, false);
        });
		
		router.addRoute('stream/:streamID', function(streamID) {
             console.log('stream Info');
	      	 //alert("Router option3");
			 var data=[];
			 data.push({name: 'streamID', value: streamID});
			 data.push({name: 'action', value: "streamInfo"});
			 //var headerx="<a href='#' class='ui-btn-left ui-btn ui-btn-inline ui-corner-all' data-rel='back' data-role='button' role='button'>Atras</a>"+
			//"<h1 class='ui-title' role='heading' aria-level='1'><a href='#' class='ui-btn-inline ui-link'>SWB Social</a></h1>";
			//console.log("Mi Header1:"+$('.headerNav').html()); 
			/*
			var headerButton="<button class='btn btn-link btn-nav pull-left'>"+
				"<span class='icon icon-left-nav'></span>"+
				"Atras"+
				"</button>";
			console.log("valor de header:"+$('.socialHeader').html()+",headerButton:"+headerButton);
			$('.socialHeader').html(headerButton+$('.socialHeader').html());
			*/
			//$('.headerNav').html(headerx);
			//$('body').html(homeTpl());
            service.getData(streamInfoTpl, data, true);
        });
		

        router.start();
		
    });

    /* --------------------------------- Event Registration -------------------------------- */
    document.addEventListener('deviceready', function () {
		//For IOS7 -->In iOS7, the status bar overlaps the application views. As a result, the status bar text may collide with the 		application's header text as shown in the screenshot above. You can fix this issue using the statusbar plugin.
        //StatusBar.overlaysWebView( false );
        //StatusBar.backgroundColorByHexString('#ffffff');
        //StatusBar.styleDefault();
		//Ends 
        FastClick.attach(document.body);
		/*
		if (navigator.notification) { // Override default HTML alert with native dialog
            window.alert = function (message) {
                navigator.notification.alert(
                    message,    // message
                    null,       // callback
                    "SWB Social", // title
                    'OK'        // buttonName
                );
            };
        }*/
		//navigator.notification.alert("Notificaciones Activadas", function() {});
    }, false);

    /* ---------------------------------- Local Functions ---------------------------------- */
   

    function renderAuthView() {
	    $('body').html(homeTpl());
//		alert("En renderAuthView..");
	    $('.content').html(authTpl());
		$("#authForm").on("submit",handleLogin);
		checkPreAuth();
		return false;
    }
	
	
	/* --------------------------------- Authentication Managment --------------------------- */
	
	
	function checkPreAuth() {
		console.log("checkPreAuthNew");
		//alert("Entra a checkPreAuth");	
		var form = $("#authForm");
		if(window.localStorage["server"] != undefined && window.localStorage["username"] != undefined && window.localStorage["password"] != undefined) {
			$("#server", form).val(window.localStorage["server"]);
			$("#username", form).val(window.localStorage["username"]);
			$("#password", form).val(window.localStorage["password"]);
			handleLogin();
		}
		return false;
	}

	function handleLogin() {
		console.log("handleLoginNew1");
		var form = $("#authForm");    
		//disable the button so we can't resubmit while we wait
		$("#submitButton",form).attr("disabled","disabled");
		var serverURL=$("#server", form).val();
		var user = $("#username", form).val();
		var passw = $("#password", form).val();
		//showMessage("The input is too high.",null,"Warning","Warning");
	//	alert("serverURL:"+serverURL+",user:"+user+",passw:"+passw);
		if(serverURL!='' && user != '' && passw!= '') {
			//alert("va a ir a servicio jorge3x...");
			var data = $('#authForm  :input').serializeArray();
			data.push({name: 'action', value: "login"});
			//{username: user, password: passw}
			$.post(serverURL, data, function(response) {
				if(response != null) {
					//console.log(typeof res);
					//alert("respuesta GXX:"+JSON.stringify(response));
					var obj = jQuery.parseJSON(JSON.stringify(response));
					//$.each(obj, function() {
					//	alert(obj['isSocialUser']);
					//});
					//store
					//alert("obj.isSocialUser:"+obj.isSocialUser);
					if(obj.isSocialUser)
					{
						//alert("Gabra....:"+serverURL);
						window.localStorage["server"]=serverURL;
						window.localStorage["username"] = user;
						window.localStorage["password"] = passw;    
						var data=[];
						data.push({name: 'action', value: "userBrands"});
						service.getData(brandListTpl, data, false);
						/*
						service.getBrands(user).done(function (brands) {
							$('.content').html(brandListTpl(brands));
						});*/
						//$('.content').html(brandListTpl(service.getBrands(user)));
					}
				} else {
					navigator.notification.alert("Your login failed", function() {});
				}
			 $("#submitButton").removeAttr("disabled");	 
			},"json");		
		} else {
			navigator.notification.alert("You must enter a username and password", function() {});
			$("#submitButton").removeAttr("disabled");
		}
    return false;
}

function showMessage(message, callback, title, buttonName) {
	title = title || "default title";
    buttonName = buttonName || 'OK';
	
    if(navigator.notification && navigator.notification.alert) {
	    navigator.notification.alert(
            message,    // message
            callback,   // callback
            title,      // title
            buttonName  // buttonName
        );

    } else {
		alert(message);
        callback();
    }
	
}
	
/*
function pieChart(jsonData){  
 		console.log("Entra a pieChart:"+jsonData);
        var width = 480,
        height = 300,
        radius = Math.min(width, height) / 2;


        var pie = d3.layout.pie()
        .sort(null)
        .value(function(d) { return d.value2; });    


        var arc = d3.svg.arc()
        .outerRadius(radius - 20)
        .innerRadius(radius - 100);

        var arcOver = d3.svg.arc()
        .outerRadius(radius - 10)
        .innerRadius(0);




        d3.json("", function(error, data) {

            //var data = [{"value2":"40.24","color":"#008000","value1":"4048","valor":{"positivos":"4048","negativos":"1243","neutros":"4768"},"label":"positives","chartclass":"possClass"},{"value2":"12.36","color":"#FF0000","value1":"1243","valor":{"positivos":"4048","negativos":"1243","neutros":"4768"},"label":"negatives","chartclass":"negClass"},{"value2":"47.4","color":"#838383","value1":"4768","valor":{"positivos":"4048","negativos":"1243","neutros":"4768"},"label":"neutrals","chartclass":"neuClass"}];
			var data =	jsonData;		
            var svgSen = d3.select("#pieChart").append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

            var gl= svgSen.selectAll(".arcOver")
            .data(pie(data))
            .enter().append("g")
            .attr("class", "arcOver")
            .style("visibility","hidden");

            gl.append("path")
            .attr("d", arcOver)
            .style("fill-opacity", "0.6")
            .style("fill", function(d) { return d.data.color; });

            var tooltips = svgSen.select("#pieChart")
            .data(pie(data))
            .enter().append("div")
            .attr("class","chartToolTip")
            .style("display", "none")
            .style("position", "absolute")
            .style("z-index", "10");

            tooltips.append("p")
            .attr('class', 'd3-tip')  
            .html(function(d) {                
                return "<strong>"+d.data.label+"</strong><br>"+d.data.value1+"/"+d.data.value2+"%";
            });



            var g = svgSen.selectAll(".arc")
            .data(pie(data))
            .enter().append("g")
            .attr("class", "arc")
            .on("mouseover", function(d, i) {
                d3.select(gl[0][i]).style("visibility","visible"); 
                d3.select(tooltips[0][i])
                .style("display","block");
            })
            .on("mouseout", function(d, i) {
                d3.select(gl[0][i]).style("visibility","hidden"); 
                d3.select(tooltips[0][i])
                .style("display","none");
                d3.select(gl[0][i]).style("fill",function(d) {
                    return d.data.color;
                });
            })

            .on("mousemove", function(d, i) {
                d3.select(tooltips[0][i])
                .style("top", d3.event.pageY-10+"px")
                .style("left", d3.event.pageX+10+"px")
            });

            //Create slices
            g.append("path")
            .attr("d", arc)
            .style("stroke", "white")
            .style("stroke-width", "2")
            .style("fill", function(d, i) {
                return  d.data.color;
            });

            svgSen
            .append("text")
            .text("title")
            .style("text-anchor","middle")
            .style("fill","black")
            .style("font-size","10pt")
            .style("font-weight","bold")
            .attr("x","0")
            .attr("y",function(d) {
                return - width/2;
            });
        });
    }
    //pieChart(jsonData);
*/
	
	

}());