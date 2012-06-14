// picsCollector class constructor
var PicsCollector = function(){

    this.visible = false;
    
    this.toggle = function() 
    {
	console.log("toggle");
	if(this.visible == false) {
	    this.show();
	}else{
	    this.hide();	    
	}
    };

    this.show = function() 
    {
	this.createViewer();
	this.visible = true;
    };

    this.hide = function()
    {
	$('.psElements').hide(100);
	this.visible = false;
    };

    this.viewer = null;

    this.createViewer = function()
    {
    	var viewer = document.createElement('div');
	var container = document.createElement('div');
	var insole = document.createElement('div');
	
	this.viewer = viewer;

	// $BGX7J$KF)2a2hA|$rI=<((B
    	viewer.className = 'fixed psElements';
	viewer.id = 'picsViewer';
	container.id = 'psContainer';
	insole.id = 'psInsole';
	insole.className = 'psElements';
	var innerhtml = $('*').each(function() {
	    console.log('not empty ' + $(this).html());
	});
	var innerhtml = $('*:empty').each(function() {
	    console.log('empty ' + $(this).html());
	});

	//var pictureUrls = new Array();
	// URL$B$N=EJ#$r<h$j=|$/$?$a$K%O%C%7%e%F!<%V%k$K$9$k!#(B
	var pictureUrls = {};
	// URL$B$rI=$9@55,I=8=(B
	var urlExp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;
	
	// $B8=:_$N%Z!<%8Cf$NA4$F$N%F%-%9%H$+$i(BURL$B$rH4$-=P$9(B
	text = document.body.innerHTML;

	var urls = text.match(urlExp);
	for(var i in urls) {
	    var url = urls[i];
	    // $B2hA|$N%j%s%/$@$1H4$-=P$9(B
	    if(url.match(/.*\.(jpg|png|gif)/)) {
		pictureUrls[url]=url;
	    }
	}
	// Local$B$J2hA|$N(BLocation$B$b4^$^$;$k(B
	// url = this.src$B$H$7$?=V4V$KC;=L%Q%9$,(BURL$B$KJQ49$5$l$k$h$&$@$,(B
	$('img').each(function(){
	    url = this.src;
	    pictureUrls[url]=url;
	});
	
	var texts = document.body.text;
	
	//console.log(document.all(0).innerText);
	
	for (var url in pictureUrls) {
	    console.log(url);
	    var frame = this.createPicsFrame(url);
	    container.appendChild(frame);
	}
	insole.appendChild(container);
	document.body.appendChild(insole);
	document.body.appendChild(viewer);
	// flash$B$,(Bz-index$B$rL5;k$7$F$-$F$&$6$$$N$G>C$9(B
	$('embed').hide();
	// wookmark$B$r;HMQ$7$F2hA|$r=D$KI_$-5M$a$k(B
	$('#psContainer .frame').wookmark();
	// $B%Z!<%8$N:G>eIt$X0\F0(B
	window.scrollTo(0,0);
	// $B%[%P!<F0:n(B
	$('.frame').hover(
	    function(){
		// $B2hA|$N%5%$%:I=<((B
		var naturalHeight,naturalWidth;
		$(this).find('.picture').each(
		    function(){
			naturalWidth = this.naturalWidth;
			naturalHeight = this.naturalHeight;
		    }
		);
		$(this).append('<div class=hoverFrame>'+naturalWidth+'x'+naturalHeight+'<div>');
	    },
	    function(){
		$(this).find('.hoverFrame').remove();
	    }
	);
    };
    
    this.createPicsFrame = function(url)
    {
	var frame = document.createElement('div');
	frame.className = 'frame';
	var link = document.createElement('a');
	var img = document.createElement('img');
	
	link.href = url;
	img.src = url;
	img.className = 'picture';
	link.appendChild(img);
	frame.appendChild(link);
	return  frame;
    };
    
};

var picsCollector = new PicsCollector();
/* $B%Z!<%8$NFI$_9~$_$,=*$o$C$?$"$H$K8F$S=P$5$l$k4X?t(B */

// $B%Z!<%8$NFI$_9~$_$,40N;$9$k$N$rBT$D(B
if(window.addEventListener){
    window.addEventListener("load", function(){
    }, false);
}
