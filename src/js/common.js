// "use strict"
function extend( a, b ) {
	for( var key in b ) { 
		if( b.hasOwnProperty( key ) ) {
			a[key] = b[key];
		}
	}
	return a;
}

var modalsProject, menu;

function Menu() {
	var _this = this;

	_this.initHandler = function(){
		_this.trigger.on("click", function(){
			if(_this.body.hasClass("navigation_show")) return;
			_this.body.addClass("navigation_show");
		});
		_this.overlay.add(_this.close).on("click", function(){
			_this.body.removeClass("navigation_show");
		});
	}

	_this.init = function(){
		_this.trigger = $(".ui-menu");
		_this.overlay = $(".overlay");
		_this.body = $("body");
		_this.close = $(".cross-menu");

		_this.initHandler();
	}

	_this.init();
}
// var menu = function(){
// 	var trigger = $(".ui-menu"),
// 		overlay = $(".overlay"),
// 		body = $("body"),
// 		close = $(".cross-menu");

// 	trigger.on("click", function(){
// 		if(body.hasClass("navigation_show")) return;
// 		body.addClass("navigation_show");
// 	});
// 	overlay.add(close).on("click", function(){
// 		body.removeClass("navigation_show");
// 	});
// };

function Loading(){
	var _this = this;

	_this.options = {
		trigger: ".js-link",
		isAnimation: false,
		body: "body",
		openMenuClass: "navigation_show",
		pages: ".pages",
		constantSection: ".constant-section",
		breadcumbs: ".breadcumbs",
		menu: ".menu-elements"
	}

	_this.initHandler = function(){
		$(_this.options.trigger).on("click vclick", function(event){

			if($(this).hasClass("active")) {
				return false;
			}

			if(_this.options.isAnimation) {
				return false;
			}

			_this.options.isAnimation = true;

			_this.link = $(this).attr("href");

			if($(_this.options.body).hasClass(_this.options.openMenuClass)){
				$(_this.options.body).removeClass(_this.options.openMenuClass);
				setTimeout(function(){
					_this.action(_this.link, true);
				},300);
			} else {
				_this.action(_this.link, true);
			}

			event.preventDefault();
			return false;
		});
	};

	_this.action = function(link, to_popstate) {
		$.ajax({
			url: link,
			dataType: "html",
			beforeSend: function(){
				$(_this.options.trigger).off("click vclick");
				
				if(typeof viv !== "undefined"){
					viv.stop();
					setTimeout(function(){
						viv.destroy();
					}, 400);
				};

				$(_this.options.pages).addClass("transfer-pages pages-out");
				
				$(".root_frame").off("scroll");
			},
			success: function(content){
				if(to_popstate !== false) {
					_this.history(link)
				}
				var fragment = $(content).find(".js-ajx");
				// var bredcrumbs = $(content).find(".breadcumbs-inner").html();
				var fragmentContent = fragment.parent().html();
				var menu = $(content).find(".menu-elements").html();
				// if(!fragment.data("pages")) {
				// 	$(_this.options.breadcumbs).removeClass("show");
				// }
				setTimeout(function(){
					$(".js-ajx").parent().html(fragmentContent).promise().done(function(){
						console.log("Congratulations! AJAX success!");
						$(".root_frame").scrollTop(0);
						$(_this.options.menu).html(menu);
						// $(_this.options.breadcumbs).find(".breadcumbs-inner").html(bredcrumbs);
						_this.initHandler();
						_this.options.isAnimation = false;
						// if(fragment.data("pages")) {
						// 	$(_this.options.pages).addClass("inner-page");
						// 	$(_this.options.constantSection).addClass("inactive");
						// } else {
						// 	$(_this.options.pages).removeClass("inner-page");
						// 	$(_this.options.constantSection).removeClass("inactive");
						// }
						setTimeout(function(){
							// if(fragment.data("pages")) {
							// 	$(_this.options.breadcumbs).addClass("show");
							// } else {
							// 	$(_this.options.breadcumbs).removeClass("show");
							// }
							$(_this.options.pages).removeClass("pages-out").addClass("pages-in");
							// menu()
							_this.checkTransition();
							// $(".js-slider-one-slide").slick("setPosition");
							menu = new Menu();
						}, 500);
						// scrolls.scrollUpdate(true);
						modalsProject.updateModal();						
						
					});
				},600);
			}
		});
	};

	_this.checkTransition = function(){
		$(_this.options.pages).on("animationend", function(e){
			var _ = $(this);
			_.removeClass("pages-in");
			setTimeout(function(){
				_.removeClass("transfer-pages");
				_.off("animationend");
			}, 400);
		});
	}

	_this.history = function(url) {
		window.history.replaceState("page" + url, document.title, location.href);
		window.history.pushState("page" + url, document.title, url);
	};

	_this.browserState = function(){
		$(window).bind("popstate", function(e){
			var pageState = document.location;

			_this.action(pageState, false);
		})
	};

	_this.initHandler();
	_this.browserState();

};

