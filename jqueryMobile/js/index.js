/*
App-o-Mat jQuery Mobile Cordova starter template
https://github.com/app-o-mat/jqm-cordova-template-project
http://app-o-mat.com

MIT License
https://github.com/app-o-mat/jqm-cordova-template-project/LICENSE.md
*/

var appomat = {};

appomat.app = {
	
	//blogData: [ {title:"Titulo 1", body:"Mi body 1"},
	//{title:"Titulo 2", body:"Mi body 2"} ];
	
    initialize: function() {
		document.addEventListener('deviceready', this.onDeviceReady, false);
    },
	
	
    onDeviceReady: function() {
		FastClick.attach(document.body);
    }
	
};


appomat.router = new $.mobile.Router(
	{
		"#post[?](\\d+)": {handler: "holaBeforeShow", events:"bs"}
	}, {
		holaBeforeShow: function(event, args){
		//var post = this.blogData[args(1)];
		alert("Param:"+args(1));	
		//	$("#post-content").html('<h2>' + post.title+'</h2><p>'+post.body+'</p>');
		//	$("#post-content").enhanceWithin();
		} 
	}
);
