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
  // list of robots.
  //this.robots = null;

};


Robot.prototype.show = function(scene) {

  scene.add(this.body_mesh);
  scene.add(this.leftarm_mesh);
  scene.add(this.rightarm_mesh);
  scene.add(this.leftleg_mesh);
  scene.add(this.rightleg_mesh);

};

Robot.prototype.raise_left_arm = function() {

  this.movement = 'raise left arm';

};

Robot.prototype.lower_left_arm = function() {

  this.movement = 'lower left arm';

};

Robot.prototype.kick = function() {

  this.movement = 'kick';

};

Robot.prototype.dance = function() {

  this.movement = 'dance';

};
// create new prototype walk Part 1:
Robot.prototype.walk = function(robot_list) {
    this.movement = 'walk';
    // get the list of robots.
    //this.robots = robot_list;
};
// Part 6: Create Robot.prototype.onStep(), in order to move the robot.
// This function will be called in walk and walk2 blocks.
Robot.prototype.onStep = function() {
  // Part 8: loop through all the robots in the scene, though the all_robots
  // array is in index.html, and check if the current robot
  // (based of this.root.position) is close to the another robot with
  // this.root.position.distanceTo() method. If the robot is close, then
  // rotate the robot by 180 degrees.

  // There is a lot of slow down with this implimentation of checking, that
  // or the for loop is stuck, hence the robot(s) cannot move.
  // The error here was a syntax error, no slow down whats so ever.
  
  for( var r in all_robots ) {
    r = all_robots[r];
    if ( r.root.position.equals( this.root.position )) {
      continue;
    } else if( r.root.position.distanceTo( this.root.position ) < 10 ) {
      this.root.rotateY( Math.PI/2 );
    }
  }
  

  // Part 7: Add saftey that the robots do not walk off the plane.
  // Whenever it reaches the end of the plane, turn the robot by
  // 180 degrees along the Y axis by calling this.root.rotateY
  // which is a functionality of Three.js.

  // Also have to cosnider the x bounderies besides the z.
  if (this.root.position.z > 500 || this.root.position.z < -500 ||
      this.root.position.x > 500 || this.root.position.x < -500) {
    this.root.rotateY(Math.PI/2);
  }

  this.root.translateZ(10);
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
    if (this.left_upperleg.quaternion.w < 0.93) {
  
      // signal that the kick is done and the leg should move back
      this.movement = 'walk2';
  
    } else {
  
      // Part 4: Slerp the right leg back to identity. This looks very wonky, that is
      // not how people properly walk as if there is an axis from the bums to their head.
      // So let's have the right leg reset to a more natural position. Nevermind, we do,
      // it's just that the low legs don't bend and the upper torso is one piece, so
      // less fluid. Further, the arms are not moving.

      this.right_upperleg.quaternion.slerp( new THREE.Quaternion(0,0,0,1), 0.1 );
      // slerp the left upper leg by 45 degrees along the x-axis.
      var T = -Math.PI/2;
      this.left_upperleg.quaternion.slerp( new THREE.Quaternion( Math.sin( T / 4 ),   // x
                                                                  0,                   // y
                                                                  0,                   // z
                                                                  Math.cos( T / 4 ) ), // w
                                            0.1 );
    }
    this.onStep();
  } else if (this.movement == 'walk2') {
    if (this.right_upperleg.quaternion.w < 0.93) {
  
      // signal that the kick is done and the leg should move back
      this.movement = 'walk';
  
    } else {
  
      // Part 4: Slerp the left leg back to identity
      this.left_upperleg.quaternion.slerp( new THREE.Quaternion(0,0,0,1), 0.1 );
      // slerp the right upper leg by 45 degrees along the x-axis.
      var T = -Math.PI/2;
      this.right_upperleg.quaternion.slerp( new THREE.Quaternion( Math.sin( T / 4 ),   // x
                                                                  0,                   // y
                                                                  0,                   // z
                                                                  Math.cos( T / 4 ) ), // w
                                            0.1 );
    }
    this.onStep();
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