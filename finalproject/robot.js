Robot = function(x, y, z) {

  // create head, neck, and, torso
  var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, 'blue')
  var geometry = fromhelper[0];
  var material = fromhelper[1];
  var bones = fromhelper[2];

  var mesh = new THREE.SkinnedMesh( geometry, material );
  var skeleton = new THREE.Skeleton( bones );
  mesh.add( bones[ 0 ] );
  mesh.bind( skeleton );

  this.root = bones[ 0 ];
  this.root.position.set(x, y, z);

  this.head = bones[ 1 ];
  this.neck = bones[ 2 ];
  this.neck.position.y = -10;
  this.torso = bones[ 3 ];
  this.torso.position.y = -30;
  this.body_mesh = mesh;


  // create left arm
  var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, 'blue')
  var geometry = fromhelper[0];
  var material = fromhelper[1];
  var bones = fromhelper[2];

  var mesh = new THREE.SkinnedMesh( geometry, material );
  var skeleton = new THREE.Skeleton( bones );
  mesh.add( bones[ 0 ] );
  mesh.bind( skeleton );

  this.neck.add(bones[ 0 ]);

  this.left_upperarm = bones[ 1 ];
  this.left_upperarm.position.y = -5;
  this.left_upperarm.position.x = 5;
  this.left_lowerarm = bones[ 2 ];
  this.left_lowerarm.position.y = -15;
  this.left_lowerarm.position.x = 5;
  this.left_hand = bones[ 3 ];
  this.left_hand.position.x = 5;
  this.left_hand.position.y = -5;
  this.leftarm_mesh = mesh;



  // create right arm
  var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, 'blue')
  var geometry = fromhelper[0];
  var material = fromhelper[1];
  var bones = fromhelper[2];

  var mesh = new THREE.SkinnedMesh( geometry, material );
  var skeleton = new THREE.Skeleton( bones );
  mesh.add( bones[ 0 ] );
  mesh.bind( skeleton );

  this.neck.add(bones[ 0 ]);

  this.right_upperarm = bones[ 1 ];
  this.right_upperarm.position.y = -5;
  this.right_upperarm.position.x = -5;
  this.right_lowerarm = bones[ 2 ];
  this.right_lowerarm.position.y = -15;
  this.right_lowerarm.position.x = -5;
  this.right_hand = bones[ 3 ];
  this.right_hand.position.x = -5;
  this.right_hand.position.y = -5;
  this.rightarm_mesh = mesh;


  // create left leg
  var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, 'blue')
  var geometry = fromhelper[0];
  var material = fromhelper[1];
  var bones = fromhelper[2];

  var mesh = new THREE.SkinnedMesh( geometry, material );
  var skeleton = new THREE.Skeleton( bones );
  mesh.add( bones[ 0 ] );
  mesh.bind( skeleton );

  this.torso.add(bones[ 0 ]);

  this.left_upperleg = bones[ 1 ];
  this.left_upperleg.position.y = -5;
  this.left_upperleg.position.x = 5;
  this.left_lowerleg = bones[ 2 ];
  this.left_lowerleg.position.y = -15;
  this.left_lowerleg.position.x = 5;
  this.left_foot = bones[ 3 ];
  this.left_foot.position.x = 5;
  this.left_foot.position.y = -5;
  this.leftleg_mesh = mesh;

  // create right leg
  var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, 'blue')
  var geometry = fromhelper[0];
  var material = fromhelper[1];
  var bones = fromhelper[2];

  var mesh = new THREE.SkinnedMesh( geometry, material );
  var skeleton = new THREE.Skeleton( bones );
  mesh.add( bones[ 0 ] );
  mesh.bind( skeleton );

  this.torso.add(bones[ 0 ]);

  this.right_upperleg = bones[ 1 ];
  this.right_upperleg.position.y = -5;
  this.right_upperleg.position.x = -5;
  this.right_lowerleg = bones[ 2 ];
  this.right_lowerleg.position.y = -15;
  this.right_lowerleg.position.x = -5;
  this.right_foot = bones[ 3 ];
  this.right_foot.position.x = -5;
  this.right_foot.position.y = -5;
  this.rightleg_mesh = mesh;


  this.movement = null;

  //assistance
  this.facing_angle = 0.0; //front 0 deg, left 90 deg, behind 180 deg, right 270 deg

  this.check_hands_up_then_cast_ball = false;
  this.hasBall = false;
  this.sphereMesh = null;
  this.sphereMeshScale = 1.0;
  this.sphere_aftermathMesh = null;

  this.check_readiness_beam = false;
  this.hasBeam = false;
  this.cylinderMesh = null;
  this.cylinderMeshScale = 1.0;

  this.check_readiness_wave = false;
  this.hasWave = false;
  this.wave_cylinderMesh = null;
  this.wave_cylinderMeshScale = 1.0;


  this.time = 0.0;
};

