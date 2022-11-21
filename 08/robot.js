class Robot {

  constructor(x, y, z, color) {



    // head neck torso

    // bones is a 4 element array
    // e -> 0 is anchor point
    // e -> 1 is the head
    // e -> 2 is the neck
    // e -> 3 is the torso
    var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, color)
    var geometry = fromhelper[0];
    var material = fromhelper[1];
    var bones = fromhelper[2];

    var mesh = new THREE.SkinnedMesh(geometry, material);
    var skeleton = new THREE.Skeleton(bones);
    mesh.add(bones[0]);
    mesh.bind(skeleton);

    // Head Making/
    geometry = new THREE.SphereGeometry(13, 13, 13);
    material = new THREE.MeshStandardMaterial({ color: color });
    var headed = new THREE.Mesh(geometry, material);



    this.root = bones[0];
    this.root.position.set(x, y, z);
    this.root.add(headed)

    this.head = bones[1];
    //this.head.add(headed);

    this.neck = bones[2];
    this.neck.position.y = -10

    this.torso = bones[3];
    this.torso.position.y = -30;

    this.body_mesh = mesh;

    // End of Body

    // LEFT ARM

    // bones is a 4 element array
    // e -> 0 is anchor point
    // e -> 1 is the upper arm
    // e -> 2 is the lower arm
    // e -> 3 is the hand
    var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, color)
    var geometry = fromhelper[0];
    var material = fromhelper[1];
    var bones = fromhelper[2];

    var mesh = new THREE.SkinnedMesh(geometry, material);
    var skeleton = new THREE.Skeleton(bones);
    mesh.add(bones[0]);
    mesh.bind(skeleton);



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

    // LEFT ARM

    // bones is a 4 element array
    // e -> 0 is anchor point
    // e -> 1 is the upper arm
    // e -> 2 is the lower arm
    // e -> 3 is the hand
    var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, color)
    var geometry = fromhelper[0];
    var material = fromhelper[1];
    var bones = fromhelper[2];

    var mesh = new THREE.SkinnedMesh(geometry, material);
    var skeleton = new THREE.Skeleton(bones);
    mesh.add(bones[0]);
    mesh.bind(skeleton);



    this.torso.add(bones[0]);

    this.left_upperleg = bones[1];
    this.left_upperleg.position.y = -5;
    this.left_upperleg.position.x = 5;

    this.left_lowerleg = bones[2];
    this.left_lowerleg.position.y = -15;
    this.left_lowerleg.position.x = 5;

    this.left_foot = bones[3];
    this.left_foot.position.x = 5;
    this.left_foot.position.y = -5;

    this.leftleg_mesh = mesh;

    // End of Left

    // Right ARM
    // bones is a 4 element array
    // e -> 0 is anchor point
    // e -> 1 is the upper arm
    // e -> 2 is the lower arm
    // e -> 3 is the hand
    var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, color)
    var geometry = fromhelper[0];
    var material = fromhelper[1];
    var bones = fromhelper[2];

    var mesh = new THREE.SkinnedMesh(geometry, material);
    var skeleton = new THREE.Skeleton(bones);
    mesh.add(bones[0]);
    mesh.bind(skeleton);



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


    // Right leg
    // bones is a 4 element array
    // e -> 0 is anchor point
    // e -> 1 is the upper arm
    // e -> 2 is the lower arm
    // e -> 3 is the hand
    var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, color)
    var geometry = fromhelper[0];
    var material = fromhelper[1];
    var bones = fromhelper[2];

    var mesh = new THREE.SkinnedMesh(geometry, material);
    var skeleton = new THREE.Skeleton(bones);
    mesh.add(bones[0]);
    mesh.bind(skeleton);



    this.torso.add(bones[0]);

    this.right_upperleg = bones[1];
    this.right_upperleg.position.y = -5;
    this.right_upperleg.position.x = -5;

    this.right_lowerleg = bones[2];
    this.right_lowerleg.position.y = -15;
    this.right_lowerleg.position.x = -5;

    this.right_foot = bones[3];
    this.right_foot.position.x = -5;
    this.right_foot.position.y = -5;

    this.rightleg_mesh = mesh;
    // End of Right


    this.movement = null;



  }


};

