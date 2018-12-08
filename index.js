(() => {

	"use strict";

	const key = 86;
	const constraints = { audio: false, video: { width: 1280, height: 720 } }; 
	const styleon = "width:100%;opacity:1.0;z-index:-1; position: absolute; top: 0; left: 0;";
    const styleoff = "opacity: 0.0;";

	let vid;
	let on = false;

    function gmError(e) {
		console.log("Media Error",e);
	}

    function gmSuccess(stream) {
		vid.setAttribute("style", styleon);
		vid.srcObject = stream;
		vid.onloadedmetadata = function(e) {
		  vid.play();
		};
	}

	function injectVid() {
		const v = document.createElement("video");
		v.id='viddybg';
		v.style=styleoff;
		document.body.appendChild(v);
		return v;
	}

	function togglePlayer(ev) {
		vid = vid || injectVid();
		if (on) {
			vid.style = styleoff;
			vid.pause();
			delete video.src;
		} else {

			navigator.mediaDevices
				.getUserMedia(constraints)
				.then( gmSuccess, gmError )
		}
		on = !on;
	}

	function keyHandler(e) {
		if (e.altKey && e.ctrlKey && e.keyCode == key) {
			togglePlayer();
		}
	};


	window.addEventListener("keydown", keyHandler, false);

})();