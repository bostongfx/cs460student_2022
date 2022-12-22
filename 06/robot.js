class Robot {

    constructor(x, y, z) {
        
        // Create the robot head
        this.head = new THREE.Bone();
        this.head.position.x = x;
        this.head.position.y = y;
        this.head.position.z = z;

        // Create the neck
        this.neck = new THREE.Bone();
        this.neck.position.y = -10;
    
        // Create the torso
        this.torso = new THREE.Bone();
        this.torso.position.y = -30;
    
        // Assign neck and torso as child objects appropriately
        this.head.add(this.neck);
        this.neck.add(this.torso);

        // Create left arm

        // Create the left upper arm
        this.left_upper_arm = new THREE.Bone();
        this.left_upper_arm.position.y = -5;
        this.left_upper_arm.position.x = 5;

        // Create left lower arm
        this.left_lower_arm = new THREE.Bone();
        this.left_lower_arm.position.y = -15;
        this.left_lower_arm.position.x = 5;

        // Create left hand
        this.left_hand = new THREE.Bone();
        this.left_hand.position.y = -5;
        this.left_hand.position.x = 5;

        // Assign left arm objects as child objects appropriately
        this.neck.add(this.left_upper_arm);
        this.left_upper_arm.add(this.left_lower_arm);
        this.left_lower_arm.add(this.left_hand);

        // Create right arm

        // Create the right upper arm
        this.right_upper_arm = new THREE.Bone();
        this.right_upper_arm.position.y = -5;
        this.right_upper_arm.position.x = -5;

        // Create right lower arm
        this.right_lower_arm = new THREE.Bone();
        this.right_lower_arm.position.y = -15;
        this.right_lower_arm.position.x = -5;

        // Create right hand
        this.right_hand = new THREE.Bone();
        this.right_hand.position.y = -5;
        this.right_hand.position.x = -5;

        // Assign right arm objects as child objects appropriately
        this.neck.add(this.right_upper_arm);
        this.right_upper_arm.add(this.right_lower_arm);
        this.right_lower_arm.add(this.right_hand);

        // Create left leg

        // Create the left upper leg
        this.left_upper_leg = new THREE.Bone();
        this.left_upper_leg.position.y = -5;
        this.left_upper_leg.position.x = 5;

        // Create left lower leg
        this.left_lower_leg = new THREE.Bone();
        this.left_lower_leg.position.y = -15;
        this.left_lower_leg.position.x = 5;

        // Create left foot
        this.left_foot = new THREE.Bone();
        this.left_foot.position.y = -5;
        this.left_foot.position.x = 5;

        // Assign left leg objects as child objects appropriately
        this.torso.add(this.left_upper_leg);
        this.left_upper_leg.add(this.left_lower_leg);
        this.left_lower_leg.add(this.left_foot);

        // Create right leg
    
        // Create the right upper leg
        this.right_upper_leg = new THREE.Bone();
        this.right_upper_leg.position.y = -5;
        this.right_upper_leg.position.x = -5;

        // Create right lower leg
        this.right_lower_leg = new THREE.Bone();
        this.right_lower_leg.position.y = -15;
        this.right_lower_leg.position.x = -5;

        // Create right foot
        this.right_foot = new THREE.Bone();
        this.right_foot.position.y = -5;
        this.right_foot.position.x = -5;

        // Assign right leg objects as child objects appropriately
        this.torso.add(this.right_upper_leg);
        this.right_upper_leg.add(this.right_lower_leg);
        this.right_lower_leg.add(this.right_foot);

        this.movement = 'nothing';
      
    }
    
    show = function(scene) {
  
        var rGroup = new THREE.Group();
        rGroup.add( this.head );
        var helper = new THREE.SkeletonHelper( rGroup );
        helper.material.linewidth = 3; // make the skeleton thick
        scene.add(rGroup);
        scene.add(helper);
        
    }

    raise_left_arm = function() {
        this.movement = 'raise left arm';
    }

    lower_left_arm = function() {
        this.movement = 'lower left arm';
    }

    kick = function() {
        this.movement = 'kick';
    }

    onAnimate = function() {
        // rotate 180 degrees around x axis
        var raise = new THREE.Quaternion(   Math.sin(Math.PI / 2 ) * 1 , 
                                            Math.sin(Math.PI / 2 ) * 0 , 
                                            Math.sin(Math.PI / 2 ) * 0 , 
                                            Math.cos(Math.PI / 2 ));
        
        // lower is the identity quaternion
        var lower = new THREE.Quaternion(0, 0, 0, 1);
        if (this.movement == 'raise left arm') {
            this.left_upper_arm.quaternion.slerp(raise, 0.01);
        } else if (this.movement == 'lower left arm') {
            this.left_upper_arm.quaternion.slerp(lower, 0.01);
        } else if (this.movement == 'kick') {
            // ... TODO slerping and check once it is done for a backwards slerp
            // you can use the identity quaternion for a backwards slerp
            this.left_upper_leg.quaternion.slerp(raise, 0.01);
            console.log(this.left_upper_leg.quaternion.w);
            // I couldn't figure out how to return the leg, so I'm just leaving
            // this non-functional implementation here.
            if (this.left_upper_leg.quaternion.w <= 0.1) {
                this.left_lower_leg.quaternion.slerp(lower, 0.01);
                console.log(this.left_upper_leg.quaternion.w);
            }
        
        }
    }
  
  }