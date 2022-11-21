<html>
  <head>
    <meta charset="UTF-8" />
    <style>
      html, body { 
        background-color:#000;
        margin: 0;
        padding: 0;
        height: 100%;
        overflow: hidden !important;  

        background-image: url(sky.jpg);
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }
    </style>

    <script src="https://threejs.org/build/three.min.js" type="text/javascript"></script>
    <script src="https://threejs.org/examples/js/controls/TrackballControls.js" type="text/javascript"></script>
    <script src="https://threejs.org/examples/js/effects/AnaglyphEffect.js" type="text/javascript"></script>

    <script
			src="https://get.goxtk.com/xtk_xdat.gui.js"
			type="text/javascript"
		></script>
    <script src="robot.js" type="text/javascript"></script>

    <script src="helper.js" type="text/javascript"></script>

    <script>

      var scene, camera, renderer, effect, ambientLight, light, controls;
      var floor;

      window.onload = function() {


        scene = new THREE.Scene();

        var fov = 60;
        var ratio = window.innerWidth / window.innerHeight;
        var zNear = 1;
        var zFar = 10000;
        camera = new THREE.PerspectiveCamera(fov, ratio, zNear, zFar);
        camera.position.set( 0, 0, 500);

        renderer = new THREE.WebGLRenderer({ alpha: true });
        renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( renderer.domElement );
        
        effect = new THREE.AnaglyphEffect( renderer );
        effect.setSize( window.innerWidth, window.innerHeight );

        ambientLight = new THREE.AmbientLight();
        scene.add( ambientLight );

        light = new THREE.DirectionalLight( 0xffffff, 5.0 );
        light.position.set( 10, 100, 10 );
        scene.add( light );

        // BONUS
        var light1 = new THREE.PointLight( 0x00ff00, 1, 100 );
        light1.position.set(100, -50, 50);
        scene.add(light1);

        var light2 = new THREE.PointLight( 0xffff00, 1, 100 );
        light2.position.set(-100, 1000, 50);
        scene.add(light2);

        var obst = new THREE.TextureLoader().load( 'obst.png' );
        var geometry = new THREE.CylinderGeometry( 10, 10, 20, 32 );
        // var geometry = new THREE.SphereBufferGeometry( 20, 200 );
        var obstMaterial = new THREE.MeshBasicMaterial( {
          map: obst
        });
        var obj = new THREE.Mesh(geometry, obstMaterial);
        obj.position.y = -80;
        obj.position.x = -200;
        obj.position.z = 300;
        obj.rotateX(Math.PI/2);
        scene.add(obj);

        var floorTexture = new THREE.TextureLoader().load( 'board.jpg' );
        var floorGeometry = new THREE.PlaneBufferGeometry( 1000, 1000 );
        var floorMaterial = new THREE.MeshBasicMaterial( {
          map: floorTexture,
          side: THREE.DoubleSide
        } );
        floor = new THREE.Mesh( floorGeometry, floorMaterial );
        floor.position.y = -100;
        floor.rotateX(Math.PI/2);
        scene.add( floor );

        all_robots = [];

        r = new Robot(0, -30, 0);
        r.show(scene);

        all_robots.push(r);


        controller = {
          anaglyph: false,
          walk: function() {
            for (var r in all_robots) {
              r = all_robots[r];
              r.walk();
            }
          },
          dance: function() {

            // start the music
            // var music = document.getElementById('music');
            // music.autoplay = true;
            // music.load();
            
            // var video = document.getElementById('video');
            // var texture = new THREE.VideoTexture( video );
            // floor.material.map = texture;
            // video.play();

            for (var r in all_robots) {
              r = all_robots[r];
              r.dance();
            }
          }
        }


        var gui = new dat.GUI();
        var rendering = gui.addFolder( "Rendering" );
        rendering.add( controller, 'anaglyph' );
        rendering.open();
        var moving = gui.addFolder( "Movement" );
        moving.add( r.root.position, "x", -1000, 1000 ).listen();
        moving.add( r.root.position, "y", -1000, 1000 ).listen();
        moving.add( r.root.position, "z", -1000, 1000 ).listen();
        moving.add( r, "raise_left_arm" );
        moving.add( r, "lower_left_arm" );
        moving.add( r, "kick" );
        moving.add( controller, "dance" );
        moving.add(controller, "walk");
        moving.open();



        controls = new THREE.TrackballControls( camera, renderer.domElement );


        animate();


      };

      window.onclick = function(e) {

          if (!e.shiftKey) {

            e.preventDefault();
            return false;
          }

          pixel_coords = new THREE.Vector2( e.clientX, e.clientY );

          vp_coords = new THREE.Vector2( ( pixel_coords.x / window.innerWidth ) * 2 - 1,
                                        -( pixel_coords.y / window.innerHeight ) * 2 + 1);

          vp_coords_near = new THREE.Vector3( vp_coords.x, vp_coords.y, 0);

          raycaster = new THREE.Raycaster();
          raycaster.setFromCamera(vp_coords_near, camera);
          intersects = raycaster.intersectObject(floor);

          if (intersects.length > 0) {

              // r.root.position.set(intersects[0].point.x, 
              //                     intersects[0].point.y + 70,
              //                     intersects[0].point.z)

              r = new Robot(intersects[0].point.x, 
                                  intersects[0].point.y + 70,
                                  intersects[0].point.z);
              r.show(scene);

              all_robots.push(r);

          }

      };

      function animate() {

        requestAnimationFrame( animate );

        for (r in all_robots) {
          r = all_robots[r];
          r.onAnimate();  
        }
        
        controls.update();

        if (controller.anaglyph) {
            renderer.setClearAlpha(1);
            effect.render( scene, camera );
        } else {
            renderer.setClearAlpha(0);
            renderer.render( scene, camera );
        }
        

      };

    </script>
  </head>
  <body>
    <div style="visibility:hidden">
    <audio id='music'>
      <source src="techno.mp3">
    </audio>
    <video id="video" loop crossOrigin="anonymous" webkit-playsinline style="display:none">
      <source src="discoball.mp4"  type='video/mp4'>
    </video>
    </div>
  </body>
</html>