function actionContent() {
	var container = $(".variable-section");
	var constant = $(".constant-section");

	constant.on("mouseenter", function(){
		if($(".pages").hasClass("inner-page")) {
			container.addClass("transition");
			$(this).removeClass("inactive").addClass("open-side");
		}
	});
	constant.on("mouseleave", function(){
		if(container.hasClass("transition")) {
			container.removeClass("transition");
			$(this).addClass("inactive").removeClass("open-side");
		}
	});
};

function initSlickSlider() {

	$(".js-slider-one-slide").on("init", function(){
		// $(this).slick("setPosition");

	})

	$(".js-slider-one-slide").slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		dots: false,
		arrows: true,
		infinite: false
	});

	$(".js-slider-prev").on("click", function(){
		$(".js-slider-one-slide").slick("slickPrev");
		if ($(".js-slider-one-slide").find(".slick-prev").hasClass("slick-disabled")) $(".js-slider-prev").addClass("disable")
		else $(".js-slider-prev").removeClass("disable")
		if ($(".js-slider-one-slide").find(".slick-next").hasClass("slick-disabled")) $(".js-slider-next").addClass("disable")
		else $(".js-slider-next").removeClass("disable")
	})
	$(".js-slider-next").on("click", function(){
		$(".js-slider-one-slide").slick("slickNext");
		if ($(".js-slider-one-slide").find(".slick-prev").hasClass("slick-disabled")) $(".js-slider-prev").addClass("disable")
		else $(".js-slider-prev").removeClass("disable")
		if ($(".js-slider-one-slide").find(".slick-next").hasClass("slick-disabled")) $(".js-slider-next").addClass("disable")
		else $(".js-slider-next").removeClass("disable")
	})
	if ($(".js-slider-one-slide").find(".slick-prev").hasClass("slick-disabled")) $(".js-slider-prev").addClass("disable")
	else $(".js-slider-prev").removeClass("disable")
	if ($(".js-slider-one-slide").find(".slick-next").hasClass("slick-disabled")) $(".js-slider-next").addClass("disable")
	else $(".js-slider-next").removeClass("disable")

}


function goToAnchors(){
	var anchorTrigger = $(".anchor-trigger");

	anchorTrigger.on("click", function(e){
		var data = $(this).attr("href");

		var positionOfTop = $(data).offset().top - 25;
		var scrollTop = $(".root_frame").scrollTop();
		

		$(".root_frame").animate({
			scrollTop: positionOfTop + scrollTop
		}, 800);

		

		e.preventDefault();
	});
};

function Modals(el) {
	this.el = el;


	this.options = {
		openClass: "modals_show",
		openClassElements: "open",
		showModal: "show-modal",
		bodyElement: "body",
		modalGoal: "[data-modals]",
		close: ".cross-modal",
		closeOverlay: "[data-modals] .scroll-content"
	}

	this.init();
}

