Robot = function (x, y, z) {
  // Head and Texture
  const texture = new THREE.TextureLoader().load("sphere.jpeg");
  var geometry = new THREE.SphereGeometry(15, 32, 16);
  var material = new THREE.MeshBasicMaterial({ color: 0xffffff, map: texture });
  var head_mesh = new THREE.Mesh(geometry, material);
  this.head = head_mesh;
  this.head.rotation.set(0, -Math.PI / 2, 0);
  this.head.position.set(x, y + 5, z);

  // Head Neck Torso
  var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, "black");
  var geometry = fromhelper[0];
  var material = fromhelper[1];
  var bones = fromhelper[2];

  var mesh = new THREE.SkinnedMesh(geometry, material);
  var skeleton = new THREE.Skeleton(bones);

  mesh.add(bones[0]);
  mesh.bind(skeleton);
  this.root = bones[0];
  this.root.position.set(x, y, z);

  this.head = bones[1];

  this.neck = bones[2];
  this.neck.position.y = -10;

  this.torso = bones[3];
  this.torso.position.y = -20;

  this.body_mesh = mesh;

  // Left arm(uper,lower,hand)
  var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, "black");
  var geometry = fromhelper[0];
  var material = fromhelper[1];
  var bones = fromhelper[2];

  var mesh = new THREE.SkinnedMesh(geometry, material);
  var skeleton = new THREE.Skeleton(bones);

  mesh.add(bones[0]);
  mesh.bind(skeleton);
  this.neck.add(bones[0]);

  // this.root.position.set(x, y, z);

  this.left_upper_arm = bones[1];
  this.left_upper_arm.position.x = 5;
  this.left_upper_arm.position.y = -5;

  this.left_lower_arm = bones[2];
  this.left_lower_arm.position.x = 5;
  this.left_lower_arm.position.y = -8;

  this.left_hand = bones[3];
  this.left_hand.position.x = 5;
  this.left_hand.position.y = -5;

  this.leftarm_mesh = mesh;

  // Right arm(uper,lower,hand)
  var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, "black");
  var geometry = fromhelper[0];
  var material = fromhelper[1];
  var bones = fromhelper[2];

  var mesh = new THREE.SkinnedMesh(geometry, material);
  var skeleton = new THREE.Skeleton(bones);

  mesh.add(bones[0]);
  mesh.bind(skeleton);
  this.neck.add(bones[0]);

  this.right_upper_arm = bones[1];
  this.right_upper_arm.position.x = -5;
  this.right_upper_arm.position.y = -5;

  this.right_lower_arm = bones[2];
  this.right_lower_arm.position.x = -5;
  this.right_lower_arm.position.y = -8;

  this.right_hand = bones[3];
  this.right_hand.position.x = -5;
  this.right_hand.position.y = -5;

  this.rightarm_mesh = mesh;

  // Left leg(uper,lower,foot)
  var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, "black");
  var geometry = fromhelper[0];
  var material = fromhelper[1];
  var bones = fromhelper[2];

  var mesh = new THREE.SkinnedMesh(geometry, material);
  var skeleton = new THREE.Skeleton(bones);

  mesh.add(bones[0]);
  mesh.bind(skeleton);
  this.torso.add(bones[0]);
  // this.root.position.set(x, y, z);

  this.left_upper_leg = bones[1];
  this.left_upper_leg.position.x = 5;
  this.left_upper_leg.position.y = -5;

  this.left_lower_leg = bones[2];
  this.left_lower_leg.position.x = 3;
  this.left_lower_leg.position.y = -2.5;

  this.left_foot = bones[3];
  this.left_foot.position.x = 3;
  this.left_foot.position.y = -3;

  this.leftleg_mesh = mesh;

  // Right leg(uper,lower,foot)
  var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, "black");
  var geometry = fromhelper[0];
  var material = fromhelper[1];
  var bones = fromhelper[2];

  var mesh = new THREE.SkinnedMesh(geometry, material);
  var skeleton = new THREE.Skeleton(bones);

  mesh.add(bones[0]);
  mesh.bind(skeleton);
  this.torso.add(bones[0]);
  // this.root.position.set(x, y, z);

  this.right_upper_leg = bones[1];
  this.right_upper_leg.position.x = -5;
  this.right_upper_leg.position.y = -5;

  this.right_lower_leg = bones[2];
  this.right_lower_leg.position.x = -3;
  this.right_lower_leg.position.y = -2.5;

  this.right_foot = bones[3];
  this.right_foot.position.x = -3;
  this.right_foot.position.y = -3;

  this.rightleg_mesh = mesh;

  Robot.prototype.show = function (scene) {
    // var rGroup = new THREE.Group();
    // rGroup.add(this.head);
    // var helper = new THREE.SkeletonHelper(rGroup);
    // helper.material.linewidth = 5; // make the skeleton thick
    // scene.add(rGroup);
    // scene.add(helper);
    scene.add(this.body_mesh);
    scene.add(this.leftarm_mesh);
    scene.add(this.rightarm_mesh);
    scene.add(this.leftleg_mesh);
    scene.add(this.rightleg_mesh);
    scene.add(head_mesh);
  };

  Robot.prototype.raise_left_arm = function () {
    this.movement = "raise left arm";
  };
  Robot.prototype.lower_left_arm = function () {
    this.movement = "lower left arm";
  };
  Robot.prototype.kick = function () {
    this.movement = "kick";
  };
  Robot.prototype.kick_back = function () {
    this.movement = "kick back";
  };
  Robot.prototype.dance = function () {
    this.movement = "dance";
  };
  Robot.prototype.onAnimate = function () {
    var T = -Math.PI;
    if (this.movement == "raise left arm") {
      q = new THREE.Quaternion(Math.sin(T / 2), 0, 0, Math.cos(T / 2));
      this.left_upper_arm.quaternion.slerp(q, 0.1);
    } else if (this.movement == "lower left arm") {
      q = new THREE.Quaternion(0, 0, 0, 1);
      this.left_upper_arm.quaternion.slerp(q, 0.1);
    } else if (this.movement == "lower right arm") {
      q = new THREE.Quaternion(0, 0, 0, 1);
      this.right_upper_arm.quaternion.slerp(q, 0.1);
    } else if (this.movement == "kick") {
      // ... TODO slerping and check once it is done for a backwards slerp
      // you can use the identity quaternion for a backwards slerp
      // console.log(this.right_upper_arm.quaternion.w);
      if (this.right_upper_leg.quaternion.w < 0.72) {
        this.movement = "kick back";
      } else {
        q = new THREE.Quaternion(Math.sin(T / 2), 0, 0, Math.cos(T / 2));
        this.right_upper_leg.quaternion.slerp(q, 0.2);
      }
    } else if (this.movement == "kick back") {
      q = new THREE.Quaternion(0, 0, 0, 1);
      this.right_upper_leg.quaternion.slerp(q, 0.2);
    } else if (this.movement == "dance") {
      if (this.right_upper_arm.quaternion.w < 0.75) {
        q = new THREE.Quaternion(0, 0, 0, 1);
        this.right_upper_arm.quaternion.slerp(q, 0.01);
      } else {
        q = new THREE.Quaternion(Math.sin(T / 2), 0, 0, Math.cos(T / 2));
        this.right_upper_arm.quaternion.slerp(q, 0.2);
      }
      if (this.right_upper_leg.quaternion.w < 0.72) {
        q = new THREE.Quaternion(0, 0, 0, 1);
        this.right_upper_leg.quaternion.slerp(q, 0.01);
      } else {
        q = new THREE.Quaternion(Math.sin(T / 2), 0, 0, Math.cos(T / 2));
        this.right_upper_leg.quaternion.slerp(q, 0.2);
      }
      if (this.left_lower_arm.quaternion.w < 0.75) {
        q = new THREE.Quaternion(0, 0, 0, 1);
        this.left_lower_arm.quaternion.slerp(q, 0.01);
      } else {
        q = new THREE.Quaternion(Math.sin(T / 2), 0, 0, Math.cos(T / 2));
        this.left_lower_arm.quaternion.slerp(q, 0.1);
      }
    }
    console.log(this.movement);
  };
};