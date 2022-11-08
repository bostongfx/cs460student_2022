Robot = function( x, y, z) {
    // this is the constructor

    var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, 'blue');
    var geometry = fromhelper[0];
    var material = fromhelper[1];
    var bones = fromhelper[2];

    var mesh = new THREE.SkinnedMesh(geometry, material);
    var skeleton = new THREE.Skeleton(bones);
    mesh.add(bones[0]);
    mesh.bind(skeleton);

    this.root = bones[0];
    this.root.position.set(x,y,z);

    //bones is 4 elem array, with elem 0 as anchor point, 1 as head, 2 as neck, 3 as torso
    //head, neck, torso
    this.head = bones[1];

    this.neck = bones[2];
    this.neck.position.y = -10;

    this.torso = bones[3];
    this.torso.position.y = -25;

    this.body_mesh = mesh;

    //next HELPER use
    //left upper arm, left lower arm, left hand
    var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, 'blue');
    var geometry = fromhelper[0];
    var material = fromhelper[1];
    var bones = fromhelper[2];

    var mesh = new THREE.SkinnedMesh(geometry, material);
    var skeleton = new THREE.Skeleton(bones);
    mesh.add(bones[0]);
    mesh.bind(skeleton);

    this.neck.add(bones[0]);
    this.left_upper_arm = bones[1];
    this.left_upper_arm.position.y = -6;
    this.left_upper_arm.position.x = 5;

    this.left_lower_arm = bones[2];
    this.left_lower_arm.position.y = -9;
    this.left_lower_arm.position.x = 5;

    this.left_hand = bones[3];
    this.left_hand.position.y = -3;
    this.left_hand.position.x = 2;

    this.left_arm_mesh = mesh;

    //next HELPER use
    //right upper arm, right lower arm, right hand
    var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, 'blue');
    var geometry = fromhelper[0];
    var material = fromhelper[1];
    var bones = fromhelper[2];

    var mesh = new THREE.SkinnedMesh(geometry, material);
    var skeleton = new THREE.Skeleton(bones);
    mesh.add(bones[0]);
    mesh.bind(skeleton);

    this.neck.add(bones[0]);
    this.right_upper_arm = bones[1];
    this.right_upper_arm.position.y = -6;
    this.right_upper_arm.position.x = -5;

    this.right_lower_arm = bones[2];
    this.right_lower_arm.position.y = -9;
    this.right_lower_arm.position.x = -5;

    this.right_hand = bones[3];
    this.right_hand.position.y = -3;
    this.right_hand.position.x = -2;

    this.right_arm_mesh = mesh;

        //next HELPER use
    //left upper leg, left lower leg, left foot
    var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, 'blue');
    var geometry = fromhelper[0];
    var material = fromhelper[1];
    var bones = fromhelper[2];

    var mesh = new THREE.SkinnedMesh(geometry, material);
    var skeleton = new THREE.Skeleton(bones);
    mesh.add(bones[0]);
    mesh.bind(skeleton);

    this.torso.add(bones[0]);
    this.left_upper_leg = bones[1];
    this.left_upper_leg.position.y = -6;
    this.left_upper_leg.position.x = 5;

    this.left_lower_leg = bones[2];
    this.left_lower_leg.position.y = -9;
    this.left_lower_leg.position.x = 5;

    this.left_foot = bones[3];
    this.left_foot.position.y = -3;
    this.left_foot.position.x = 2;

    this.left_leg_mesh = mesh;

    //next HELPER use
    //right upper leg, right lower leg, right foot
    var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, 'blue');
    var geometry = fromhelper[0];
    var material = fromhelper[1];
    var bones = fromhelper[2];

    var mesh = new THREE.SkinnedMesh(geometry, material);
    var skeleton = new THREE.Skeleton(bones);
    mesh.add(bones[0]);
    mesh.bind(skeleton);

    this.torso.add(bones[0]);
    this.right_upper_leg = bones[1];
    this.right_upper_leg.position.y = -6;
    this.right_upper_leg.position.x = -5;

    this.right_lower_leg = bones[2];
    this.right_lower_leg.position.y = -9;
    this.right_lower_leg.position.x = -5;

    this.right_foot = bones[3];
    this.right_foot.position.y = -3;
    this.right_foot.position.x = -2;

    this.right_leg_mesh = mesh;


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

Robot.prototype.show = function( scene) { //prototype is keyword for all methods

    // console.log('current x', this.x);
    // use skeleton helper to display robot
    // rGroup = new THREE.Group();
    // rGroup.add(this.head);

    // scene.add(this.head);

    // helper = new THREE.SkeletonHelper(this.head);

    // // scene.add(rGroup);

    // // helper = new THREE.SkeletonHelper(rGroup);

    // scene.add(helper);
    scene.add(this.body_mesh);
    scene.add(this.left_arm_mesh);
    scene.add(this.right_arm_mesh);
    scene.add(this.left_leg_mesh);
    scene.add(this.right_leg_mesh);

    vec_pos_global = new THREE.Vector3( );
    
    vec_test = this.neck.getWorldPosition(vec_pos_global);
    console.log('current x', vec_test);

    };

    Robot.prototype.onAnimate = function() {

    if (this.movement == 'raise left arm') {
        var T = Math.PI;
        var quat_to = new THREE.Quaternion(Math.sin(T/2), 0, 0, Math.cos(T/2));
        this.left_upper_arm.quaternion.slerp( quat_to, 0.5 );  
        } 

    else if (this.movement == 'lower left arm') {
        var quat_to = new THREE.Quaternion(0, 0, 0, 1);
        this.left_upper_arm.quaternion.slerp( quat_to, 0.5 ); 
        } 
    else if (this.movement == 'kick') {
        var T = -Math.PI;
        var quat_to = new THREE.Quaternion(0, 0, Math.sin(T/2), Math.cos(T/2));
        // console.log('stuff', this.left_upper_leg.quaternion);
        quat_orig = this.left_upper_leg.quaternion;
        this.left_upper_leg.quaternion.slerp( quat_to, 0.5 );
        if (this.left_upper_leg.quaternion.w < 5.0e-8 )  {
            this.movement = 'kickback';
        }
        }
    else if (this.movement == 'kickback') {
        quat_ident = new THREE.Quaternion(0, 0, 0, 1);
        this.left_upper_leg.quaternion.slerp( quat_ident, 0.5 );
    }
    else if (this.movement == 'dance') {

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
            // this.head.position.x += shakehead;
            // this.neck.position.x += shakehead;
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
                this.movement = 'kickback';
            }

            }.bind(this), 500);
    
        }
    
      }
    };
        