Modals.prototype = {
	init: function(){

		this.body = document.querySelector(this.options.bodyElement);
		this.elements = document.querySelectorAll(this.el);
		this.modals = document.querySelectorAll("[data-modals]");

		this.eventHandler();
		this.initValidation(".js-validation");
		this.checkInputValue("input");
		this.checkInputValue("textarea");
		this.autoSizeTextarea();
	},
	eventHandler: function() {
		var self = this;
		// this.elements.forEach(function(element){
		// 	element.addEventListener("click", function(event){
		// 		var value = this.getAttribute("data-modal");
		// 		if(value == "modal") {
		// 			var options = this.getAttribute("data-option");
		// 			if($(".modal-items").hasClass("open")) {
		// 				self.changeForm(options);
		// 			} else {
		// 				if(this.getAttribute("data-inner")) {
		// 					self.changeFormType(options);
		// 				} else {
		// 					self.openModal(value, options);
		// 				}						
		// 			}					
		// 		} else {
		// 			self.openModal(value);	
		// 		}				
		// 		event.preventDefault();
		// 	});	
		// });
		$(this.elements).on("click", function(event){
			if(document.getElementsByTagName("body")[0].classList.contains("navigation_show")){
				document.getElementsByTagName("body")[0].classList.remove("navigation_show");
			}
			var value = this.getAttribute("data-modal");
			if(value == "modal") {
				var options = this.getAttribute("data-option");
				if($(".modal-items").hasClass("open")) {
					self.changeForm(options);
				} else {
					if(this.getAttribute("data-inner")) {
						self.changeFormType(options);
					} else {
						self.openModal(value, options);
					}
				}
			} else {
				self.openModal(value);	
			}				
			event.preventDefault();
		});
	},
	removeEventHandler: function(){
		$(this.elements).off("click");
	},
	generateEventOnCloseModals: function(){
		var self = this;
		this.close = document.querySelectorAll(this.options.close);
		this.closeOverlay = document.querySelectorAll(this.options.closeOverlay);
		this.close.forEach(function(element){
			element.addEventListener("click", function(){
				self.closeModal();
				element.removeEventListener("click", arguments.callee);
			});
		});
		this.closeOverlay.forEach(function(element){
			element.addEventListener("click", function(e){
				if(e.target.classList.contains("scroll-content")){
					self.closeModal();
					element.removeEventListener("click", arguments.callee);
				}					
			});
		});
	},
	openModal: function(goal_modal, options_modal){
		this.body.classList.add(this.options.openClass);
		this.goalElement = document.querySelector("[data-modals=" + goal_modal + "]");
		
		
		if(options_modal) {
			this.optionsElement = document.getElementById(options_modal);
			this.optionsElement.classList.add("open");
			formscroll.scrollUpdate();
		}
		this.goalElement.classList.add(this.options.openClassElements);
		this.goalElement.classList.add(this.options.showModal);

		this.generateEventOnCloseModals();
	},
	closeModal: function(){
		var self = this;
		this.body.classList.remove(this.options.openClass);
		this.modals.forEach(function(el){
			console.log(el)
			el.classList.remove(self.options.openClassElements);
		});
		setTimeout(function(){
			self.modals.forEach(function(el){
				var that = self;
				el.classList.remove(that.options.showModal);
			});				
			$(".modal-items").removeClass("open in_form out_form");
		}, 300);
	},
	initValidation: function(name_form){
		var self = this;
		var form_validate = $(name_form);
		if (form_validate.length) {
			form_validate.each(function () {
				var form_this = $(this);
				$.validate({
					form : form_this,
					borderColorOnError : true,
					scrollToTopOnError : false,
					validateOnBlur : true,
					onValidate: function($form) {
						
					},
					onError: function($form) {
					},
					onSuccess: function($form){
						if($($form).attr("id") === "registration") {
							self.changeForm($($form).find("[type='submit']").data("option"));
						}
						return false;
					}
				});
			});
		};
	},
	checkInputValue: function(tags){
		var inputs = document.getElementsByTagName(tags);

		for (var i = 0; i < inputs.length; i++) {
			var input = inputs[i];
			input.value.length > 0 ? input.classList.add("not-empty") : input.classList.remove("not-empty");
			input.addEventListener('input', function() {
				this.value.length > 0 ? this.classList.add("not-empty") : this.classList.remove("not-empty");
			});
		}
	},
	autoSizeTextarea: function(){
		$('textarea.js-auto-size').textareaAutoSize();
	},
	updateModal: function(){
		this.removeEventHandler();
		this.init();
	},
	changeForm: function(next_modal){
		$("#" + next_modal).parent().find(".open").addClass("out_form");
		this.animationend($("#" + next_modal).parent().find(".open"), $("#" + next_modal));
	},
	changeFormType: function(next_modal_type){
		var self = this;
		$("#" + next_modal_type).addClass("open").parents("[data-modals]").addClass("open " + this.options.showModal);
		$("#" + next_modal_type).parents("[data-modals]").siblings().removeClass("open");
		setTimeout(function(){
			$("#" + next_modal_type).parents("[data-modals]").siblings().removeClass(self.options.showModal);
		},300);
	},
	animationend: function(current, next){
		var self = this;
		current.on("animationend", function(){
			var _ = $(this);
			if(_.hasClass("open")) {
				next.addClass("open in_form").siblings().removeClass("open out_form");
				setTimeout(function(){
					next.removeClass("in_form");
				}, 300);
				formscroll.scrollUpdate();
			}
			_.off("animationend");
		});
	}
};

