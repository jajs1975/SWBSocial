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
            console.log('auth');
			//alert("Router option1");
            renderAuthView();
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
		showMessage("The input is too high.",null,"Warning","Warning");
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
	alert("Entra a showMessageJ");
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
	
	
	

}());