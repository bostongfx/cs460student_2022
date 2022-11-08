// Create an empty.robot.js file
// add another script tag <script src="robot.js" type ="text/javascript"></script>
// This is part 1 of the assignment.


// Part 2: Modify this file to construct a robot object. The constructor
// takes x, y, and z coordinates!


Robot = function(x, y, z) { // parameters of world position, so x, y, z 
    // this is the constructor
    // need to attach x, y,z to our robot instance.
    // this.x = x;
    // Create a new Bone which is a world position.

    // Part 3 Add properties to the Robot class. Each property is pre-fixed with
    // "this" which refers to the current robot if multiple robots are created.
    // The following properties of this.head, this.neck, and this.torso are added
    // below:
    this.head = new THREE.BONE(); // Part 4, initialize THREE.BONE objects for the
    // Part 3 properties. 
    this.head.position.x = x;
    this.head.position.y = y;
    this.head.position.z = z;

    this.neck = new THREE.BONE();
    this.neck.position.y = -10;

    // Part 5: this.head is created as the root!
    // Note: don't change the position, then it will overlap with the head.
    this.head.add(this.neck);

    this.torso = new THREE.BONE();
    this.torso.position.y = -30;

    this.neck.add(this.torso);

    // Part 6: Create the limbs of the robot. First starting with the left
    // and right arms with each arm having three elements: "upper_arm",
    // "lower_arm" and "hand"

    // LEFT ARM
    this.left_upper_arm = new THREE.BONE();
    this.left_upper_arm.position.x = 5;
    this.left_upper_arm.position.y = -5;

    this.neck.add(this.left_upper_arm);

    this.left_lower_arm = new THREE.BONE();
    this.left_lower_arm.position.x = 5;
    this.left_lower_arm.position.y = -15;

    this.left_upper_arm.add(this.left_lower_arm);

    this.left_hand = new THREE.BONE();
    this.left_hand.position.y = -5;
    this.left_hand.position.x = 5

    this.left_lower_arm.add(this.left_hand);

    // Right ARM
    this.right_upper_arm = new THREE.BONE();
    this.right_upper_arm.position.x = -5;
    this.right_upper_arm.position.y = -5;
    this.neck.add(this.right_upper_arm);

    this.right_lower_arm = new THREE.BONE();
    his.right_lower_arm.position.x = -5;
    this.right_lower_arm.position.y = -15;
    this.right_upper_arm.add(this.right_lower_arm);

    this.right_hand = new THREE.BONE();
    this.right_hand.position.y = -5;
    this.right_hand.position.x = -5;

    this.right_lower_arm.add(this.right_hand);

    // Part 7: Create the left and right legs, each leg consisting of a hiearchy
    // of three elements: "upper_leg", "lower_leg", and "foot". 

    // RIGHT LEG
    this.right_upper_leg = new THREE.BONE();
    this.right_upper_leg.position.x = -2.5;
    this.right_upper_leg.position.y = -6;
    this.torso.add(this.right_upper_leg);

    this.right_lower_leg = new THREE.BONE();
    this.right_lower_leg.position.x = -3;
    this.right_lower_leg.position.y = -7;
    this.right_upper_leg.add(this.right_lower_leg);

    this.right_foot = new THRE.BONE();
    this.right_foot.position.x = -2;
    this.right_foot.position.y = -5;
    this.right_lower_leg.add(this.right_foot);

    // LEFT LEG
    this.left_upper_leg = new THREE.BONE();
    this.left_upper_leg.position.x = 2.5;
    this.left_upper_leg.position.y = -6;
    this.torso.add(this.left_upper_leg);

    this.left_lower_leg = new THREE.BONE();
    this.left_lower_leg.position.x = 3;
    this.left_lower_leg.position.y = -7;
    this.left_upper_leg.add(this.left_lower_leg);

    this.left_foot = new THRE.BONE();
    this.left_foot.position.x = 2;
    this.left_foot.position.y = -5;
    this.left_lower_leg.add(this.left_foot);

};
// Part 5: Create the scene graph hiearchy 

// Part 8: Write a Robot.prototype.show(scene) method that displays the
// robot using THREE.SkeletonHelper object. The index.html file is
// aslo changed to create the robot and call the "show" method!
// prototype is a keyword for all the methods, and will always be the same.
Robot.prototype.show = function(scene) {
    // demonstrate what this function does
    // console.log('current x', this.x);
    var rGroup = new THREE.Group();
    rGroup.add(this.head);
    //scene.add(rGroup);

    var helper = new THREE.SkeletonHelper(rGroup);
    helper.material.linewidth = 3; // Make the skeleton thick

    scene.add(rGoup);
    scene.add(helper);
};

// pART 11: Add animations here. By using the slerp
// interpolation between the qunaternions to move the robot's limbs.

Robot.prototype.raise_left_arm = function() {
    this.movement = 'raise left arm';
};
Robot.prototype.lower_left_arm = function() {
    this.movement = 'lower left arm';
};
Robot.prototype.kick = function() {
    this.movement = 'kick';
};



Robot.prototype.onAnimate = function() {
    if (this.movement == 'raise left arm') {
        // ... TODO slerping
        this.left_upper_arm.quanternion.slerp();
    } else if (this.movement == 'lower left arm') {
        // ... TODO slerping
        this.left_lower_arm.quanternion.slerp();
    } else if (this.movement == 'kick') {
        // ... TODO slerping and check once it is done for a backwards slerp
        // you can use the identity quaternion for a backwards slerp

    }
};

// Need to implement how to display the Bones, which are just
// data structures which is why we have a show method, so we will
// use a helper