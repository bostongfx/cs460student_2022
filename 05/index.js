function a05start(r1, r2) {
	console.log("loading assignment 5...");
	console.log('r1',r1);
	console.log('r2',r2);

	initXTK(r1);
	initThreeJS(r2);
}

function initXTK(container) {
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

function initThreeJS(container) {
	console.log('initializing Three.js');
	scene = new THREE.Scene();

	// set up camera
	let fov = 75;
	let ratio = container.clientWidth / container.clientHeight;
	let zNear = 1;
	let zFar = 10000;
	camera = new THREE.PerspectiveCamera(fov, ratio, zNear, zFar);
	camera.position.set( 0, 0, 100);

	// set up renderer
	renderer = new THREE.WebGLRenderer({antialias:true});
	renderer.setSize( container.clientWidth, container.clientHeight );
	container.appendChild(renderer.domElement );

	// set up lighting
	ambientLight = new THREE.AmbientLight( 0x404040 );
	scene.add( ambientLight );

	light = new THREE.DirectionalLight( 0xffffff, 5.0);
	light.position.set( 10, 100, 10 );
	scene.add(light);

	// Add a cube
	geometry = new THREE.BoxGeometry( 20, 20, 20);
	material = new THREE.MeshStandardMaterial({ color: 0xffffff });
	cube = new THREE.Mesh( geometry, material);
	scene.add(cube);

	// Trackball
	controls = new THREE.TrackballControls( camera, container );

	animate();
}

function animate() {
	requestAnimationFrame(animate);

	controls.update();

	renderer.render(scene, camera);
}