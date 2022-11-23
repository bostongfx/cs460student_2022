<html>
<head>
	<meta charset="UTF-8" />
	<style>
		html, body {
			background-color: #000;
			margin: 0;
			padding: 0;
			height: 100%;
			overflow: hidden !important;
			/*
			background-image: url(img/alley.gif);
			background-repeat: no-repeat;
			background-size: 100% 100%;
			*/
		}

		#discoball {
			position: absolute;
			visibility: hidden;
			left: 0;
			right: 0;
			margin-left: auto;
			margin-right: auto;
			text-align: center;
		}

		#ball {
			margin-top: -1px;
			animation: flip 1.5s infinite;
			animation-timing-function: linear;
		}

		@keyframes flip {
			0%   { transform: scaleX(-1); }
			100% { transform: scaleX(1);  }
		}
	</style>

	<script src="https://threejs.org/build/three.min.js" type="text/javascript"></script>
	<script src="https://threejs.org/examples/js/controls/TrackballControls.js" type="text/javascript"></script>
	<script src="https://threejs.org/examples/js/effects/AnaglyphEffect.js" type="text/javascript"></script>
	<script src="https://threejs.org/examples/js/libs/dat.gui.min.js" type="text/javascript"></script>
  <script src="https://cdn.jsdelivr.net/npm/dat.gui@0.7.9/build/dat.gui.min.js" type="text/javascript"></script>
	<script src="robot.js" type="text/javascript"></script>
	<script src="helper.js" type="text/javascript"></script>

	<script>
		var controls, renderer, scene, floor, camera;
		var robots = [];
		var obstacle, obstacleBoundingBox;
		var context = new (window.AudioContext || window.webkitAudioContext)();

		window.onload = function() {
			
			scene = new THREE.Scene();

			scene.background = new THREE.TextureLoader().load('sky.jpg');

			
			var fov = 60;
			var ratio = window.innerWidth / window.innerHeight;
			var zNear = 1;
			var zFar = 10000;
			camera = new THREE.PerspectiveCamera(fov, ratio, zNear, zFar);
			camera.position.set(0, 50, 350);
			renderer = new THREE.WebGLRenderer({ alpha: true });
			renderer.setSize(window.innerWidth, window.innerHeight);
			document.body.appendChild(renderer.domElement);
			effect = new THREE.AnaglyphEffect(renderer);
			effect.setSize(window.innerWidth, window.innerHeight);
			var ambientLight = new THREE.AmbientLight();
			scene.add(ambientLight);

			var directionalLight = new THREE.DirectionalLight(0xffffff, 5.0);
			directionalLight.position.set(10, 100, 10);
			scene.add(directionalLight);
			var floorTexture = new THREE.TextureLoader().load('board.jpg');
			var floorGeometry = new THREE.BoxBufferGeometry(1000, 20, 1000);
			var floorMaterial = new THREE.MeshBasicMaterial({
				map: floorTexture,
				side: THREE.DoubleSide
			});
			floor = new THREE.Mesh(floorGeometry, floorMaterial);
			floor.position.y = -105;
			scene.add(floor);
      var obstacleTexture = new THREE.TextureLoader().load('rant.jpeg');
			var obstacleGeometry = new THREE.BoxBufferGeometry(100, 100, 100);
			var obstacleMaterial = new THREE.MeshBasicMaterial({
				map: obstacleTexture,
				side: THREE.DoubleSide});
			obstacle = new THREE.Mesh(obstacleGeometry, obstacleMaterial);
			obstacle.position.x = -150;
			obstacle.position.y = -45;
			obstacle.position.z = -100;
			obstacleBoundingBox = new THREE.Box3().setFromObject(obstacle);
			scene.add(obstacle);
			controls = new THREE.TrackballControls(camera, renderer.domElement);
			robot = new Robot(0, -10, 0);
			robot.show(scene);
			robots.push(robot);
			danceMusic = document.getElementById('danceMusic');
			walkMusic  = document.getElementById('walkMusic');

			//------------------
			// add dat.GUI menus
			//------------------
			var gui = new dat.GUI();

			controller = {
				anaglyph: false,
				dance: function() {
					for (var i in robots)
						robots[i].dance();
				},
				walk: function() {
					for (var i in robots)
						robots[i].walk();
				}
			};

			left_controller = {
				'raise arm': function() {
					for (var i in robots)
						robots[i].raiseLeftArm();
				},
				'lower arm': function() {
					for (var i in robots)
						robots[i].lowerLeftArm();
				},
				'kick': function() {
					for (var i in robots)
						robots[i].leftKick();
				}
			};

			right_controller = {
				'raise arm': function() {
					for (var i in robots)
						robots[i].raiseRightArm();
				},
				'lower arm': function() {
					for (var i in robots)
						robots[i].lowerRightArm();
				},
				'kick': function() {
					for (var i in robots)
						robots[i].rightKick();
				}
			};

			// toggle between default renderer and anaglyph renderer
			var rendering = gui.addFolder('Rendering');
			rendering.add(controller, 'anaglyph');
			rendering.open();

			// robot movement: generic
			var moving = gui.addFolder('Movement');
			var offset = { x: 0, y: 0, z: 0 };
			moving.add(offset, 'x', -1000, 1000).onChange(
				function() {
					for (var i in robots) {
						robots[i].root.position.x = robots[i].base_x + offset.x;
					}
				}
			);
			moving.add(offset, 'y', -1000, 1000).onChange(
				function() {
					for (var i in robots) {
						robots[i].root.position.y = robots[i].base_y + offset.y;
					}
				}
			);
			moving.add(offset, 'z', -1000, 1000).onChange(
				function() {
					for (var i in robots) {
						robots[i].root.position.z = robots[i].base_z + offset.z;
					}
				}
			);
			moving.add(controller, 'dance').onChange(function() {
				context.resume();
				walkMusic.pause();
				danceMusic.play();
			});
			moving.add(controller, 'walk').onChange(function() {
				context.resume();
				danceMusic.pause();
				walkMusic.play();
			});
			moving.open();

			// robot movement: left side
			var left = gui.addFolder('Left');
			left.add(left_controller, 'raise arm');
			left.add(left_controller, 'lower arm');
			left.add(left_controller, 'kick');
			left.open();

			// robot movement: right side
			var right = gui.addFolder('Right');
			right.add(right_controller, 'raise arm');
			right.add(right_controller, 'lower arm');
			right.add(right_controller, 'kick');
			right.open();

			animate();
		}

		//-------------------------------
		// raycaster to create new robots
		//-------------------------------
		window.onclick = function(e) {
			document.querySelector('video').play();

			if (!e.shiftKey) {
				e.preventDefault();
				return false;
			}

			pixelCoords = new THREE.Vector2(e.clientX, e.clientY);

			vpCoords = new THREE.Vector2(
				(pixelCoords.x / window.innerWidth) * 2 - 1,
				- (pixelCoords.y / window.innerHeight) * 2 + 1
			);
			vpCoordsNear = new THREE.Vector3(vpCoords.x, vpCoords.y, 0);

			raycaster = new THREE.Raycaster();
			raycaster.setFromCamera(vpCoordsNear, camera);
			intersect = raycaster.intersectObject(floor);

			if (intersect.length > 0) {
				robot = new Robot(
					intersect[0].point.x,
					intersect[0].point.y + 80,
					intersect[0].point.z
				);
				robot.show(scene);
				robots.push(robot);
			}
		}

	function animate() {
		requestAnimationFrame(animate);
		for (var i in robots)
			robots[i].onAnimate();
		controls.update();
		(controller.anaglyph) ? effect.render(scene, camera) : renderer.render(scene, camera);
	}
	</script>
</head>
<body id="body">
	<audio id="danceMusic" src="music.mp3"></audio>
	<audio id="walkMusic" src="music.mp3"></audio>
	<video src="video/cycle.mp4" loop playsinline style="display: none"></video>
	<div id="discoball">
	</div>
</body>
</html>