Robot = function(x, y, z){
    // this is the contructor
    var fromhelper = HELPER.cylinderSkeletonMesh( 3, 5, 'blue');
    var geometry = fromhelper[0];
    var material = fromhelper[1];
    var bones = fromhelper[2];

    var mesh = new THREE.SkinnedMesh( geometry, material);
    var skeleton = new THREE.Skeleton( bones );
    mesh.add( bones[0] );
    mesh.bind( skeleton );

    this.root = bones[0]; // invisible anchor point
    this.root.position.set( x, y, z);

    this.head = bones[1];
    this.neck = bones[2];
    this.neck.position.y = -10;
    this.torso = bones[3];
    this.torso.position.y = -30;
    this.body_mesh = mesh;


    // this.head = new THREE.Bone();
    // this.head.position.x = x;
    // this.head.position.y = y;
    // this.head.position.z = z;

    // this.neck = new THREE.Bone();
    // this.neck.position.y = -10;

    // this.head.add(this.neck);

    // this.torso = new THREE.Bone();
    // this.torso.position.y = -30;
    
    // this.neck.add(this.torso);

    // //left upper arm
    // this.left_upper_arm = new THREE.Bone();
    // this.left_upper_arm.position.y = -5;
    // this.left_upper_arm.position.x = 5;
    // this.neck.add(this.left_upper_arm);
    // this.action= 'standingstill';
    // // left lower arm
    // this.left_lower_arm = new THREE.Bone();
    // this.left_lower_arm.position.y = -15;
    // this.left_lower_arm.position.x = 5;
    // this.left_upper_arm.add(this.left_lower_arm);
    
    // //left hand
    // this.left_hand = new THREE.Bone ();
    // this.left_hand.position.y = -5;
    // this.left_hand.position.x = 5;
    // this.left_lower_arm.add(this.left_hand);

    // //right upper arm
    // this.right_upper_arm = new THREE.Bone();
    // this.right_upper_arm.position.y = -5;
    // this.right_upper_arm.position.x = -5;
    // this.neck.add(this.right_upper_arm);

    // // right lower arm
    // this.right_lower_arm = new THREE.Bone ();
    // this.right_lower_arm.position.y = -15;
    // this.right_lower_arm.position.x = -5;
    // this.right_upper_arm.add(this.right_lower_arm);

    // // right hand
    // this.right_hand = new THREE.Bone ();
    // this.right_hand.position.y = -5;
    // this.right_hand.position.x = -5;
    // this.right_lower_arm.add(this.right_hand);

    // // left upper leg
    // this.left_upper_leg = new THREE.Bone ();
    // this.left_upper_leg.position.y = -20;
    // this.left_upper_leg.position.x = 4;
    // this.torso.add(this.left_upper_leg);

    // // left lower leg
    // this.left_lower_leg = new THREE.Bone ();
    // this.left_lower_leg.position.y = -25;
    // this.left_lower_leg.position.x = 8;
    // this.left_upper_leg.add(this.left_lower_leg);
    
    // // left foot
    // this.left_foot = new THREE.Bone ();
    // this.left_foot.position.y = -30;
    // this.left_foot.position.x = 10;
    // this.left_lower_leg.add(this.left_foot);

    // // right upper leg 
    // this.right_upper_leg = new THREE.Bone ();
    // this.right_upper_leg.position.y = -20;
    // this.right_upper_leg.position.x = -4;
    // this.torso.add(this.right_upper_leg);

    // // right lower leg
    // this.right_lower_leg = new THREE.Bone ();
    // this.right_lower_leg.position.y = -25;
    // this.right_lower_leg.position.x = -8;
    // this.right_upper_leg.add(this.right_lower_leg);

    // // right ffot
    // this.right_foot = new THREE.Bone ();
    // this.right_foot.position.y = -30;
    // this.right_foot.position.x = -10;
    // this.right_lower_leg.add(this.right_foot);

     // create left upper arm, lower arm, and hand
    var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, 'blue')
    var geometry = fromhelper[0];
    var material = fromhelper[1];
    var bones = fromhelper[2];

    var mesh = new THREE.SkinnedMesh( geometry, material );
    var skeleton = new THREE.Skeleton( bones );
    mesh.add( bones[0] );
    mesh.bind( skeleton );
    this.neck.add(bones[0]);

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

    //create right upper arm, lower arm, and hand
    var fromhelper = HELPER.cylinderSkeletonMesh( 3, 5, 'blue');
    var geometry = fromhelper[0];
    var material = fromhelper[1];
    var bones = fromhelper[2];

    var mesh = new THREE.SkinnedMesh( geometry, material);
    var skeleton = new THREE.Skeleton( bones );
    mesh.add( bones[0] );
    mesh.bind( skeleton );
    this.neck.add(bones[0]);
    this.right_upperarm = bones[1];
    this.right_upperarm.position.x = -5;
    this.right_upperarm.position.y = -5;

    this.right_lowerarm = bones[2];
    this.right_lowerarm.position.x = -5;
    this.right_lowerarm.position.y = -15;

    this.right_hand = bones[3];
    this.right_hand.position.x = -5;
    this.right_hand.position.y = -5;

    this.rightarm_mesh = mesh;

    //create left upper leg, lower leg and left foot
    var fromhelper = HELPER.cylinderSkeletonMesh( 3, 5, 'blue');
    var geometry = fromhelper[0];
    var material = fromhelper[1];
    var bones = fromhelper[2];

    var mesh = new THREE.SkinnedMesh( geometry, material);
    var skeleton = new THREE.Skeleton( bones );
    mesh.add( bones[0] );
    mesh.bind( skeleton );

    this.torso.add( bones[0] );
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


    //create right upper leg, lower leg and right foot
    var fromhelper = HELPER.cylinderSkeletonMesh( 3, 5, 'blue');
    var geometry = fromhelper[0];
    var material = fromhelper[1];
    var bones = fromhelper[2];

    var mesh = new THREE.SkinnedMesh( geometry, material);
    var skeleton = new THREE.Skeleton( bones );
    mesh.add( bones[0] );
    mesh.bind( skeleton );

    this.torso.add( bones[0] ); // invisible anchor point

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
    this.movement = null;
     
    

};

