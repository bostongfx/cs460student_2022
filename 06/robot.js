Robot = function(x, y, z) {

    // HEAD
    this.head = new THREE.Bone();
    this.head.position.x = x;
    this.head.position.y = y;
    this.head.position.z = z;
  
    // NECK
    this.neck = new THREE.Bone();
    this.neck.position.y = -10; // relative to the head
  
    this.head.add(this.neck);
  
    // TORSO
    this.torso = new THREE.Bone();
    this.torso.position.y = -30; // relative to the neck
  
    this.neck.add(this.torso);

    // LEFT UPPER ARM
    this.left_upper_arm = new THREE.Bone();
    this.left_upper_arm.position.y = -5; // relative to the neck
    this.left_upper_arm.position.x = 5;

    this.neck.add(this.left_upper_arm);

    // LEFT LOWER ARM
    this.left_lower_arm = new THREE.Bone();
    this.left_lower_arm.position.y = -15; // relative to the L upper arm
    this.left_lower_arm.position.x = 10;

    this.left_upper_arm.add(this.left_lower_arm);

    // LEFT HAND
    this.left_hand = new THREE.Bone();
    this.left_hand.position.y = -4; // relative to the L lower arm
    this.left_hand.position.x = 5;

    this.left_lower_arm.add(this.left_hand);


    // RIGHT UPPER ARM
    this.right_upper_arm = new THREE.Bone();
    this.right_upper_arm.position.y = -5; // relative to the neck
    this.right_upper_arm.position.x = -5;

    this.neck.add(this.right_upper_arm);

    // RIGHT LOWER ARM
    this.right_lower_arm = new THREE.Bone();
    this.right_lower_arm.position.y = -15; // relative to the L upper arm
    this.right_lower_arm.position.x = -10;

    this.right_upper_arm.add(this.right_lower_arm);

    // RIGHT HAND
    this.right_hand = new THREE.Bone();
    this.right_hand.position.y = -4; // relative to the L lower arm
    this.right_hand.position.x = -5;

    this.right_lower_arm.add(this.right_hand);

    // RIGHT UPPERLEG
    this.right_upperleg = new THREE.Bone();
    this.right_upperleg.position.x = -5;
    this.right_upperleg.position.y = -5;

    this.torso.add(this.right_upperleg);

    // RIGHT LOWERLEG
    this.right_lowerleg = new THREE.Bone();
    this.right_lowerleg.position.x = -5;
    this.right_lowerleg.position.y = -15;

    this.right_upperleg.add(this.right_lowerleg);

    //RIGHT FOOT
    this.right_foot = new THREE.Bone();
    this.right_foot.position.x = -5;
    this.right_foot.position.y = -5;

    this.right_lowerleg.add(this.right_foot);
    // LEFT UPPERLEG
    this.left_upperleg = new THREE.Bone();
    this.left_upperleg.position.x = 5;
    this.left_upperleg.position.y = -5;
    
    this.torso.add(this.left_upperleg);
    
    // LEFT LOWERLEG
    this.left_lowerleg = new THREE.Bone();
    this.left_lowerleg.position.x = 4;
    this.left_lowerleg.position.y = -15;
    
    this.left_upperleg.add(this.left_lowerleg);
    
    // LEFT FOOT
    this.left_foot = new THREE.Bone();
    this.left_foot.position.x = 4;
    this.left_foot.position.y = -5;
    
    this.left_lowerleg.add(this.left_foot);

    this.movement = '';

};

Robot.prototype.show = function(scene) {

    //console.log(this.head.position);
  
    rGroup = new THREE.Group();
    rGroup.add(this.head);
  
    scene.add(rGroup);
  
    helper = new THREE.SkeletonHelper(rGroup);
  
    scene.add(helper);
  
  
};


    Robot.prototype.raise_left_arm = function () {
        this.movement = 'raise_left_arm';
    };

    Robot.prototype.lower_left_arm = function () {
        this.movement = 'lower_left_arm';
    };
    Robot.prototype.kick = function () {
        this.movement = 'kick';
    };

    Robot.prototype.onAnimate = function () {

        var t = Math.PI; // 180 degrees

        if (this.movement == 'raise_left_arm') {
            
            var x = Math.sin( t/2 );
            var y = 0;
            var z = 0;
            var w = Math.cos( t/2 );

            var q = new THREE.Quaternion( x, y, z, w );

            this.left_upper_arm.quaternion.slerp( q, 0.1 );

        } else if (this.movement == 'lower_left_arm') {

            var q1 = new THREE.Quaternion(0, 0, 0, 1);
            this.left_upper_arm.quaternion.slerp( q1, 0.1 );

        } else if (this.movement == 'kick') {
           
            // SLERP CHECK
            if (this.right_upperleg. quaternion.w < 0.60 ) {
                this.movement = 'leg kicked';

            } else {

                var x = Math.sin( t/2 );
                var y = 0;
                var z = 0;
                var w = Math.cos( t/2 );
    
                var q = new THREE.Quaternion( x, y, z, w );
    
                this.right_upperleg.quaternion.slerp( q, 0.1 );
    

            };

        } else if (this.movement == 'leg kicked') {

            this.right_upperleg.quaternion.slerp( new THREE.Quaternion( 0, 0, 0, 1 ), 0.1);

        }
    };
