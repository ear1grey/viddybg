window.addEventListener("load", () => {

	"use strict";

	const key = 86;
	const constraints = { audio: false, video: { width: 1280, height: 720 } }; 
    const styleoff = "opacity: 0.0;";
	const vid = injectVid();

	let on = false;

    function resizer() {
		console.log("Resizing");
		
		const midximg = vid.clientWidth/2;
		const midxpage = document.body.clientWidth/2;
		const xoff = midxpage-midximg;
		const styleon = `opacity:1.0; min-width:100%; min-height:100%; z-index:-1; position: absolute; top: 0; left: ${xoff}px;`;
		vid.setAttribute("style", styleon);
	}

    function gmError(e) {
		console.log("Media Error",e);
	}

    function gmSuccess(stream) {
		vid.srcObject = stream;
		vid.onloadedmetadata = function(e) {
			vid.play();
			resizer();
		};
	}

	function injectVid() {
		const d = document.createElement("div");
		d.style="overflow: hidden; position: absolute; top: 0; left: 0; width: 100vw; height: 100vh;";
		const v = document.createElement("video");
		v.id='viddybg';
		v.style=styleoff;
		d.appendChild(v);
		document.body.insertBefore(d, document.body.firstElementChild);

		v.addEventListener("playing", () => {
			setTimeout(resizer, 50);
		});

		return v;
	}

	function togglePlayer(ev) {
		if (on) {
			vid.style = styleoff;
			vid.pause();
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


	window.addEventListener("keydown", keyHandler);
	window.addEventListener("resize", resizer);

	togglePlayer();
});