Robot.prototype.cloneRobot = function() {
  var tempRobot = new Robot(this.root.position.x, this.root.position.y, this.root.position.z);
  tempRobot.facing_angle = this.facing_angle;
  tempRobot.root.rotateY(this.facing_angle*Math.PI/180.0);
  return tempRobot;
}


Robot.prototype.show = function(scene) {

  scene.add(this.body_mesh);
  scene.add(this.leftarm_mesh);
  scene.add(this.rightarm_mesh);
  scene.add(this.leftleg_mesh);
  scene.add(this.rightleg_mesh);

};


Robot.prototype.removeFromShow = function(scene) {

  scene.remove(this.body_mesh);
  scene.remove(this.leftarm_mesh);
  scene.remove(this.rightarm_mesh);
  scene.remove(this.leftleg_mesh);
  scene.remove(this.rightleg_mesh);
  scene.remove(this.sphereMesh);
  this.sphereMesh = null;

};

Robot.prototype.setSphereMesh = function(mesh) {

  //this.sphereMesh = mesh;
  this.sphereMeshScale = 1.0;
  this.time = 0.0;


  var radius = 15;
  var sphereGeometry = new THREE.SphereBufferGeometry( radius, 32, 16 );
  var sphereMaterial = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
  var sphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
  //console.log("robot x: " + this.root.position.x);
  //console.log("robot y: " + this.root.position.y);
  //console.log("robot z: " + this.root.position.z);
  sphere.position.x = this.root.position.x + 0;
  sphere.position.y = this.root.position.y + 150;
  sphere.position.z = this.root.position.z + 0;
  //sphere.rotateY(Math.PI);
  //console.log(this.facing_angle);
  sphere.rotateY(this.facing_angle*(Math.PI/180));

  this.sphereMesh = sphere;

};

Robot.prototype.setCylinderMesh = function(mesh) {

  this.sphereMesh = mesh;
  this.sphereMeshScale = 1.0;
  this.time = 0.0;

};

Robot.prototype.increaseSphereScale = function() {

  this.sphereMeshScale = 0.1 + this.sphereMeshScale;
  this.sphereMesh.scale.setScalar(this.sphereMeshScale);
  //this.sphereMesh.scale.setScalar(55);
  this.sphereMesh.translateY(1.5);

};

Robot.prototype.increaseCylinderScale = function() {

  this.sphereMeshScale = 1.0 + this.sphereMeshScale;

};

Robot.prototype.increaseTime = function() {

  this.time = 0.1 + this.time;

};

Robot.prototype.facingOfRobot = function() {
  return this.facing_angle;
}

Robot.prototype.setWave = function() {

  this.hasWave = true;

};

Robot.prototype.raise_left_arm = function() {

  this.movement = 'raise left arm';

};

Robot.prototype.lower_left_arm = function() {

  this.movement = 'lower left arm';

};

Robot.prototype.hands_up = function() {

  this.movement = 'hands up';

};

Robot.prototype.shoot_beam = function() {

  this.movement = 'shoot beam raise right hand';

};

Robot.prototype.shoot_wave = function() {

  this.movement = 'shoot wave raise right hand';

};

Robot.prototype.kick = function() {

  this.movement = 'kick';

};

Robot.prototype.walk = function() {

  this.movement = 'walk';

};

Robot.prototype.walk2 = function() {

  this.movement = 'walk2';

};

