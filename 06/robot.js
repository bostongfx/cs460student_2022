Robot = function(x, y, z) {

    //this is the constructor

    this.head = new THREE.Bone(); //skeloton
    this.head.position.x = x;
    this.head.position.y = y;
    this.head.position.z = z;

    this.neck = new THREE.Bone(); // this will be associated by add()
    this.neck.position.y = -10;
    this.head.add(this.neck);//attach neck to head

    this.torso = new THREE.Bone(); // this will be associated by add()
    this.torso.position.y = -30; //-10+ -30 = -40
    this.neck.add(this.torso);//attach torso to neck

    //-----------------------------------------------------------------
    //[!] arms
    //Left arm
    //upper arm
    this.left_upper_arm = new THREE.Bone();
    this.left_upper_arm.position.x = 5;//move a bit to the right side, positive -> right, neg -> left
    this.left_upper_arm.position.y = -5;
    this.neck.add(this.left_upper_arm);

    //lower arm
    this.left_lower_arm = new THREE.Bone();
    this.left_lower_arm.position.x = 5;//move a bit to the right side, positive -> right, neg -> left
    this.left_lower_arm.position.y = -15;
    this.left_upper_arm.add(this.left_lower_arm);

    //hand
    this.left_hand = new THREE.Bone();
    this.left_hand.position.x = 5;//move a bit to the right side, positive -> right, neg -> left
    this.left_hand.position.y = -5;
    this.left_lower_arm.add(this.left_hand);

    //left arm end

    //-----------------------------------------------------------------
    //right arm
    //upper arm
    this.right_upper_arm = new THREE.Bone();
    this.right_upper_arm.position.x = -5;//move a bit to the right side, positive -> right, neg -> left
    this.right_upper_arm.position.y = -5;
    this.neck.add(this.right_upper_arm);

    //lower arm
    this.right_lower_arm = new THREE.Bone();
    this.right_lower_arm.position.x = -5;//move a bit to the right side, positive -> right, neg -> left
    this.right_lower_arm.position.y = -15;
    this.right_upper_arm.add(this.right_lower_arm);

    //hand
    this.right_hand = new THREE.Bone();
    this.right_hand.position.x = -5;//move a bit to the right side, positive -> right, neg -> left
    this.right_hand.position.y = -5;
    this.right_lower_arm.add(this.right_hand);
    //right arm end

    //-----------------------------------------------------------------
    //[!] legs
    //left upper leg
    this.left_upper_leg = new THREE.Bone();
    this.left_upper_leg.position.x = 5;//move a bit to the right side, positive -> right, neg -> left
    this.left_upper_leg.position.y = -5;
    this.torso.add(this.left_upper_leg);

    //left lower leg
    this.left_lower_leg = new THREE.Bone();
    this.left_lower_leg.position.x = 5;//move a bit to the right side, positive -> right, neg -> left
    this.left_lower_leg.position.y = -15;
    this.left_upper_leg.add(this.left_lower_leg);

    //left foot
    this.left_foot = new THREE.Bone();
    this.left_foot.position.x = 5;//move a bit to the right side, positive -> right, neg -> left
    this.left_foot.position.y = -5;
    this.left_lower_leg.add(this.left_foot);


    //right upper leg
    this.right_upper_leg = new THREE.Bone();
    this.right_upper_leg.position.x = -5;//move a bit to the right side, positive -> right, neg -> left
    this.right_upper_leg.position.y = -5;
    this.torso.add(this.right_upper_leg);

    //right lower leg
    this.right_lower_leg = new THREE.Bone();
    this.right_lower_leg.position.x = -5;//move a bit to the right side, positive -> right, neg -> left
    this.right_lower_leg.position.y = -15;
    this.right_upper_leg.add(this.right_lower_leg);

    //right foot
    this.right_foot = new THREE.Bone();
    this.right_foot.position.x = -5;//move a bit to the right side, positive -> right, neg -> left
    this.right_foot.position.y = -5;
    this.right_lower_leg.add(this.right_foot);
    //left leg end

    this.movement = 'NA';

    //-----------------------------------------------------------------
};

Robot.prototype.show = function( scene ) {
//helper from 3js
    robotGroup = new THREE.Group();
    robotGroup.add(this.head);

    scene.add(robotGroup);

    ///also add helper to scene
    helper = new THREE.SkeletonHelper(robotGroup);
    helper.material.linewidth = 3; // make the skeleton thick
    scene.add(helper);
};

