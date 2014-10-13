var DataService = function() {

	this.initialize = function() {
        // No Initialization required
		//alert("DataService Init JJ");
        var deferred = $.Deferred();
        deferred.resolve();
        return deferred.promise();
    }

	/*
    this.findById = function(id) {
        var deferred = $.Deferred();
        var employee = null;
        var l = employees.length;
        for (var i=0; i < l; i++) {
            if (employees[i].id === id) {
                employee = employees[i];
                break;
            }
        }
        deferred.resolve(employee);
        return deferred.promise();
    }

    this.findByName = function(searchKey) {
        var deferred = $.Deferred();
        var results = employees.filter(function(element) {
            var fullName = element.firstName + " " + element.lastName;
            return fullName.toLowerCase().indexOf(searchKey.toLowerCase()) > -1;
        });
        deferred.resolve(results);
        return deferred.promise();
    }
	*/
	
	 this.getData = function(template, data, showChart) {
		//alert("En DataService/getData:"+template+",data:"+data);
		var serverURL=window.localStorage["server"];
		var username=window.localStorage["username"];
		var password=window.localStorage["password"];
		   if(serverURL!='' && username != '' && password!= '') {
//				alert("va a ir a servicio de marcas1/serverURL:"+serverURL+",username:"+username+",password:"+password);
				data.push({name: 'username', value: username});
				data.push({name: 'password', value: password});
				$.post(serverURL, data, function(response) {
					if(response != null) {
						console.log("Response:"+JSON.stringify(response));
						var jsonData=JSON.stringify(response);
						//var jsonData = [{"value2":"40.24","color":"#008000","value1":"4048","valor":{"positivos":"4048","negativos":"1243","neutros":"4768"},"label":"positives","chartclass":"possClass"},{"value2":"12.36","color":"#FF0000","value1":"1243","valor":{"positivos":"4048","negativos":"1243","neutros":"4768"},"label":"negatives","chartclass":"negClass"},{"value2":"47.4","color":"#838383","value1":"4768","valor":{"positivos":"4048","negativos":"1243","neutros":"4768"},"label":"neutrals","chartclass":"neuClass"}];
						//console.log("jsonData Mi estimator1:"+jsonData);						
						setContent(response).done(function (result) {
							$('.content').html(template(result));
							if(showChart) {
								//alert("obj.streamLogo JJ:"+obj.streamLogo);
								/*
								$.each(obj, function() {
										alert("a ver1:"+obj['streamLogo']);
										console.log("aver 2:"+obj['streamLogo']);
								});*/
								pieChart(response);							
							}
						});						
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
	
	/*
	 this.getBrands = function(brandListTpl) {
		var serverURL=window.localStorage["server"];
		var username=window.localStorage["username"];
		var password=window.localStorage["password"];
		   if(server!='' && username != '' && password!= '') {
				//alert("va a ir a servicio de marcas1/serverURL:"+serverURL+",username:"+username+",password:"+password);
				$.post(serverURL, {username:username,password:password, getUserBrands:"1"}, function(response) {
					if(response != null) {
						setContent(response).done(function (brands) {
							$('.content').html(brandListTpl(brands));
						});
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
	*/
	
	

/*
    var brands = [
        {"id": 1, "firstName": "James", "lastName": "King", "managerId": 0, "managerName": "", "title": "President and CEO", "department": "Corporate", "cellPhone": "617-000-0001", "officePhone": "781-000-0001", "email": "jking@fakemail.com", "city": "Boston, MA", "pic": "James_King.jpg", "twitterId": "@fakejking", "blog": "http://coenraets.org"},
        {"id": 2, "firstName": "Julie", "lastName": "Taylor", "managerId": 1, "managerName": "James King", "title": "VP of Marketing", "department": "Marketing", "cellPhone": "617-000-0002", "officePhone": "781-000-0002", "email": "jtaylor@fakemail.com", "city": "Boston, MA", "pic": "Julie_Taylor.jpg", "twitterId": "@fakejtaylor", "blog": "http://coenraets.org"},
        {"id": 3, "firstName": "Eugene", "lastName": "Lee", "managerId": 1, "managerName": "James King", "title": "CFO", "department": "Accounting", "cellPhone": "617-000-0003", "officePhone": "781-000-0003", "email": "elee@fakemail.com", "city": "Boston, MA", "pic": "Eugene_Lee.jpg", "twitterId": "@fakeelee", "blog": "http://coenraets.org"},
        {"id": 4, "firstName": "John", "lastName": "Williams", "managerId": 1, "managerName": "James King", "title": "VP of Engineering", "department": "Engineering", "cellPhone": "617-000-0004", "officePhone": "781-000-0004", "email": "jwilliams@fakemail.com", "city": "Boston, MA", "pic": "John_Williams.jpg", "twitterId": "@fakejwilliams", "blog": "http://coenraets.org"},
        {"id": 5, "firstName": "Ray", "lastName": "Moore", "managerId": 1, "managerName": "James King", "title": "VP of Sales", "department": "Sales", "cellPhone": "617-000-0005", "officePhone": "781-000-0005", "email": "rmoore@fakemail.com", "city": "Boston, MA", "pic": "Ray_Moore.jpg", "twitterId": "@fakermoore", "blog": "http://coenraets.org"},
        {"id": 6, "firstName": "Paul", "lastName": "Jones", "managerId": 4, "managerName": "John Williams", "title": "QA Manager", "department": "Engineering", "cellPhone": "617-000-0006", "officePhone": "781-000-0006", "email": "pjones@fakemail.com", "city": "Boston, MA", "pic": "Paul_Jones.jpg", "twitterId": "@fakepjones", "blog": "http://coenraets.org"},
        {"id": 7, "firstName": "Paula", "lastName": "Gates", "managerId": 4, "managerName": "John Williams", "title": "Software Architect", "department": "Engineering", "cellPhone": "617-000-0007", "officePhone": "781-000-0007", "email": "pgates@fakemail.com", "city": "Boston, MA", "pic": "Paula_Gates.jpg", "twitterId": "@fakepgates", "blog": "http://coenraets.org"},
        {"id": 8, "firstName": "Lisa", "lastName": "Wong", "managerId": 2, "managerName": "Julie Taylor", "title": "Marketing Manager", "department": "Marketing", "cellPhone": "617-000-0008", "officePhone": "781-000-0008", "email": "lwong@fakemail.com", "city": "Boston, MA", "pic": "Lisa_Wong.jpg", "twitterId": "@fakelwong", "blog": "http://coenraets.org"},
        {"id": 9, "firstName": "Gary", "lastName": "Donovan", "managerId": 2, "managerName": "Julie Taylor", "title": "Marketing Manager", "department": "Marketing", "cellPhone": "617-000-0009", "officePhone": "781-000-0009", "email": "gdonovan@fakemail.com", "city": "Boston, MA", "pic": "Gary_Donovan.jpg", "twitterId": "@fakegdonovan", "blog": "http://coenraets.org"},
        {"id": 10, "firstName": "Kathleen", "lastName": "Byrne", "managerId": 5, "managerName": "Ray Moore", "title": "Sales Representative", "department": "Sales", "cellPhone": "617-000-0010", "officePhone": "781-000-0010", "email": "kbyrne@fakemail.com", "city": "Boston, MA", "pic": "Kathleen_Byrne.jpg", "twitterId": "@fakekbyrne", "blog": "http://coenraets.org"},
        {"id": 11, "firstName": "Amy", "lastName": "Jones", "managerId": 5, "managerName": "Ray Moore", "title": "Sales Representative", "department": "Sales", "cellPhone": "617-000-0011", "officePhone": "781-000-0011", "email": "ajones@fakemail.com", "city": "Boston, MA", "pic": "Amy_Jones.jpg", "twitterId": "@fakeajones", "blog": "http://coenraets.org"},
        {"id": 12, "firstName": "Steven", "lastName": "Wells", "managerId": 4, "managerName": "John Williams", "title": "Software Architect", "department": "Engineering", "cellPhone": "617-000-0012", "officePhone": "781-000-0012", "email": "swells@fakemail.com", "city": "Boston, MA", "pic": "Steven_Wells.jpg", "twitterId": "@fakeswells", "blog": "http://coenraets.org"}
    ];
*/
}

function setContent(response)
{
	var deferred = $.Deferred();
	//alert("Entra a setContentJ2/response:"+response);
	deferred.resolve(response);
	return deferred.promise();
}


 function pieChart(jsonData){  
 		console.log("Entra a pieChart:"+jsonData);
        var width = 380,
        height = 200,
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
    pieChart(jsonData);