Robot.prototype.onStep = function() {

  this.root.translateZ(10);

  if ( (this.root.position.x < -480 || this.root.position.x > 480) ||
       (this.root.position.z < -480 || this.root.position.z > 480)) {
          this.root.rotateY(Math.PI);
          this.facing_angle = Math.PI * (180 / Math.PI);
  }

  for (var temp_i = 0; temp_i < all_robots.length; temp_i++) {
      //console.log(this.root.position.distanceTo(all_robots[temp_i].root.position));
      //if (!this.root.position.equals(all_robots[temp_i]) && this.root.position.distanceTo(all_robots[temp_i].root.position) < 31) {
      if (this != all_robots[temp_i] && this.root.position.distanceTo(all_robots[temp_i].root.position) < 31) {
        this.root.rotateY(Math.PI);
        this.facing_angle = Math.PI * (180 / Math.PI);
        all_robots[temp_i].root.rotateY(Math.PI);
      }
  }

  //TODO: Bonus 2, check collision, distance between robots and objects
  for (var temp_i = 0; temp_i < objects_list.length; temp_i++) {
    //console.log(this.root.position.distanceTo(objects_list[temp_i].root.position));
    if (this.root.position.distanceTo(objects_list[temp_i].position) < 60) {
      this.root.rotateY(Math.PI);
      this.facing_angle = Math.PI * (180 / Math.PI);
    }
  }
  //Bonus 2 end
};

Robot.prototype.dance = function() {

  this.movement = 'dance';

};

