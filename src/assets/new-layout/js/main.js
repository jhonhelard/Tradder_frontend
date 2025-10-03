(function($){
	"use strict";

	$(window).on('load', function(){
	//===== Prealoder
	    $('.preloader--wrapper').delay(500).fadeOut(500);
		});
	// dark/light toggler on reload
	$(document).ready(function(){
		// if(localStorage.getItem("theme") == "dark"){
		// 	document.getElementById("checkbox").checked = true;
		// 	document.getElementById("checkbox2").checked = true;
		// 	localStorage.setItem("theme", "dark");
		// 	$('body').addClass('dark--active');
		// 	$('.logo img').attr('src', 'assets/images/logo-white.png');
		// }

		// ==== Sticky menu ====
		$(window).on('scroll', function(){
			$('header').toggleClass('active', $(this).scrollTop() > 20);
			$('.back-to-top').toggleClass('top-btn-active', $(this).scrollTop() > 300);
		})

		// Hamburger Menu
		$('.hamburger-menu').on('click', function () {
	        $('.line-top, .line-center, .line-bottom').toggleClass('current');
	        $('.mobile--menu--wrapper').toggleClass('show-menu');
	        $('.back-to-top').toggleClass('hide');
			$('body').toggleClass('show-menu-mobile');
	    })

		// Dropdown Menu
		$('.item-mobile-dropdown').on('click', function () {
			$('.line-top, .line-center, .line-bottom').toggleClass('current');
			$('.mobile--menu--wrapper').toggleClass('show-menu');
			$('.back-to-top').toggleClass('hide');
			$('body').toggleClass('show-menu-mobile');
		})

		 //Animate the scroll to yop
	    $('.back-to-top').on('click', function (event) {
	    	event.preventDefault();
	        $('html, body').animate({
	            scrollTop: 0,
	        }, 500);
	    });
	    // dark/light toggler
	    // $('.checkbox-label').on('click', function(){
	    // 	if(localStorage.getItem("theme") !== "dark"){
	    // 		localStorage.setItem("theme", "dark");
	    // 		$('body').addClass('dark--active');
	    // 		$('.logo img').attr('src', 'assets/images/logo-white.png');
	    // 	}else{
	    // 		localStorage.setItem("theme", "light");
	    // 		$('body').removeClass('dark--active');
	    // 		$('.logo img').attr('src', 'assets/images/logo.png');
	    // 	}
	    	
	    // });
	    // mobile dropdown
	    $('.mobile--menu li.dropdown--toggle>a').on('click', function(e){
	    	e.preventDefault();
	    	$('.dropdown--menu').toggleClass('active-dropdown');
	    })
	    // a[href="#"] preventDefault
	    $('a[href="#"]').on('click', function(e){
	    	e.preventDefault();
	    })
	});


})(jQuery);