// Robot.prototype.show = function(scene){
//     //console.log('current x', this.x); 
//     rGroup = new THREE.Group();
//     rGroup.add(this.head);

//     scene.add(rGroup);

//     helper = new THREE.SkeletonHelper(rGroup);

//     scene.add(helper);

   
// };

// Robot.prototype.show = function(scene) {
//     var rGroup = new THREE.Group();
//     rGroup.add( this.head );
//     var helper = new THREE.SkeletonHelper( rGroup );
//     helper.material.linewidth = 20; // make the skeleton thick
//     scene.add(rGroup);
//     scene.add(helper);
// };

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
Robot.prototype.continue = function() {
    this.movement = 'continue';
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

// Robot.prototype.onAnimate = function() {
//     if (this.movement == 'raise left arm') {
//         // ... TODO slerping
//         var T = Math.PI;
//         this.left_upper_arm.quaternion.slerp(
//             new THREE.Quaternion(Math.sin(T/2),0,0, Math.cos(T/2)), 0.1);
//     } else if (this.movement == 'lower left arm') {
//     // ... TODO slerping
//         var T = -Math.PI;
//         this.left_upper_arm.quaternion.slerp(
//         new THREE.Quaternion(0,0,0,0),0.1);

//     } else if (this.movement == 'kick') {
//     // ... TODO slerping and check once it is done for a backwards slerp
//     // you can use the identity quaternion for a backwards slerp
//         if (this.right_upper_leg.quaternion.w < 0.72) {
//             this.movement = 'kick done';
//         } else {
//             var T = -Math.PI/2;
//             this.right_upper_leg.quaternion.slerp(
//                  new THREE.Quaternion( Math.sin(T/2), 0, 0, Math.cos(T/2)),0.1);
//          }
//     } else if (this.movement == 'kick done') {

//       this.right_upper_leg.quaternion.slerp( new THREE.Quaternion(0,0,0,1), 0.1 );
  
//     }else if (this.movement == 'dance'){            //bonus part 2 begin

//         a = Math.PI;
//         this.left_upper_arm.quaternion.slerp(new THREE.Quaternion(Math.sin(a/2), 
//                                                                 0, 
//                                                                 0, 
//                                                                 0), 0.2);
//         this.left_lower_arm.quaternion.slerp(new THREE.Quaternion(0, 
//                                                                 0, 
//                                                                 0, 
//                                                                 Math.cos(a/2)), 0.3);
//         this.right_upper_arm.quaternion.slerp(new THREE.Quaternion(Math.sin(a/2), 
//                                                                 0, 
//                                                                 0, 
//                                                                 Math.cos(a/2)), 0.4);
//         this.right_lower_arm.quaternion.slerp(new THREE.Quaternion(0, 
//                                                                 Math.sin(a/2), 
//                                                                 0, 
//                                                                 Math.cos(a/3)), 0.5);
//         this.left_upper_leg.quaternion.slerp(new THREE.Quaternion(Math.sin(a/2), 
//                                                                 0, 
//                                                                 0, 
//                                                                 Math.cos(a/2)), 0.4);
//         this.left_lower_leg.quaternion.slerp(new THREE.Quaternion(0, 
//                                                                 Math.sin(a/2), 
//                                                                 0, 
//                                                                 Math.cos(a/5)), 0.3);
//         this.right_upper_leg.quaternion.slerp(new THREE.Quaternion(Math.sin(a/2), 
//                                                                 0, 
//                                                                 0, 
//                                                                 Math.cos(a/2)), 0.2);
//         this.right_lower_leg.quaternion.slerp(new THREE.Quaternion(0, 
//                                                                 Math.sin(a/3), 
//                                                                 0, 
//                                                                 Math.cos(a/4)), 0.1);
//         this.movement = 'return';
//     }else if(this.movement == 'return'){

//         //call to the identity quaternion
//         this.left_upper_arm.quaternion.slerp(new THREE.Quaternion(0, 0, 0, 1), 0.2);
//         this.left_lower_arm.quaternion.slerp(new THREE.Quaternion(0, 0, 0, 1), 0.3);
//         this.right_upper_arm.quaternion.slerp(new THREE.Quaternion(0, 0, 0, 1), 0.7);
//         this.right_lower_arm.quaternion.slerp(new THREE.Quaternion(0, 0, 0, 1), 0.9);
//         this.right_lower_leg.quaternion.slerp(new THREE.Quaternion(0, 
//             Math.sin(a/2), 
//             0, 
//             Math.cos(a/2)), 0.1);
// this.movement = 'return';
//         this.movement = 'dance';

//     }else if(this.movement == 'null'){
//         return;
//     }
// };



// Robot.prototype.onAnimate = function(){
    // if (this.action == 'rasieleftarm'){
    //     var axis = [1, 0, 0]; // x -axis
    //     var T = Math.PI; // 180 degree
    //     var x = Math.sin(T/2) * axix[0];
    //     var y = Math.sin(T/2) * axix[1];
    //     var z = Math.sin(T/2) * axix[2];
    //     var w = Math.cos(T/2);
    //     q = new THREE.Quaternion(x,y,z,w);

        // start the slerp interpolation from current shape to rotation
       // this.left_upper_arm.quaternion.slerp(q, 0.1)
//     }
    
// }