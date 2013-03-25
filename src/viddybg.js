var rdfx = rdfx || {};
rdfx.viddybg = (function() {

  var
	key = 86, // keycode 86 for v
	video,
	stream,
	on = false,
    width = 320,
    height = 0,
    styleon = "width:100%;opacity:1.0;z-index:-1; position: absolute; top: 0; left: 0;",
    styleoff = "opacity: 0.0;",
	config = {
		video: true,
		audio: false
    },

    gmError = function(e) {
		console.log("Media Error",e);
	},

    gmSuccess = function(s) {
		stream = s;
		video.setAttribute("style", styleon);
		if (navigator.mozGetUserMedia) {
			video.mozSrcObject = stream;
		} else {
			var vendorURL = window.URL || window.webkitURL;
			video.src = vendorURL.createObjectURL(stream);
		}
		video.play();
	},

	injectVid = function() {
		document.body.innerHTML += "<video id='viddybg' style='"+styleoff+"'></video>";
		return document.querySelector('#viddybg');
	},

	togglePlayer = function(ev) {
		video = video || injectVid();
		if (on) {
			video.setAttribute("style", styleoff);
			video.pause();
			delete video.src;
		} else {
			navigator.getMedia( config, gmSuccess, gmError );
		}
		on = !on;
	},

	keyHandler = function(e) {
		var keyCode = e.keyCode || e.charCode;
		if (e.shiftKey && e.ctrlKey && e.keyCode == key) {
			togglePlayer();
		}
	};

	navigator.getMedia = (
		navigator.getUserMedia ||
		navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia
	);

	window.addEventListener("keydown", keyHandler, false);

})();