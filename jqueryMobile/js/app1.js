myApp.foo.controller = (function($){
	
	var initialize=function() {
		alert("appomat");
    };
	
	var brandBeforeShow=function(event, args)
	{
		alert("Entra a brandBeforeShow");
	}
});