Robot = function( x, y, z) {
    // this is the constructor

    this.head = new THREE.Bone();
    // this.head.position.x = x;
    // this.head.position.y = y;
    // this.head.position.z = z;
    this.head.position.set( x, y, z );

    this.neck = new THREE.Bone();
    this.neck.position.y = -10;

    this.head.add(this.neck);

    this.torso = new THREE.Bone();
    this.torso.position.y = -25;

    this.neck.add(this.torso);

    // LEFT U ARM
    this.left_upper_arm = new THREE.Bone();
    this.left_upper_arm.position.y = -6;
    this.left_upper_arm.position.x = 5;

    this.neck.add(this.left_upper_arm);

    // LEFT L ARM
    this.left_lower_arm = new THREE.Bone();
    this.left_lower_arm.position.y = -9;
    this.left_lower_arm.position.x = 5;

    this.left_upper_arm.add(this.left_lower_arm);

    // LEFT HAND
    this.left_hand = new THREE.Bone();
    this.left_hand.position.y = -3;
    this.left_hand.position.x = 2;

    this.left_lower_arm.add(this.left_hand);

    // RIGHT U ARM
    this.right_upper_arm = new THREE.Bone();
    this.right_upper_arm.position.y = -6;
    this.right_upper_arm.position.x = -5;

    this.neck.add(this.right_upper_arm);

    // RIGHT L ARM
    this.right_lower_arm = new THREE.Bone();
    this.right_lower_arm.position.y = -9;
    this.right_lower_arm.position.x = -5;

    this.right_upper_arm.add(this.right_lower_arm);

    // RIGHT HAND
    this.right_hand = new THREE.Bone();
    this.right_hand.position.y = -3;
    this.right_hand.position.x = -2;

    this.right_lower_arm.add(this.right_hand);

    // LEFT U LEG
    this.left_upper_leg = new THREE.Bone();
    this.left_upper_leg.position.y = -6;
    this.left_upper_leg.position.x = 5;

    this.torso.add(this.left_upper_leg);

    // LEFT L LEG
    this.left_lower_leg = new THREE.Bone();
    this.left_lower_leg.position.y = -9;
    this.left_lower_leg.position.x = 5;

    this.left_upper_leg.add(this.left_lower_leg);

    // LEFT FOOT
    this.left_foot = new THREE.Bone();
    this.left_foot.position.y = -3;
    this.left_foot.position.x = 2;

    this.left_lower_leg.add(this.left_foot);

    // RIGHT U LEG
    this.right_upper_leg = new THREE.Bone();
    this.right_upper_leg.position.y = -6;
    this.right_upper_leg.position.x = -5;

    this.torso.add(this.right_upper_leg);

    // RIGHT L LEG
    this.right_lower_leg = new THREE.Bone();
    this.right_lower_leg.position.y = -9;
    this.right_lower_leg.position.x = -5;

    this.right_upper_leg.add(this.right_lower_leg);

    // RIGHT FOOT
    this.right_foot = new THREE.Bone();
    this.right_foot.position.y = -3;
    this.right_foot.position.x = -2;

    this.right_lower_leg.add(this.right_foot);


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

Robot.prototype.show = function( scene) { //prototype is keyword for all methods

    // console.log('current x', this.x);
    // use skeleton helper to display robot
    rGroup = new THREE.Group();
    rGroup.add(this.head);

    scene.add(this.head);

    helper = new THREE.SkeletonHelper(this.head);

    // scene.add(rGroup);

    // helper = new THREE.SkeletonHelper(rGroup);

    scene.add(helper);

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
    };
        