$(document).ready(function(){

var a = {};

a.settings = {
	url: 'http://localhost/',
	speed: 400,
	easing: 'easeInOutCubic'
},

a.ui = {
	body: $('body'),
	win: $(window)
},

a.sizes = {},

a.site = {

	init: function(){
		this.getSizes();
		a.helpers.checkMediaQuery();
		a.helpers.whichTransition();
		this.bindEvents();
		this.setInitialState();
		this.startTabletop();
	},

	getSizes: function(){
		a.sizes.winWidth = a.ui.win.width();
		a.sizes.winHeight = a.ui.win.height();
	},

	bindEvents: function(){
		a.ui.win.on('resize', this.resize);
	},

	setInitialState: function(){
		if(history.replaceState){
			history.replaceState({
				state: 'type-of-state',
				url: window.location.href
			}, null, null);
		}
	},

	resizeTimer: null,
	resize: function(){
		clearTimeout(this.resizeTimer);
		this.resizeTimer = setTimeout(function(){
			a.site.getSizes();
			a.helpers.checkMediaQuery();
		}, 250);
	},

	sheet: null,
	startTabletop: function(){
		Tabletop.init({
			key: '1x1M2mwl7eSxDxuKrrQ0B6eNCBHqzaaGZOZrtwvZyNyM',
			callback: function(data, tabletop){
				a.site.sheet = data;
				console.log(a.site.sheet);
			}, simpleSheet: true});
	}

}

a.nav = {

	init: function(){
		this.bindEvents();
	},

	bindEvents: function(){
		
	}

}

a.helpers = {

	init: function(){
		this.easeFunctions();
		this.checkBrowser();
		this.checkInternalLinks();
	},

	checkMediaQuery: function(){
		var mediaCheck = $('.media-check').css('text-indent');
		if(mediaCheck === '10px'){a.sizes.media = 'mobile';} 
		else if(mediaCheck === '20px'){a.sizes.media = 'tablet';} 
		else if(mediaCheck === '30px'){a.sizes.media = 'desktop';} 
		else if(mediaCheck === '40px'){a.sizes.media = 'xl';} 
		else if(mediaCheck === '50px'){a.sizes.media = 'xxl';} 
		else {a.sizes.media = 'unsure';}
	},

	rdm: function(min,max){
		return Math.floor(Math.random()*(max-min+1)+min);
	},

	/* Run function once after CSS transtion ended eg. 
	$(el).one(a.helpers.whichTransition, function(e){
		console.log('Transition complete!  This is the callback!');
	}); */
	whichTransition: function(){
		var el = document.createElement('fakeelement');
		var transitions = {
			'animation':'transitionend',
			'OAnimation':'oTransitionEnd',
			'MSAnimation':'MSTransitionEnd',
			'WebkitAnimation':'webkitTransitionEnd'
		};

		for(var t in transitions){
			if(transitions.hasOwnProperty(t) && el.style[t] !== undefined){
				a.settings.transition = transitions[t];
			}
		}
	},

	easeFunctions: function(){
		$.extend(jQuery.easing,{
			linear: function (t) { return t },
			easeInQuad: function (t) { return t*t },
			easeOutQuad: function (t) { return t*(2-t) },
			easeInOutQuad: function (t) { return t<.5 ? 2*t*t : -1+(4-2*t)*t },
			easeInCubic: function (t) { return t*t*t },
			easeOutCubic: function (t) { return (--t)*t*t+1 },
			easeInOutCubic: function (t) { return t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1 },
			easeInQuart: function (t) { return t*t*t*t },
			easeOutQuart: function (t) { return 1-(--t)*t*t*t },
			easeInOutQuart: function (t) { return t<.5 ? 8*t*t*t*t : 1-8*(--t)*t*t*t },
			easeInQuint: function (t) { return t*t*t*t*t },
			easeOutQuint: function (t) { return 1+(--t)*t*t*t*t },
			easeInOutQuint: function (t) { return t<.5 ? 16*t*t*t*t*t : 1+16*(--t)*t*t*t*t },
			easeInElastic: function (t) { return (.04 - .04 / t) * Math.sin(25 * t) + 1 },
			easeOutElastic: function (t) { return .04 * t / (--t) * Math.sin(25 * t) },
			easeInOutElastic: function (t) { return (t -= .5) < 0 ? (.01 + .01 / t) * Math.sin(50 * t) : (.02 - .01 / t) * Math.sin(50 * t) + 1 }
		});
	},

	oldBrowser: false,
	history: false,
	checkBrowser: function(){
		if (Modernizr.history && Modernizr.cssanimations && Modernizr.cssgradients && Modernizr.csstransforms && Modernizr.csstransitions && Modernizr.borderradius && !$('html').hasClass('lt-ie9')){
			a.helpers.oldBrowser = false;
			a.helpers.history = Modernizr.history;
		} else {
			a.helpers.oldBrowser = true;
			a.helpers.history = Modernizr.history;
			var browserMessage = $("<div style='position:fixed !important; bottom:0 !important; left:0 !important; font-family:Arial, sans-serif !important; font-size:14px !important; background:#fff !important; padding:10px !important; line-height:20px !important; z-index:100001 !important; color:#000 !important; cursor:pointer !important;'>Your browser doesn't support all of the features this site requires, so it may not function as intended. Please upgrade to a newer browser.</div>");
			$('body').append(browserMessage);
			$(document).one('click', browserMessage, function(){browserMessage.remove();});
		}
		/* Check for Chrome */
		if(window.chrome){
			a.helpers.chrome = true;
			$('html').addClass('browser-chrome');
		} else {
			a.helpers.chrome = false;
		}
	},

	checkInternalLinks: function(){
		$('a[href^="' + a.settings.url + '"]').addClass('internal');
	}

}

a.helpers.init();
a.site.init();
a.nav.init();

});