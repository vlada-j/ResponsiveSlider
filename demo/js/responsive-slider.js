/*
 * jQuery ResponsiveSlider v1.0
 * https://github.com/vlada-j/ResponsiveSlider
 *
 * Copyright 2013, Vlada Janosevic
 * http://www.vladajanosevic.info/
 * Free to use and change
 *
 * Required: jQuery 1.7.1
 */

(function($) {
	var ResponsiveSlider = function(element, options){
		var settings = $.extend({}, $.fn.responsiveSlider.defaults, options);

		var vars = {
			currentSlide: 0,
			totalSlides: 0
		};

		var $this = $(element),
			slides=	$this.children(),
			nav=	$('<div class="slide-navigation"/>'),
			preBTN=	$('<a class="pre"/>'),
			nexBTN=	$('<a class="nex"/>'),
			links=	[],
			current=0;
		$this.data('slider:vars', vars).addClass('responsiveSlider');
		
		function getSlide(n){
			return $(slides[n]); };

		function slide(target) {
			var s='%',
				e='%';
			if(current===target) { return; }

			if(current<target) {
				s=100+s; e=-100+e;
			} else {
				s=-100+s; e=100+e;}

			var currSl=getSlide(current),
				targSl=getSlide(target);
			currSl.css('left','0%');
			targSl.css('left',s);
			currSl.show();
			targSl.show();
			currSl.animate({left:e},500);
			targSl.animate({left:'0%'},500, function(){complete(target);});
		};

		function complete(n){
			current=n;
			slides.hide();
			$(links).removeClass('selected');
			getSlide(current).show();
			$(links[current]).addClass('selected');	};


		nav.append(preBTN);
		for(var i=0;i<slides.length;i+=1) {
			var bul=$('<a class="bulet"/>');
			links.push(bul);
			nav.append(bul);
		}
		nav.append(nexBTN);
		links=nav.children('.bulet');
		links.click(function(e){
				slide( links.index(e.currentTarget) );
			});
		$this.append(nav);

		preBTN.click(function(){
			slide( current===0?slides.length-1:current-1 ); });

		nexBTN.click(function(){
			slide( current===slides.length-1?0:current+1 ); });


		$(links[current]).addClass('selected');
		getSlide(current).show();

		return this;
	};


	$.fn.responsiveSlider = function(options) {
		return this.each(function(key, value){
			var ele = $(this);
			if(ele.data('ResponsiveSlider')) {
				return ele.data('ResponsiveSlider'); }
			else {
				var rSlider = new ResponsiveSlider(this, options);
				ele.data('ResponsiveSlider', rSlider);
			}
		});
	};


	//Default settings
	$.fn.responsiveSlider.defaults = {
		effect: 'slide',
		animSpeed: 500,
		pauseTime: 3000,
		startSlide: 0,
		control: true,
		buttons: true,
		pauseOnHover: true,
		randomStart: false,
		beforeChange: function(){},
		afterChange: function(){},
		slideshowEnd: function(){},
		lastSlide: function(){},
		afterLoad: function(){}
	};
})(jQuery);
