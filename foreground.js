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

	// 背景に透過画像を表示
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
	// URLの重複を取り除くためにハッシュテーブルにする。
	var pictureUrls = {};
	// URLを表す正規表現
	var urlExp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;
	
	// 現在のページ中の全てのテキストからURLを抜き出す
	text = document.body.innerHTML;

	var urls = text.match(urlExp);
	for(var i in urls) {
	    var url = urls[i];
	    // 画像のリンクだけ抜き出す
	    if(url.match(/.*\.(jpg|png|gif)/)) {
		pictureUrls[url]=url;
	    }
	}
	// Localな画像のLocationも含ませる
	// url = this.srcとした瞬間に短縮パスがURLに変換されるようだが
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
	// flashがz-indexを無視してきてうざいので消す
	$('embed').hide();
	// wookmarkを使用して画像を縦に敷き詰める
	$('#psContainer .frame').wookmark();
	// ページの最上部へ移動
	window.scrollTo(0,0);
	// ホバー動作
	$('.frame').hover(
	    function(){
		// 画像のサイズ表示
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
/* ページの読み込みが終わったあとに呼び出される関数 */

// ページの読み込みが完了するのを待つ
if(window.addEventListener){
    window.addEventListener("load", function(){
    }, false);
}