Robot.prototype.onAnimate = function() {

  if (this.movement == 'raise left arm') {

    var T = Math.PI;
    this.left_upperarm.quaternion.slerp( new THREE.Quaternion(Math.sin(-T/2),  // w
                                                              0,               // x
                                                              0,               // y
                                                              Math.cos(-T/2)), // z
                                        0.1 );

  } else  if (this.movement == 'lower left arm') {

    this.left_upperarm.quaternion.slerp( new THREE.Quaternion(0, 0, 0, 1),
                                        0.1 );

  } else if (this.movement == 'kick') {
  
    // check if slerp reached almost the end
    if (this.right_upperleg.quaternion.w < 0.72) {
  
      // signal that the kick is done and the leg should move back
      this.movement = 'kick done';
  
    } else {
  
      var T = -Math.PI/2;
      this.right_upperleg.quaternion.slerp( new THREE.Quaternion( Math.sin( T / 2 ),   // x
                                                                  0,                   // y
                                                                  0,                   // z
                                                                  Math.cos( T / 2 ) ), // w
                                            0.1 );
  
    }
  
  } else if (this.movement == 'kick done') {
  
    // reset leg back to identity
    this.right_upperleg.quaternion.slerp( new THREE.Quaternion(0,0,0,1), 0.1 );
  
  } else if (this.movement == 'walk') {
    //console.log("right w: "+this.right_upperleg.quaternion.w);
  
    if (this.left_upperleg.quaternion.w < 0.93) {
      this.movement = 'walk done';
    } else {
      // walk left leg
      var T = -Math.PI/2;
      this.left_upperleg.quaternion.slerp( new THREE.Quaternion( Math.sin( T / 2 ),   // x
                                                                  0,                   // y
                                                                  0,                   // z
                                                                  Math.cos( T / 2 ) ), // w
                                           0.1 );
                                           
      this.onStep();
    }
  
  } else if (this.movement == 'walk2') {
    //console.log("left w: " + this.left_upperleg.quaternion.w);

    if (this.right_upperleg.quaternion.w < 0.93) {
      this.movement = 'walk2 done';
    } else {
      // walk right leg
      var T = -Math.PI/2;
      this.right_upperleg.quaternion.slerp( new THREE.Quaternion( Math.sin( T / 2 ),   // x
                                                                  0,                   // y
                                                                  0,                   // z
                                                                  Math.cos( T / 2 ) ), // w
                                           0.1 );

      this.onStep();
    }
  
  } else if (this.movement == 'walk done') {
    //console.log("left w: " + this.left_upperleg.quaternion.w);
    //console.log("right w: "+this.right_upperleg.quaternion.w);
  
    // reset right leg back to identity
    this.right_upperleg.quaternion.slerp( new THREE.Quaternion(0,0,0,1), 0.1 );
    if (this.right_upperleg.quaternion.w > 0.9999) {
      this.movement = 'walk2';
    }
  
  } else if (this.movement == 'walk2 done') {
    //console.log("left w: " + this.left_upperleg.quaternion.w);
    //console.log("right w: "+this.right_upperleg.quaternion.w);
  
    // reset left leg back to identity
    this.left_upperleg.quaternion.slerp( new THREE.Quaternion(0,0,0,1), 0.1 );
    if (this.left_upperleg.quaternion.w > 0.9999) {
      this.movement = 'walk';
    }
  
  } else if (this.movement == 'shoot beam raise right hand') {
    var T = Math.PI/2;
    this.right_upperarm.quaternion.slerp( new THREE.Quaternion(Math.sin(-T/2),  // w
                                                              0,               // x
                                                              0,               // y
                                                              Math.cos(-T/2)), // z
                                        0.3 );
    
    //console.log(this.right_upperarm.quaternion.w);
    //console.log(this.movement);
    if (this.right_upperarm.quaternion.w < 0.71) {
      this.movement = 'shoot beam raise right hand over beam ready';
      this.check_readiness_beam = true;
    }

  } else if (this.movement == 'shoot beam raise right hand over beam ready') {
    //console.log(this.time);
    this.time = this.time + 0.1;
    //lifting hand's time
    if (this.time > 1.0) {
      this.right_upperarm.quaternion.slerp( new THREE.Quaternion(0,0,0,1), 0.1 );
      if (this.right_upperarm.quaternion.w > 0.9999) {
        this.movement = 'shoot beam raise right hand over beam done';
        this.check_readiness_beam = false;
      }
    }
  } else if (this.movement == 'shoot wave raise right hand') {
    var T = Math.PI/2;
    this.right_upperarm.quaternion.slerp( new THREE.Quaternion(Math.sin(-T/2),  // w
                                                              0,               // x
                                                              0,               // y
                                                              Math.cos(-T/2)), // z
                                        0.3 );
    
    //console.log(this.right_upperarm.quaternion.w);
    //console.log(this.movement);
    if (this.right_upperarm.quaternion.w < 0.71) {
      this.movement = 'shoot wave raise right hand over wave ready';
      this.check_readiness_beam = true;
    }

  } else if (this.movement == 'shoot wave raise right hand over wave ready') {
    //console.log(this.time);
    this.time = this.time + 0.1;
    //lifting hand's time
    if (this.time > 1.0) {
      this.right_upperarm.quaternion.slerp( new THREE.Quaternion(0,0,0,1), 0.1 );
      if (this.right_upperarm.quaternion.w > 0.9999) {
        this.movement = 'shoot wave raise right hand over wave done';
        this.check_readiness_beam = false;
      }
    }
  } else if (this.movement == 'hands up') {
    var T = Math.PI;
    this.left_upperarm.quaternion.slerp( new THREE.Quaternion(Math.sin(-T/2),  // w
                                                              0,               // x
                                                              0,               // y
                                                              Math.cos(-T/2)), // z
                                        0.1 );
    this.right_upperarm.quaternion.slerp( new THREE.Quaternion(Math.sin(-T/2),  // w
                                                              0,               // x
                                                              0,               // y
                                                              Math.cos(-T/2)), // z
                                        0.1 );
    
    //console.log(this.left_upperarm.quaternion.w);
    if (this.left_upperarm.quaternion.w < 1-0.999999) {
      this.movement = 'hands up over';
      this.check_hands_up_then_cast_ball = true;
    }

  } else if (this.movement == 'hands up over') {
    //console.log(this.left_upperarm.quaternion.w);
    this.left_upperarm.quaternion.slerp( new THREE.Quaternion(0,0,0,1), 0.1 );
    this.right_upperarm.quaternion.slerp( new THREE.Quaternion(0,0,0,1), 0.1 );
    if (this.left_upperarm.quaternion.w > 0.9999) {
      this.movement = 'hands up over done';
      this.check_hands_up_then_cast_ball = false;
    }
  } else if (this.movement == 'dance') {

    if (typeof this.dancer === 'undefined') {

      this.dancer = setInterval(function() {

        // 
        // some random translation
        //
        var shakehead = 3*Math.random();
        if (Math.random() < .5) {
          shakehead *= -1;
        }

        var shakeneck = 3*Math.random();
        if (Math.random() < .5) {
          shakeneck *= -1;
        }

        var shaketorso = 3*Math.random();
        if (Math.random() < .5) {
          shaketorso *= -1;
        }

        this.root.position.x += shakehead;

        this.neck.position.x += shakeneck;

        this.torso.position.x += shaketorso;


        //
        // use actions
        //
        if (Math.random() < .3) {
          this.raise_left_arm();
        }

        if (Math.random() < .3) {
          this.lower_left_arm();
        }

        if (Math.random() < .3) {
          this.kick();
        }

        if (Math.random() < .3) {
          this.movement = 'kick done';
        }

      }.bind(this), 500);

    }

  }

};