// This robot.js file is my robot.js file from assignment 7
Robot = function(x, y, z) {

    // fromhelper is an array containing [geometry, material, bones]
    // The parameters here are: how many bones, cylinder radius, color
    // The default robot will have 5 skinned meshes: 
    // Body, Left + Right Arms, and Left + Right Legs
    // Each skinned mesh has 3 bones: i.e upper arm, lower arm, hand
    var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, 'blue')
    var geometry = fromhelper[0];
    var material = fromhelper[1];

    // bones is a 4 element array
    // element 1 is the anchor point
    // element 2 is the head
    // element 3 is the neck
    // element 4 is the torso
    var bones = fromhelper[2];
    // the helper will set up the bones for us, rather than having to set it up
    // manually like before

    // mesh gets its geometry and material from the helper
    var mesh = new THREE.SkinnedMesh( geometry, material );
    // skeleton gets its bones from the helper
    var skeleton = new THREE.Skeleton( bones );
    // bones[0] is an invisible anchor point for the entire robot
    mesh.add( bones[ 0 ] );
    mesh.bind( skeleton );

    //
    // root, head, neck, torso setup
    // 

    // root is the invisible anchor point now
    this.root = bones[0];
    // here we set the position of the root and the head
    this.root.position.set(x, y, z);

    // head has the same position as the root, so that's why its position
    // doesn't need to be modified
    this.head = bones[1];

    this.neck = bones[2];
    this.neck.position.y = -10;

    this.torso = bones[3];
    this.torso.position.y = -30;

    this.body_mesh = mesh;

    //
    // Left arm (upper + lower arms, hand) setup
    //

    // redefining these values so as to call the helper again, 
    // only this time for the left arm
    var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, 'blue')
    var geometry = fromhelper[0];
    var material = fromhelper[1];
    // bones is a 4 element array
    // element 1 is the anchor point
    // element 2 is the left upper arm
    // element 3 is the left lower arm
    // element 4 is the hand
    var bones = fromhelper[2];
    var mesh = new THREE.SkinnedMesh( geometry, material );
    var skeleton = new THREE.Skeleton( bones );
    mesh.add( bones[ 0 ] );
    mesh.bind( skeleton );

    // Attach the anchor point to the neck, 
    // because the arm is connected to the neck
    this.neck.add(bones[0]);

    this.left_upperarm = bones[1];
    this.left_upperarm.position.y = -5;
    this.left_upperarm.position.x = 5;
  
    this.left_lowerarm = bones[2];
    this.left_lowerarm.position.y = -15;
    this.left_lowerarm.position.x = 5;
  
    this.left_hand = bones[3];
    this.left_hand.position.x = 5;
    this.left_hand.position.y = -5;
  
    this.leftarm_mesh = mesh;

    //
    // Left leg (upper + lower legs, foot) setup
    //

    // redefining these values so as to call the helper again, 
    // only this time for the left leg
    var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, 'blue')
    var geometry = fromhelper[0];
    var material = fromhelper[1];
    // bones is a 4 element array
    // element 1 is the anchor point
    // element 2 is the left upper leg
    // element 3 is the left lower leg
    // element 4 is the foot
    var bones = fromhelper[2];
    var mesh = new THREE.SkinnedMesh( geometry, material );
    var skeleton = new THREE.Skeleton( bones );
    mesh.add( bones[ 0 ] );
    mesh.bind( skeleton );

    // Attach the anchor point to the torso, 
    // because the leg is connected to the torso
    this.torso.add(bones[0]);

    this.left_upperleg = bones[1];
    this.left_upperleg.position.x = 5;
    this.left_upperleg.position.y = -5;
  
    this.left_lowerleg = bones[2];
    this.left_lowerleg.position.x = 5;
    this.left_lowerleg.position.y = -15;
  
    this.left_foot = bones[3];
    this.left_foot.position.x = 5;
    this.left_foot.position.y = -5;

    this.leftleg_mesh = mesh;
  
    //
    // Right arm (upper + lower arms, hand) setup
    //

    // redefining these values so as to call the helper again, 
    // only this time for the right arm
    var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, 'blue')
    var geometry = fromhelper[0];
    var material = fromhelper[1];
    // bones is a 4 element array
    // element 1 is the anchor point
    // element 2 is the right upper arm
    // element 3 is the right lower arm
    // element 4 is the hand
    var bones = fromhelper[2];
    var mesh = new THREE.SkinnedMesh( geometry, material );
    var skeleton = new THREE.Skeleton( bones );
    mesh.add( bones[ 0 ] );
    mesh.bind( skeleton );
  
    // Attach the anchor point to the neck, 
    // because the arm is connected to the neck
    this.neck.add(bones[0]);
  
    this.right_upperarm = bones[1];
    this.right_upperarm.position.y = -5;
    this.right_upperarm.position.x = -5;
  
    this.right_lowerarm = bones[2];
    this.right_lowerarm.position.y = -15;
    this.right_lowerarm.position.x = -5;
  
    this.right_hand = bones[3];
    this.right_hand.position.x = -5;
    this.right_hand.position.y = -5;

    this.rightarm_mesh = mesh;
  
    //
    // Right leg (upper + lower legs, foot) setup
    //

    // redefining these values so as to call the helper again, 
    // only this time for the right leg
    var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, 'blue')
    var geometry = fromhelper[0];
    var material = fromhelper[1];
    // bones is a 4 element array
    // element 1 is the anchor point
    // element 2 is the right upper leg
    // element 3 is the right lower leg
    // element 4 is the foot
    var bones = fromhelper[2];
    var mesh = new THREE.SkinnedMesh( geometry, material );
    var skeleton = new THREE.Skeleton( bones );
    mesh.add( bones[ 0 ] );
    mesh.bind( skeleton );

    // Attach the anchor point to the torso, 
    // because the leg is connected to the torso
    this.torso.add(bones[0]);
  
    this.right_upperleg = bones[1];
    this.right_upperleg.position.x = -5;
    this.right_upperleg.position.y = -5;
  
    this.right_lowerleg = bones[2];
    this.right_lowerleg.position.x = -5;
    this.right_lowerleg.position.y = -15;
  
    this.right_foot = bones[3];
    this.right_foot.position.x = -5;
    this.right_foot.position.y = -5;

    this.rightleg_mesh = mesh;
  
    // The robot, in its default state, does not move
    this.movement = null;
  
  };
  
  
  Robot.prototype.show = function(scene) {
  
    scene.add(this.body_mesh);
    scene.add(this.leftarm_mesh);
    scene.add(this.leftleg_mesh);
    scene.add(this.rightarm_mesh);
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

          this.head.position.x += shakehead;
  
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