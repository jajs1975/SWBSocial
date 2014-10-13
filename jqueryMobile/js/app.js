// We use an "Immediate Function" to initialize the application to avoid leaving anything behind in the global scope
(function () {
	//alert("Entra a SWBSocial app.js");
    /* ---------------------------------- Local Variables ---------------------------------- */
    var homeTpl = Handlebars.compile($("#home-tpl").html());
    var authTpl = Handlebars.compile($("#auth-tpl").html());
	var brandListTpl = Handlebars.compile($("#brand-list-tpl").html());
	var streamListTpl = Handlebars.compile($("#stream-list-tpl").html());
	/*
	var router=new $.mobile.Router({
		"#localpage2(?:[?/](.*))?": "localpage2",
	},{
		localpage2: function(type,match,ui){
			console.log("localpage2: "+type);
			console.log(match);
		}
	}, { 
		defaultHandler: function(type, ui, page) {
			console.log("Default handler called due to unknown route (" 
				+ type + ", " + ui + ", " + page + ")");
		},
		defaultHandlerEvents: "s"
	});*/
	
    var service = new DataService();
    service.initialize().done(function () {
		renderAuthView();
		
		/*
		router.addRoute('', function() {
            console.log('auth');
			alert("Router option1");
            renderAuthView();
        });*/
		/*
		router.addRoute('brand/:brandID', function(brandID) {
             console.log('streams');
	      	 alert("Router option2");
			 var data=[];
			 data.push({name: 'brandID', value: brandID});
			 data.push({name: 'action', value: "brandStreams"});
			 var headerx="<a href='#' class='ui-btn-left ui-btn ui-btn-inline ui-corner-all' data-rel='back' data-role='button' role='button'>Atras</a>"+
			"<h1 class='ui-title' role='heading' aria-level='1'><a href='#' class='ui-btn-inline ui-link'>SWB Social</a></h1>";
			//console.log("Mi Header1:"+$('.headerNav').html()); 
			$('.headerNav').html(headerx);
             service.getData(streamListTpl, data);
        });

        router.start();
		*/
		
		/*
		var router = new $.mobile.Router(
		{
			"brand/:brandID": {handler: "brandBeforeShow", events:"bs"}
		},myApp.foo.controller);
		*/
		
    });

    /* --------------------------------- Event Registration -------------------------------- */
    document.addEventListener('deviceready', function () {
		FastClick.attach(document.body);
        if (navigator.notification) { // Override default HTML alert with native dialog
            window.alert = function (message) {
                navigator.notification.alert(
                    message,    // message
                    null,       // callback
                    "SWB Social", // title
                    'OK'        // buttonName
                );
            };
        }
    }, false);

    /* ---------------------------------- Local Functions ---------------------------------- */
	
	
    function renderAuthView() {
	    $('body').html(homeTpl());
		alert("En renderAuthView..");
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
	alert("serverURL:"+serverURL+",user:"+user+",passw:"+passw);
	if(serverURL!='' && user != '' && passw!= '') {
		alert("va a ir a servicio jorge2...");
		var data = $('#authForm  :input').serializeArray();
		data.push({name: 'login', value: "1"});
		//{username: user, password: passw}
		$.post(serverURL, data, function(response) {
			if(response != null) {
				//console.log(typeof res);
				alert("respuesta 1:"+JSON.stringify(response));
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
					service.getData(brandListTpl, data);
					/*
					service.getBrands(user).done(function (brands) {
						$('.content').html(brandListTpl(brands));
					});*/
					//$('.content').html(brandListTpl(service.getBrands(user)));
				}
            } else {
				alert("Elaseeee");
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
	
}());
	