function ShowMore(el, options) {
	this.el = el;

	this.options = {
		head: ".show_more-head",
		body: ".show_more-body",
		trigger: ".show_more-trigger",
		showText: "",
		hideText: ""
	};
	this.extend = function(a, b){
		for( var key in b ) { 
			if( b.hasOwnProperty( key ) ) {
				a[key] = b[key];
			}
		}
		return a;
	}

	this.options = this.extend( {}, this.options );
	this.extend( this.options, options );

	this.init();
}

ShowMore.prototype = {
	init: function(){
		var self = this
		$(this.el).each(function(){
			self.head_element = $(this).find(self.options.head);
			self.body_element = $(this).find(self.options.body);
			self.trigger_element = $(this).find(self.options.trigger);
		});

		this.initHandler();
	},
	initHandler: function() {
		var self = this;
		this.trigger_element.on("click", function(){
			if(!$(this).hasClass("open")) {
				self.openContainer();
			} else {
				self.closeContainer();
			}
				
		});
	},
	openContainer: function(){
		var self = this;
		this.trigger_element.addClass("open");
		this.body_element.stop(true, true).slideDown({
			duration: 350,
			complete: function(){
				self.trigger_element.find("span").text(self.options.hideText);
			}
		});
	},
	closeContainer: function(){
		var self = this;

		var self = this;
		this.trigger_element.removeClass("open");
		this.body_element.stop(true, true).slideUp({
			duration: 350,
			complete: function(){
				self.trigger_element.find("span").text(self.options.showText);
			}
		})
	}
};

function tabsload(){
	var container = $(".tab-container"),
		item = container.find(".anchor-trigger");
		

	item.on("click", function(e){
		
		var _ = $(this),
			value = _.attr("href");
		if(_.parent().hasClass("active")) {
			return false;
		}

		_.parent().addClass("active").siblings().removeClass("active");
		
		$.ajax({
			url: value,
			dataType: "html",
			beforeSend: function(){
				$(".js-container_load").addClass("hide");
			},
			success: function(content) {
				setTimeout(function(){
					var cont = $(content).find(".js-container_load");
					$(".js-container_load").html(cont).promise().done(function(){
						$(this).removeClass("hide");
						var inputItem = $(".js-container_load").find("input");
						if(inputItem.length) {
							changeInput(inputItem);
							modalsProject.initValidation(".js-validation-personal")
						}
					});
				}, 400);
			}
		})
		return false;
		e.preventDefault();
	});
};

function country(){
	var item = $(".country-item"),
		map = $(".map-container");

	item.on("click", function(){
		var _ = $(this),
			ID = _.data("id");

		map.find("[data-id=" + ID + "]").addClass("open");
	});
	item.on("mouseleave", function(){
		map.children().removeClass("open");
	})
};
function getBgForCountry(){
	var mapPosBottom, mapPosTop;
	var content = document.querySelector(".container-content");
	var height = $(window).height() / 2;
	mapDetectedfunction();
	$(".root_frame").on("scroll", function(){
		mapDetectedfunction();
	});


	function mapDetectedfunction(){
		mapPosBottom = document.querySelector(".section_map").getBoundingClientRect().bottom;
		mapPosTop = document.querySelector(".section_map").getBoundingClientRect().top;
		if(mapPosTop < height  && mapPosBottom > height) {
			content.classList.add("bg-color");
		} else if(mapPosTop < height && mapPosBottom < height) {
			content.classList.remove("bg-color");
		} else if(mapPosTop > height && mapPosBottom > height) {
			content.classList.remove("bg-color");
		}
	};
};
function changeInput(input) {
	input.each(function(){
		var _ = $(this);
		if(_.val().length > 0) {
			_.addClass("not-empty");
		}
		_.on("input", function(){
			var _val = $(this).val();

			_val.length > 0 ? $(this).addClass("not-empty") : $(this).removeClass("not-empty");
		});
	});
}

