// We use an "Immediate Function" to initialize the application to avoid leaving anything behind in the global scope
(function () {
	alert("Entra a App J");
    /* ---------------------------------- Local Variables ---------------------------------- */
    //Modifying the templates initialization. Instead of declaring them as local variables, add them to the prototype of their respective classes:
	var homeTpl = Handlebars.compile($("#home-tpl").html());	//because de View /js/HomeView.js
    var brandListTpl = Handlebars.compile($("#brand-list-tpl").html());	//because de View /js/HomeView.js
	//BrandHomeView.prototype.template = Handlebars.compile($("#home-tpl").html());
    //BrandListView.prototype.template = Handlebars.compile($("#brand-list-tpl").html());
	alert("Entra a App J1:"+brandListTpl);
	//EmployeeView.prototype.template = Handlebars.compile($("#employee-tpl").html())
	//var slider = new PageSlider($('body'));	//Using Hardware Acceleration
	//alert("Entra a App J2:"+slider);
    var service = new DataService();
    service.initialize().done(function () {
        console.log("DataService initialized");
		//renderHomeView(); //Because the view /js/HomeView.js
		//$('body').html(new HomeView(service).render().$el); //commented since routing managment
		router.addRoute('', function() {
            console.log('empty');
            $('body').html(new BrandHomeView(service).render().$el); //commented since the use of Hardware Acceleration (Next Line)
			//slider.slidePage(new BrandHomeView(service).render().$el);	//Using Hardware Acceleration
        });
	
        router.addRoute('brands/:id', function(id) {
            console.log('details'+id);
			
			/*
            service.findById(parseInt(id)).done(function(employee) {
                //$('body').html(new EmployeeView(employee).render().$el);	//commented since the use of Hardware Acceleration (Next Line)
				slider.slidePage(new EmployeeView(employee).render().$el);	//Using Hardware Acceleration
            });
			*/
        });
	
        router.start();
    });

    /* --------------------------------- Event Registration -------------------------------- */
    //$('.search-key').on('keyup', findByName); //commented by George
    //$('.help-btn').on('click', function() {   //commented by George
    //    alert("Employee Directory v3.4");
    //});
	//George Block
	// Colocar despues
	document.addEventListener('deviceready', function () {
	 alert("En addEventListener");	
	 //Status bar fix for IOS7. First add pluin cordova plugins add org.apache.cordova.statusbar to the project, then add this 3 lines.
	 StatusBar.overlaysWebView( false );
	 StatusBar.backgroundColorByHexString('#ffffff');
     StatusBar.styleDefault();
	 //Ends fix for IOS7
	   		
	  FastClick.attach(document.body); // Registerig FastClick 
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
	
	//End of George Block
    /* ---------------------------------- Local Functions ---------------------------------- */
	
	/*	//Moved to the view /js/HomeView.js
    function findByName() {
        service.findByName($('.search-key').val()).done(function (employees) {
            //var l = employees.length;
            //var e;
            //$('.employee-list').empty();
            //for (var i = 0; i < l; i++) {
            //    e = employees[i];
            //    $('.employee-list').append('<li><a href="#employees/' + e.id + '">' + e.firstName + ' ' + e.lastName + '</a></li>');
            //}
			//});
			$('.content').html(employeeListTpl(employees));
	    });
    }*/

	/*	//Replaced by view /js/HomeView.js
	function renderHomeView() {
		//var html=
		// "<h1>Directory</h1>" +
      	// 	"<input class='search-key' type='search' placeholder='Enter name'/>" +
	    // 	"<ul class='employee-list'></ul>";
    	// $('body').html(html);
  	    $('body').html(homeTpl());
		//$('.search-key').on('keyup', findByName);
	}
	*/

}());