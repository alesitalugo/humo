/* jshint browser: true, strict: true, undef: true */
/* jshint camelcase: false */
'use strict';

var menu_show = 0;
$('#show_responsive_menu').on('click', function(){
	$(this).addClass('active');
	if(menu_show === 0){
		$('#responsive_nav_container').animate({'height': '90px'});
		$('#nav').fadeIn(1000);
		menu_show = 1;
		console.log(menu_show);

	} else if(menu_show === 1){
		$('#responsive_nav_container').animate({'height':'0px'});
		$('#nav').fadeOut(0);
		menu_show = 0;

		console.log(menu_show);

	}
});

$('.filter-list li a').on('click', function(){
	var categoryToShow = $(this).data('category');
	var itemShow = $('#container_games').find('.'+categoryToShow);
	console.log(categoryToShow, itemShow);
	if($(itemShow).hasClass('categoryToShow')){
		$('.item_game').hide();
		//$('.'+categoryToShow).show();
	}
});

var slider_images = function( el ){
	var scroll = $(el).find('.slider_images_scroll');
	var slide_width = $(el).width();
	var slide_num = $(el).find('.slide').length;
	var slide_actual = 0;
	return {
		'next_slide': function(){
			if( ( slide_actual + 1 ) < slide_num ){
				slide_actual++;
				$(scroll).animate( {'left': ( -slide_width * slide_actual )+'px' } );
			} else {
				var first_image = $(scroll).find('.slide:first-child');
				first_image.remove();
				$(scroll).css( {'left': (-slide_width * (slide_actual -1 ))+'px' } ).stop().append(first_image).animate( {'left': (-slide_width * slide_actual)+'px' } );
			}
		},
		'init': function(){
			var that = this;
			$(scroll).width( slide_num * slide_width );
			$(scroll).find('.slide').width( slide_width );
			window.setInterval( function(){ that.next_slide(); }, 4000);
		}
	};
};

var home_images_slider = slider_images( document.getElementById('main_slider') );
home_images_slider.init();


var available_slider = function( el ){
	var scroll = $(el).find('.available_slider_scroll');
	var slide_width = 345;
	var slide_num = $(el).find('.slide').length;
	var slide_actual = 0;
	return {
		'next_slide': function(){
			var slide_left = $(el).find('.slide_left');
			var slide_right = $(el).find('.slide_right');
			$(slide_left).next('.slide').addClass('slide_left');
			$(slide_right).next('.slide').addClass('slide_right');

			var first_image = $(scroll).find('.slide:first-child');
			first_image.remove();
			$(scroll).css( {'left': (-slide_width * (slide_actual -1 ))+'px' } ).stop().append(first_image).css( {'left': (-slide_width * slide_actual)+'px' } );

			$(slide_left).removeClass('slide_left');
			$(slide_right).removeClass('slide_right');

		},
		'prev_slide': function(){
			var slide_left = $(el).find('.slide_left');
			var slide_right = $(el).find('.slide_right');
			$(slide_left).prev('.slide').addClass('slide_left');
			$(slide_right).prev('.slide').addClass('slide_right');

			var last_image = $(scroll).find('.slide:last-child');
			last_image.remove();
			$(scroll).css( {'left': (slide_width * (slide_actual-1 ))+'px' } ).stop().prepend(last_image).css( {'left': (slide_width * slide_actual)+'px' } );

			$(last_image).addClass('slide_left');
			$(slide_left).removeClass('slide_left');
			$(slide_right).removeClass('slide_right');

		},
		'init': function(){
			//var that = this;
			if( $(window).width() > 1100 ){
				this.slide_width = 345;
			}
			if( $(window).width() < 1100 ){
				this.slide_width = 305;
			}
			$(scroll).width( slide_num * slide_width );
			//window.setInterval( function(){ that.prev_slide(); }, 2000);
		}
	};
};

var available_slider_home = available_slider( document.getElementById('available_slider') );
available_slider_home.init();

var parallax = function( el, y ){
	$(el).css( { 'background-position-y': -(y/2) } );
};

$( window ).on('scroll', function(){
	var doc = document.documentElement, body = document.body;
	var posy = (doc && doc.scrollTop  || body && body.scrollTop  || 0);
	parallax( $('.parallax_image'), posy );
});



