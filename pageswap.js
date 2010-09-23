
	function tn(x) {return document.getElementsByTagName(x);}
	function c(e) { 
		return document.createElementNS ? 
		document.createElementNS('http://www.w3.org/1999/xhtml',e): 
		document.createElement(e); 
	}
	function a(p,e) {p.appendChild(e);}
	function R(f) { 
		if (R.D) return f();
		if (R.t) R.q.push(f); else {
		    R.q = [f];
		    R.t = setInterval(r, 13);
	}	}
	function r() {
	    if (R.D) return false;
	    if (typeof($) != 'undefined') {
			clearInterval(R.t);
	        R.t = null; 
	        for (var i=0;i<R.q.length;i++)
	        	R.q[i](); 
	        R.q = null;
	        R.D = true;
	}	}

	(function() {
		if (typeof($) != 'undefined') return false;
		var s = c("script");
		s.setAttribute("type","text/javascript");
		s.setAttribute("src","http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js");
		a(tn("head")[0],s);
	})();
	
	R(function(){
		var boxwidth = 300;
		var thebox = $("<div>").attr("id","vbox").css({
			'width'		: boxwidth, 
			'left'		: (($(window).width()/2)-(boxwidth/2)),
			'opacity'	: 0,
			'position'	: 'absolute',
			'border'	: 'solid grey 1px',
			'background-color' : 'white',
			'top'		: 100,
			'text-align': 'center',
			'padding'	: '10px',
			'font'		: '12px/16px sans-serif'
		}).append(
				'Enter URLs to Swap:'
		).append(
				$('<input>').attr({'type':'text','class':'urls'}).css({'width':"90%",'margin':'6px'}).val('http://')
		).append(
				$('<input>').attr({'type':'text','class':'urls'}).css({'width':'90%','margin':'6px'}).val('http://')
		).append(
				'<br/>'
		).append(
				$('<a>').css({'font-size':'10px','color':'blue','cursor':'pointer'}).html('add another url').click(function(){
					$('.urls').last().clone().insertAfter($('.urls').last());
				})
		).append(
				'<br/><br/>Enter Delay in Seconds:'
		).append(
				$('<input>').attr({'type':'text','id':'timeout'}).css({'width':40,'margin':'6px'}).val('10')
		).append(
				'<br/>'
		).append(
				$('<input>').attr({'type':'submit'}).css({'margin':'10px'}).click(function(){
					window.juggles = [];
					var iframe = $('<iframe>').css({'width':'100%','height':$(window).height(),'border':0}).appendTo($('body'));
					var timeout = $('#timeout').val() * 1000;
					$('.urls').each(function(){
						var url = $(this).val();
						if (url!="") window.juggles.push(url);
					});
					window.juggler = function(idx){
						iframe.attr('src',window.juggles[idx]);
						idx++;
						typeof(window.juggles[idx]) != 'undefined' ? setTimeout(function(){window.juggler(idx);}, timeout) : setTimeout(function(){window.juggler(0);}, timeout);
					};
					window.juggler(0);
					thebox.fadeOut();
				})
		).appendTo($("body").css('margin',0)).fadeTo('slow',0.9);
	});