Robot.prototype.raise_left_arm = function () {
  this.movement = 'raise left arm';

};
Robot.prototype.lower_left_arm = function () {
  this.movement = 'lower left arm';

};
Robot.prototype.kick = function () {
  this.movement = 'kick';

};
Robot.prototype.dance = function () {
  this.movement = 'dance';
};
Robot.prototype.walk = function (x,y,z) {
  this.movement = 'walk';
  this.boundaries.x = x;
  this.boundaries.y = y;
  this.boundaries.z = z;

  console.log("walk")

};


Robot.prototype.show = function (scene) {
  scene.add(this.body_mesh);
  scene.add(this.leftarm_mesh);
  scene.add(this.rightarm_mesh);
  scene.add(this.rightleg_mesh);
  scene.add(this.leftleg_mesh);

  // var rGroup = new THREE.Group();
  // rGroup.add( this.head );
  //
  // var helper = new THREE.SkeletonHelper( rGroup );
  // helper.material.linewidth = 3;
  //
  // scene.add(rGroup);
  // scene.add(helper);


};

Robot.prototype.OnAnimate = function () {


  if (this.movement == 'raise left arm') {
    var T = Math.PI;
    this.left_upperarm.quaternion.slerp(new THREE.Quaternion(Math.sin(-T / 2),  // w
      0,               // x
      0,               // y
      Math.cos(-T / 2)), // z
      0.1);
  } else if (this.movement == 'lower left arm') {
    this.left_upperarm.quaternion.slerp(new THREE.Quaternion(0, 0, 0, 1), 0.1);

  } else if (this.movement == 'kick') {
    if (this.right_upperleg.quaternion.w < 0.72) {

      // signal that the kick is done and the leg should move back
      this.movement = 'kick done';

    } else {

      var T = -Math.PI / 2;
      this.right_upperleg.quaternion.slerp(new THREE.Quaternion(Math.sin(T / 2),   // x
        0,                   // y
        0,                   // z
        Math.cos(T / 2)), // w
        0.1);

    }
  } else if (this.movement == 'kick done') {

    // reset leg back to identity
    this.right_upperleg.quaternion.slerp(new THREE.Quaternion(0, 0, 0, 1), 0.1);

  } else if (this.movement == 'dance') {

    if (typeof this.dancer === 'undefined') {

      this.dancer = setInterval(function () {

        // 
        // some random translation
        //
        var shakehead = 3 * Math.random();
        if (Math.random() < .5) {
          shakehead *= -1;
        }

        var shakeneck = 3 * Math.random();
        if (Math.random() < .5) {
          shakeneck *= -1;
        }

        var shaketorso = 3 * Math.random();
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
  else if (this.movement == 'walk') {
    if (this.left_upperleg.quaternion.w < 0.72) {
      
      this.movement = "walked"


    } else {
      this.right_upperleg.quaternion.slerp(new THREE.Quaternion(0, 0, 0, 1), 0.1);
      var T = -Math.PI / 2;
      this.left_upperleg.quaternion.slerp(new THREE.Quaternion(Math.sin(T / 2),   // x
        0,                   // y
        0,                   // z
        Math.cos(T / 2)), // w
        0.1);

    }

  } else if (this.movement == 'walked') {

    // reset leg back to identity
    
    if (this.right_upperleg.quaternion.w < 0.72) {
      
      this.movement = "walk"


    } else {
      this.left_upperleg.quaternion.slerp(new THREE.Quaternion(0, 0, 0, 1), 0.1);
      var T = -Math.PI / 2;
      this.right_upperleg.quaternion.slerp(new THREE.Quaternion(Math.sin(T / 2),   // x
        0,                   // y
        0,                   // z
        Math.cos(T / 2)), // w
        0.1);
        this.root.position.z +=1;

    }

  }

};