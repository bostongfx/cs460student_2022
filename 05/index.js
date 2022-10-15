function a05start(r1, r2) {
	console.log("loading assignment 5...");
	console.log('r1',r1);
	console.log('r2',r2);

	initXTK(r1);
}

function initXTK(r1) {
	console.log('initializing xtk');
	var r = new X.renderer3D();
	r.container='r1';
	r.init();
	var c = new X.cube();
	r.add(c);
	r.camera.position = [-100, -100, 200];
	r.camera.focus = [0, 0, 0];
	r.render();
}