Robot.prototype.raise_left_arm = function() {
    this.movement = 'raise left arm';
};

Robot.prototype.lower_left_arm = function() {
    this.movement = 'lower left arm';
};

Robot.prototype.raise_right_arm = function() {
    this.movement = 'raise right arm';
};

Robot.prototype.lower_right_arm = function() {
    this.movement = 'lower right arm';
};

Robot.prototype.kick_left_leg = function() {
    this.movement = 'kick left leg';
};

Robot.prototype.kick_right_leg = function() {
    this.movement = 'kick right leg';
};

Robot.prototype.onAnimate = function() {
    if (this.movement == 'raise left arm') {
        // TODO slerping
        var axis = [1, 0, 0]; // x-axis
        var T = Math.PI; // 180 deg

        var x = Math.sin(T/2)*axis[0];
        var y = Math.sin(T/2)*axis[1];
        var z = Math.sin(T/2)*axis[2];
        var w = Math.cos(T/2);

        q = new THREE.Quaternion(x, y, z, w);

        this.left_upper_arm.quaternion.slerp(q, 0.1);
    } else if (this.movement == 'lower left arm') {
        // TODO slerping
        var axis = [0, 0, 0]; // x-axis
        var T = Math.PI; // 180 deg

        var x = Math.sin(T/2)*axis[0];
        var y = Math.sin(T/2)*axis[1];
        var z = Math.sin(T/2)*axis[2];
        var w = Math.cos(T/2);

        q = new THREE.Quaternion(x, y, z, w);

        this.left_upper_arm.quaternion.slerp(q, 0.1);
    } else if (this.movement == 'raise right arm') {
        // TODO slerping
        var axis = [1, 0, 0]; // x-axis
        var T = Math.PI; // 180 deg

        var x = Math.sin(T/2)*axis[0];
        var y = Math.sin(T/2)*axis[1];
        var z = Math.sin(T/2)*axis[2];
        var w = Math.cos(T/2);

        q = new THREE.Quaternion(x, y, z, w);

        this.right_upper_arm.quaternion.slerp(q, 0.1);
    } else if (this.movement == 'lower right arm') {
        // TODO slerping
        var axis = [0, 0, 0]; // x-axis
        var T = Math.PI; // 180 deg

        var x = Math.sin(T/2)*axis[0];
        var y = Math.sin(T/2)*axis[1];
        var z = Math.sin(T/2)*axis[2];
        var w = Math.cos(T/2);

        q = new THREE.Quaternion(x, y, z, w);

        this.right_upper_arm.quaternion.slerp(q, 0.1);
    } else if (this.movement == 'kick left leg') {
        // TODO slerping and check once it is done for a backwards slerp
        // you can use the identity quaternion for a backwards slerp
        //check w upper arm quaternion, hit9 then set back to original quaternion
        if (this.left_upper_leg.quaternion.w < 0.7) {
            this.movement = 'kick left done';
        }
        var axis = [1, 0, 0]; // x, y-axis
        var T = Math.PI; // 180 deg

        var x = Math.sin(T/2)*axis[0];
        var y = Math.sin(T/2)*axis[1];
        var z = Math.sin(T/2)*axis[2];
        var w = Math.cos(T/2);


        q = new THREE.Quaternion(x, y, z, w);

        this.left_upper_leg.quaternion.slerp(q, 0.1);
    } else if (this.movement == 'kick right leg') {
        // TODO slerping and check once it is done for a backwards slerp
        // you can use the identity quaternion for a backwards slerp
        //check w upper arm quaternion, hit9 then set back to original quaternion
        if (this.right_upper_leg.quaternion.w < 0.7) {
            this.movement = 'kick right done';
        }
        var axis = [1, 0, 0]; // x, y-axis
        var T = Math.PI; // 180 deg

        var x = Math.sin(T/2)*axis[0];
        var y = Math.sin(T/2)*axis[1];
        var z = Math.sin(T/2)*axis[2];
        var w = Math.cos(T/2);


        q = new THREE.Quaternion(x, y, z, w);

        this.right_upper_leg.quaternion.slerp(q, 0.1);
    } else if (this.movement == 'kick left done') {
        this.left_upper_leg.quaternion.slerp(new THREE.Quaternion( 0, 0, 0, 1 ), 0.1);
    } else if (this.movement == 'kick right done') {
        this.right_upper_leg.quaternion.slerp(new THREE.Quaternion( 0, 0, 0, 1 ), 0.1);
    }
};