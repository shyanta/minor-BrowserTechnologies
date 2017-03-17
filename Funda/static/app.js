(function () {
	"use-strict";

	var currentGifID;
	var current;
	var dataFull = [];
	var total = 0;
	// Check wat nodig is en maak er een config van

	var API = {	
		baseUrl: "http://funda.kyrandia.nl/feeds/Aanbod.svc/json/",
		objectBaseUrl: "http://funda.kyrandia.nl/feeds/Aanbod.svc/json/detail/",
		key : "{API-KEY}",
		type : "type=",
		query : "&zo=",
		price : '/',
		page : "&page=1",
		pageSize : "&pagesize=25"
	};

	var input = {
		type : function(){
			var item = document.querySelector('input[name="type"]:checked');
			return API.type + item.value;
		},
		typeObject : function(){
			var item = document.querySelector('input[name="type"]:checked');
			return item.value + '/';
		},
		query : function () {
			var keywords = document.querySelector('input[name="keywords"]').value;
			var query = keywords.replace(' ', '/');
			return API.query + '/' + query;
		},
		price : function(){
			var priceMin = document.getElementById('price-min');
			var valMin = priceMin.options[priceMin.selectedIndex].value;
			var priceMax = document.getElementById('price-max');
			var valMax = priceMax.options[priceMax.selectedIndex].value;
			return API.price + valMin + '+' + valMax + '/';
		}
	};

	var app = {
		init: function(){
			routes();
		}
	};

	var routes = function(){
		//When refreshed always go to the #search		
		routie('home');
		//Route defines what methods should be used at every hash
		routie({
		    'home': function() {
				sections.home();
		    	toggle.pages();
		    },
		    'results': function() {
		    	sections.results();
		    },
		    'error': function(){
		    	toggle.pages();
		    },
		    'noresults': function(){
		    	toggle.pages();
		    },
		    'results/:id': function(){
		    	sections.detail();
		    }
		});
	};

	var toggle = {
		pages : function(){
			//Make sure only the section with the current hash from the href is active
			//Hide the sections that don't have the same ID as the hash
			var hash = location.hash || window.location.hash;
			var currentHash = document.querySelector(hash);
			var sectionArr = document.querySelectorAll('section:not('+hash+')');
			sectionArr.forEach(function(sectionArr){
				sectionArr.classList.add('hidden');
				sectionArr.hidden = true;
				currentHash.classList.remove('hidden');
				currentHash.hidden = false;
			});
		},
		resultTabs : function(type) {
			//When switching from results to detailpage, toggle those parts
			//When the function is called a parameter is given
			//this parameter calls what part should be shown
			//With this parameter this functions knows what part of the code should be executed
			//The hidden attribute is added because screenreaders will understand this, and will skip this part.
			//Display:flex messes up the hidden attribute functionality, so I also added a class with display:none
			var searchList = document.getElementById("search-results");
			var info = document.getElementById("detail");
			if (type === "results"){				
				searchList.hidden = false;			
				searchList.classList.remove('hidden');
				info.hidden = true;
				info.classList.add('hidden');
			} else if (type === "detail"){
				searchList.hidden = true;			
				searchList.classList.add('hidden');
				info.hidden = false;
				info.classList.remove('hidden');
			}
		}
	};

	var sections = {
		loader : document.querySelector('.loader'),
		home: function(){
			//Add eventlisteners to the inputfield and the submit button, to redirect to the #results page
			var form = document.querySelector('form');
				form.addEventListener('submit', goToResults);

			//Change the hash to #results to go to the results page
			//The change of the hash will call routie
			function goToResults(){
				input.type();
				input.query();
				input.price();	
				event.preventDefault();	
				window.location.hash = "#results";
				data.getTinyResults();
			}			
		},
		results: function(){			

			
			var send = document.getElementById('sort');
				send.addEventListener('click', function() {
					console.log('Sorteer');
					sort.data();
				});
			toggle.resultTabs('results');
		},
		detail: function(id){
			//Got to the toggleResults and make the detail part active. Do this with the given parameter
			toggle.resultTabs('detail');
			
			//Save the ID from the clicked gif in a variable, so this can be used to filter
			var href = window.location.href; //Kan ook anders
			var hrefArray = href.split('/');
				currentGifID = hrefArray[hrefArray.length - 1];

			//Filter data on the ID, this only returns the gif that is clicked, which gives a detail page
			current = JSON.parse(localStorage.getItem('dataFull')).filter(function(dataID){
				return dataID.Id == currentGifID;
			});
			render.detailPage(current);
		},
		error: function(type){
			//If the error is created on the apicall, give the following error
			if (type === "api"){
				//Go to #error with routie to render the right section with the api error
				window.location.hash = "#error";
			//If the error is created on a search, give the following error
			} else if(type === "search"){
				//Go to #noresults with routie to render the section with the search error
				window.location.hash = "#noresults";
			}
		}
			
	};

	var data = {
		//Add API key to use in the methods below
		getTinyResults: function(){
			sections.loader.classList.remove('hidden');
			aja()
				.method('get')
				.url(API.baseUrl + API.key + '?' + input.type() + input.query() + input.price() + API.page + API.pageSize)
				.on('200', function(response){
					//clean the received data and only return the needed properties
					var dataSearch = response.Objects;
					//Store data in localStorage
					localStorage.setItem("dataSearch",JSON.stringify(dataSearch));

					//If the given data contains more than 1 object, push the data to the HTML
					if(JSON.parse(localStorage.getItem("dataSearch")).length >= 1 ){
		    			for (i = 0; i < dataSearch.length; i++) {
							data.getFullResults(dataSearch[i].Id, dataSearch.length);
						}
					}
					else{
						//If the given data contains less then 1 object, redirect to the searchError section
			    		sections.loader.classList.add('hidden');
						sections.error("search");
					}
				})
				.on('40x', function(){
					//When the api gives an error go to the error section
					//Give the parameter API so the error section knows what errorsection to handle
			    	sections.loader.classList.add('hidden');
					sections.error("api");
				})
				.on('500', function(){
					//When the api gives an error go to the error section
					//Give the parameter API so the error section knows what errorsection to handle
			    	sections.loader.classList.add('hidden');
					sections.error("api");
				})
				.go();
		},
		getFullResults : function(detailID, detailLength){
			dataFull = [];
			total = 0;
			sections.loader.classList.remove('hidden');
			aja()
				.method('get')
				.url(API.objectBaseUrl + API.key + input.typeObject() + detailID)
				.on('200', function(response){
					//clean the received data and only return the needed properties
					total++;

					dataFull.push(response);

					if(total == detailLength){

						console.log(dataFull);

						localStorage.setItem("dataFull",JSON.stringify(dataFull));
						toggle.pages();
						render.results(JSON.parse(localStorage.getItem("dataFull")));
				    	sections.loader.classList.add('hidden');
					}

					
                    
				})
				.on('40x', function(){
					//When the api gives an error go to the error section
					//Give the parameter API so the error section knows what errorsection to handle
			    	sections.loader.classList.add('hidden');
					sections.error("api");
				})
				.on('500', function(){
					//When the api gives an error go to the error section
					//Give the parameter API so the error section knows what errorsection to handle
			    	sections.loader.classList.add('hidden');
					sections.error("api");
				})
				.go();
		}
	};
	var sort = {
		data : function(){

				sections.loader.classList.remove('hidden');
				var tuin = document.getElementById('tuin');
				var garage = document.getElementById('garage');
				var kamers = document.getElementById('slaapkamers');
				var woonOpper = document.getElementById('woonoppervlakte');
				var perceelOpper = document.getElementById('perceeloppervlakte');
				var dataSorted = dataFull.sort(
					firstBy(function(a,b){
						// if (Number(tuin.options[tuin.selectedIndex].value) == 1) {
						// 	Tuin(a,b);
						// } else if (Number(garage.options[garage.selectedIndex].value) == 1) {
						// 	Garage(a,b);
						// } else if (Number(kamers.options[kamers.selectedIndex].value) == 1) {
						// 	AantalKamers(a,b);
						// } else if (Number(woonOpper.options[woonOpper.selectedIndex].value) == 1) {
						// 	woonOpp(a,b);
						// } else {
						// 	perceelOpp(a,b);
						// }
						if ((a.Tuin === null) && (b.Tuin === null)){
							return 0;
						}
						else if (a.Tuin === null){
							return 1;
						}
						else if (b.Tuin === null){
							return -1;
						}	
					})
					.thenBy(function(a,b){
						// if (Number(tuin.options[tuin.selectedIndex].value) == 2) {
						// 	Tuin(a,b);
						// } else if (Number(garage.options[garage.selectedIndex].value) == 2) {
						// 	Garage(a,b);
						// } else if (Number(kamers.options[kamers.selectedIndex].value) == 2) {
						// 	AantalKamers(a,b);
						// } else if (Number(woonOpper.options[woonOpper.selectedIndex].value) == 2) {
						// 	woonOpp(a,b);
						// } else {
						// 	perceelOpp(a,b);
						// }	
						var kamersInput = document.querySelector('input[name="slaapkamersAantal"]').value;
						kamersInputNum = Number(kamersInput);
						if ((a.AantalKamers === kamersInputNum) && (b.AantalKamers === kamersInputNum)){
							return 0;
						}
						else if (a.AantalKamers === kamersInputNum){
							return -1;
						}
						else if (b.AantalKamers === kamersInputNum){
							return 1;
						}	
					})
					.thenBy(function(a,b){
						// if (Number(tuin.options[tuin.selectedIndex].value) == 3) {
						// 	Tuin(a,b);
						// } else if (Number(garage.options[garage.selectedIndex].value) == 3) {
						// 	Garage(a,b);
						// } else if (Number(kamers.options[kamers.selectedIndex].value) == 3) {
						// 	AantalKamers(a,b);
						// } else if (Number(woonOpper.options[woonOpper.selectedIndex].value) == 3) {
						// 	woonOpp(a,b);
						// } else {
						// 	perceelOpp(a,b);
						// }
						if ((a.Garage === null) && (b.Garage === null)){
							return 0;
						}
						else if (a.Garage === null){
							return 1;
						}
						else if (b.Garage === null){
							return -1;
						}
						
					})
					.thenBy(function(a,b){
						// if (Number(tuin.options[tuin.selectedIndex].value) == 4) {
						// 	Tuin(a,b);
						// } else if (Number(garage.options[garage.selectedIndex].value) == 4) {
						// 	Garage(a,b);
						// } else if (Number(kamers.options[kamers.selectedIndex].value) == 4) {
						// 	AantalKamers(a,b);
						// } else if (Number(woonOpper.options[woonOpper.selectedIndex].value) == 4) {
						// 	woonOpp(a,b);
						// } else {
						// 	perceelOpp(a,b);
						// }
						var woonOppMin = document.querySelector('input[name="woonoppmin"]').value;
						var woonOppMinNum = Number(woonOppMin);
						if ((a.WoonOppervlakte < woonOppMinNum) && (b.WoonOppervlakte < woonOppMinNum)){
							return 0;
						}
						else if (a.WoonOppervlakte > woonOppMinNum){
							return -1;
						}
						else if (b.WoonOppervlakte > woonOppMinNum){
							return 1;
						}
					})
					.thenBy(function(a,b){
						// if (Number(tuin.options[tuin.selectedIndex].value) == 5) {
						// 	Tuin(a,b);
						// } else if (Number(garage.options[garage.selectedIndex].value) == 5) {
						// 	Garage(a,b);
						// } else if (Number(kamers.options[kamers.selectedIndex].value) == 5) {
						// 	AantalKamers(a,b);
						// } else if (Number(woonOpper.options[woonOpper.selectedIndex].value) == 5) {
						// 	woonOpp(a,b);
						// } else {
						// 	perceelOpp(a,b);
						// }
						var perceelOppMin = document.querySelector('input[name="perceeloppmin"]').value;
						var perceelOppMinNum = Number(perceelOppMin);
						if ((a.PerceelOppervlakte < perceelOppMinNum) && (b.PerceelOppervlakte < perceelOppMinNum)){
							return 0;
						}
						else if (a.PerceelOppervlakte > perceelOppMinNum){
							return -1;
						}
						else if (b.PerceelOppervlakte > perceelOppMinNum){
							return 1;
						}
					})
				);

				function Tuin(a,b){
					if ((a.Tuin === null) && (b.Tuin === null)){
							return 0;
						}
						else if (a.Tuin === null){
							return 1;
						}
						else if (b.Tuin === null){
							return -1;
						}		
				}
				function Garage(a,b){
					if ((a.Garage === null) && (b.Garage === null)){
							return 0;
						}
						else if (a.Garage === null){
							return 1;
						}
						else if (b.Garage === null){
							return -1;
						}	
				}
				function AantalKamers(a,b){
					var kamersInput = document.querySelector('input[name="slaapkamersAantal"]').value;
						kamersInputNum = Number(kamersInput);
						if ((a.AantalKamers === kamersInputNum) && (b.AantalKamers === kamersInputNum)){
							return 0;
						}
						else if (a.AantalKamers === kamersInputNum){
							return -1;
						}
						else if (b.AantalKamers === kamersInputNum){
							return 1;
						}	
				}
				function woonOpp(a,b){
					var woonOppMin = document.querySelector('input[name="woonoppmin"]').value;
						var woonOppMinNum = Number(woonOppMin);
						if ((a.WoonOppervlakte < woonOppMinNum) && (b.WoonOppervlakte < woonOppMinNum)){
							return 0;
						}
						else if (a.WoonOppervlakte > woonOppMinNum){
							return -1;
						}
						else if (b.WoonOppervlakte > woonOppMinNum){
							return 1;
						}
				}
				function perceelOpp(a,b){
					var perceelOppMin = document.querySelector('input[name="perceeloppmin"]').value;
						var perceelOppMinNum = Number(perceelOppMin);
						if ((a.PerceelOppervlakte < perceelOppMinNum) && (b.PerceelOppervlakte < perceelOppMinNum)){
							return 0;
						}
						else if (a.PerceelOppervlakte > perceelOppMinNum){
							return -1;
						}
						else if (b.PerceelOppervlakte > perceelOppMinNum){
							return 1;
						}
				}
				console.log(dataFull);
				console.log(dataSorted);
				render.results(dataSorted);
				sections.loader.classList.add('hidden');
		}
	};
	var render = {
		results : function(data){
			var resultsTemplate = document.querySelector('.house');			    
	    	var directives = {
    			url_id: {
	    			href: function (){
	    				//Place the source propertie at the <a href=""> from the HTML template
    					return '#results/' + this.Id;
    				}
    			},
    			url_img: {
    				src: function (){
	    				//Place the source propertie at the <img src=""> from the HTML template
    					return this.HoofdFoto;
    				}
    			},
    			adres: {
    				text: function(){
    					return this.Adres;
    				}
    			},
    			postcode: {
    				text : function(){
    					return this.Postcode + ' ' + this.Plaats;
    				}
    			},
    			prijs: {
	    			html: function(){
						return this.PrijsGeformatteerd;
					}
    			},
    			sub_info : {
    				text : function(){
    					if(this.WoonOppervlakte === null && this.PerceelOppervlakte === null){
    						return this.AantalKamers + ' kamers';
    					}
    					else if(this.WoonOppervlakte === null && this.AantalKamers === null){
    						return this.PerceelOppervlakte + ' m2';
    					}
    					else if(this.PerceelOppervlakte === null && this.AantalKamers === null){
    						return this.WoonOppervlakte + ' m2';
    					}
    					else if (this.WoonOppervlakte === null){
    						return this.PerceelOppervlakte + ' m2 ● '+ this.AantalKamers + ' kamers';
    					}
    					else if(this.PerceelOppervlakte === null){
    						return this.WoonOppervlakte + ' m2 ● '+ this.AantalKamers + ' kamers';
    					}
    					else if(this.AantalKamers === null){
    						return this.WoonOppervlakte + ' m2 / ' + this.PerceelOppervlakte + ' m2';
    					}
    					else {
    						return this.WoonOppervlakte + ' m2 / ' + this.PerceelOppervlakte + ' m2 ● '+ this.AantalKamers + ' kamers';
    					}
    				}
    			},
    			makelaar : {
    				text : function(){
    					return this.Makelaar;
    				}
    			}
	    	};
	    	//Use transparency to render the data to the HTML template
	    	Transparency.render(resultsTemplate, data, directives);
		},
		detailPage : function(data){
			var detailTemplate = document.getElementById('detail');			    
	    	var directivesDetail = {
	    		title: {
    				text: function(){
    					return this.Adres;
    				}
    			},
    			url_img: {
    				src: function (){
	    				//Place the source propertie at the <img src=""> from the HTML template
    					return this.HoofdFoto;
    				}
    			},
    			adres: {
    				text: function(){
    					return this.Adres;
    				}
    			},
    			postcode: {
    				text : function(){
    					return this.Postcode + ' ' + this.Plaats;
    				}
    			},
    			prijs: {
	    			html: function(){
						return this.PrijsGeformatteerd;
					}
    			},
    			sub_info : {
    				text : function(){
    					if(this.WoonOppervlakte === null && this.PerceelOppervlakte === null){
    						return this.AantalKamers + ' kamers';
    					}
    					else if(this.WoonOppervlakte === null && this.AantalKamers === null){
    						return this.PerceelOppervlakte + ' m2';
    					}
    					else if(this.PerceelOppervlakte === null && this.AantalKamers === null){
    						return this.WoonOppervlakte + ' m2';
    					}
    					else if (this.WoonOppervlakte === null){
    						return this.PerceelOppervlakte + ' m2 ● '+ this.AantalKamers + ' kamers';
    					}
    					else if(this.PerceelOppervlakte === null){
    						return this.WoonOppervlakte + ' m2 ● '+ this.AantalKamers + ' kamers';
    					}
    					else if(this.AantalKamers === null){
    						return this.WoonOppervlakte + ' m2 / ' + this.PerceelOppervlakte + ' m2';
    					}
    					else {
    						return this.WoonOppervlakte + ' m2 / ' + this.PerceelOppervlakte + ' m2 ● '+ this.AantalKamers + ' kamers';
    					}
    				}
    			},
    			garage : {
    				text: function(){
    					return 'Garage: ' + this.Garage;
    				}
    			},
    			tuin : {
    				text: function() {
    					return 'tuin: ' + this.Tuin;
    				}
    			},
    			makelaar : {
    				text : function(){
    					return this.Makelaar;
    				}
    			}
	    	};
	    	//Use transparency to render the data to the HTML template
	    	Transparency.render(detailTemplate, data, directivesDetail);
		}
	};
	
	app.init();
})();