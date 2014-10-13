//var serverUrl="http://swbsocial.infotec.com.mx/work/models/SWBSocialLicenseMgr/jsp/mobile/services.jsp";
var brandListView;

function init() {
	document.addEventListener("deviceready", deviceReady, true);
	delete init;
}

function initBrands() {
	//document.addEventListener("deviceready", deviceReady, true);
	brandListView = new brandListView();
	alert("LLega ainitBrands ");
	//getUserBrands();
	$('body').html(new BrandHomeView().render().$el);
}

function getUserBrands() {
   
   	var serverURL=window.localStorage["server"];
    var username=window.localStorage["username"];
	var password=window.localStorage["password"];
   if(server!='' && username != '' && password!= '') {
		alert("va a ir a servicio de marcas1/serverURL:"+serverURL+",username:"+username+",password:"+password);
	    $.post(serverURL, {username:username,password:password, getUserBrands:"1"}, function(response) {
			if(response != null) {
				//console.log(typeof res);
				alert("respuesta MarcasString:"+JSON.stringify(response));
				var obj = jQuery.parseJSON(JSON.stringify(response));
				var sBrands="<ul>";
				$.each(obj, function() {
					sBrands+="<li>"+obj['brandID']+"</li>";
				});
				alert("sBrands:"+sBrands);
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

function checkPreAuth() {
	console.log("checkPreAuth");
    var form = $("#loginForm");
    if(window.localStorage["server"] != undefined && window.localStorage["username"] != undefined && window.localStorage["password"] != undefined) {
		$("#server", form).val(window.localStorage["server"]);
        $("#username", form).val(window.localStorage["username"]);
        $("#password", form).val(window.localStorage["password"]);
        handleLogin();
    }
}

function handleLogin() {
    var form = $("#loginForm");    
    //disable the button so we can't resubmit while we wait
    $("#submitButton",form).attr("disabled","disabled");
	var serverURL=$("#server", form).val();
    var user = $("#username", form).val();
    var passw = $("#password", form).val();
	//alert("serverURL:"+serverURL+",user:"+user+",passw:"+passw);
	if(serverURL!='' && user != '' && passw!= '') {
		//alert("va a ir a servicio jorge3x...");
		var data = $('#loginForm  :input').serializeArray();
		data.push({name: 'login', value: "1"});
		$.post(serverURL, data, function(response) {
			if(response != null) {
				//console.log(typeof res);
				alert("respuesta GXX:"+JSON.stringify(response));
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
					$.mobile.changePage("userBrands.html");
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


function deviceReady() {
	console.log("deviceReadyyy");
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
	$("#loginPage").on("pageinit",function() {
		console.log("pageinit run");
		$("#loginForm").on("submit",handleLogin);
		checkPreAuth();
	});
	$.mobile.changePage("#loginPage");
}