function initMap(){
	$(window).bind(initialize());
}

function initialize(){
	var spin = {
		single: "../img/icons/pin.png",
		multiple: "../img/icons/pin-2.png"
	}

	var coordArr = [];
	var _icon = null;

	var coord = $("#map").data("coord").split(";");

	coord.forEach(function(item){
		coordArr.push(item.split(","));
	});

	coordArr.forEach(function(item,i,arr){
		if(item.length <=1 || !item[0] || !item[1]){
			arr.splice(i, i + 1);
		}
	});

	var coordLength = coordArr.length;

	if(coordLength > 1 ){
		_icon = spin.multiple;
	} else {
		_icon = spin.single;
	}

	var styleJSON = [{"featureType": "administrative","elementType": "labels.text.fill","stylers": [{"color": "#444444"}]},{"featureType": "landscape","elementType": "all","stylers": [{"color": "#f2f2f2"}]},{"featureType": "poi","elementType": "all","stylers": [{"visibility": "off"}]},{"featureType": "road","elementType": "all","stylers": [{"saturation": -100},{"lightness": 45}]},{"featureType": "road.highway","elementType": "all","stylers": [{"visibility": "simplified"}]},{"featureType": "road.arterial", "elementType": "labels.icon","stylers": [{"visibility": "off"}]},{"featureType": "transit","elementType": "all","stylers": [{"visibility": "off"}]},{"featureType": "water","elementType": "all","stylers": [{"color": "#f7fafb"},{"visibility": "on"}]}];
	
	var mapOptions = {
		zoom: 14,
		disableDefaultUI: true,
		scrollwheel: false,
		panControl: false,
		zoomControl: true,
		zoomControlOptions: {
			style: google.maps.ZoomControlStyle.SMALL,
			position: google.maps.ControlPosition.RIGHT_BOTTOM
		},
		scaleControl: true,
		// center: new google.maps.LatLng(53.913332, 27.567922)
	}

	map = new google.maps.Map(document.getElementById('map'),mapOptions);
	var mapType = new google.maps.StyledMapType(styleJSON, { name:"Grayscale" });
	map.mapTypes.set('tehgrayz', mapType);
	map.setMapTypeId('tehgrayz');

	coordArr.forEach(function(item, i){
		var marker = new google.maps.Marker({
	    	    position: {
	    	    	lat: parseFloat(item[0]),
	    	    	lng: parseFloat(item[1])
	    	    },
	    	    map: map,
	    	    visible: true,
	    	    zIndex: (i + 1),
				icon: _icon
	    	});
	});

	if(coordLength > 1) {

		var bounds = new google.maps.LatLngBounds();

		
		for(var i = 0;  i < coordLength; i++){
			var latlng = new google.maps.LatLng(coordArr[i][0], coordArr[i][1]);
			bounds.extend(latlng);
		}

		map.fitBounds(bounds);
	} else {
		map.setCenter(new google.maps.LatLng(coordArr[0][0], coordArr[0][1]));
	}
	var timer;
	google.maps.event.addDomListener(window, "resize", function() {
		var center = map.getCenter();
		google.maps.event.trigger(map, "resize");
		map.setCenter(center);
		if(coordLength > 1) {
			map.fitBounds(bounds);
		}
		clearTimeout(timer);
		timer = setTimeout(function(){			
			
		},100);			
	});
}

function googleMaps(){
	var script_tag = document.createElement("script");
	if(typeof(google) != "object") {
		script_tag.setAttribute("type", "text/javascript");
		script_tag.setAttribute("src", "https://maps.googleapis.com/maps/api/js?key=AIzaSyCcDrkEbKdrAWUT7ZorYyn-NwTj9YD6DN4&language=en&callback=initMap");
		document.getElementById("map").appendChild(script_tag);
	} else {
		$(initialize);
	}
};


$(document).ready(function(){
	// init menu
	menu = new Menu();
	actionContent();
	modalsProject = new Modals("[data-modal]");
});