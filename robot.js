Robot = function( x , y , z ) {
    // head and behind of head
    this.head = new THREE.Bone();
    this.head.position.set( x, y, z );

    // neck and torso
    
    this.neck = new THREE.Bone();
    this.neck.position.y = -5;
    
    this.head.add(this.neck);
    
    this.torso = new THREE.Bone();
    this.torso.position.y = -25;
    
    this.neck.add(this.torso);
    
    // left arm
    this.left_shoulder = new THREE.Bone();
    this.left_shoulder.position.x = 6;
    
    this.neck.add(this.left_shoulder);
    
    this.left_upper_arm = new THREE.Bone();
    this.left_upper_arm.position.x = 5;
    this.left_upper_arm.position.y = -12;
    
    this.left_shoulder.add(this.left_upper_arm);
    
    this.left_lower_arm = new THREE.Bone();
    this.left_lower_arm.position.x = 3;
    this.left_lower_arm.position.y = -10;
    
    this.left_upper_arm.add(this.left_lower_arm);
    
    this.left_hand = new THREE.Bone();
    this.left_hand.position.x = -1;
    this.left_hand.position.y = -5;
    
    this.left_lower_arm.add(this.left_hand);
    
    // right arm
    this.right_shoulder = new THREE.Bone();
    this.right_shoulder.position.x = -6;
    
    this.neck.add(this.right_shoulder);
    
    this.right_upper_arm = new THREE.Bone();
    this.right_upper_arm.position.x = -5;
    this.right_upper_arm.position.y = -12;
    
    this.right_shoulder.add(this.right_upper_arm);
    
    this.right_lower_arm = new THREE.Bone();
    this.right_lower_arm.position.x = -3;
    this.right_lower_arm.position.y = -10;
    
    this.right_upper_arm.add(this.right_lower_arm);
    
    this.right_hand = new THREE.Bone();
    this.right_hand.position.x = 1;
    this.right_hand.position.y = -5;
    
    this.right_lower_arm.add(this.right_hand);
    
    // left leg
    this.left_hip = new THREE.Bone();
    this.left_hip.position.x = 3;
    
    this.torso.add(this.left_hip);
    
    this.left_upper_leg = new THREE.Bone();
    this.left_upper_leg.position.x = 5;
    this.left_upper_leg.position.y = -17;
    
    this.left_hip.add(this.left_upper_leg);
    
    this.left_lower_leg = new THREE.Bone();
    this.left_lower_leg.position.x = 4;
    this.left_lower_leg.position.y = -16;
    
    this.left_upper_leg.add(this.left_lower_leg);
    
    this.left_foot = new THREE.Bone();
    this.left_foot.position.z = 6;
    
    this.left_lower_leg.add(this.left_foot);
    
    // right leg
    this.right_hip = new THREE.Bone();
    this.right_hip.position.x = -3;
    
    this.torso.add(this.right_hip);
    
    this.right_upper_leg = new THREE.Bone();
    this.right_upper_leg.position.x = -5;
    this.right_upper_leg.position.y = -17;
    
    this.right_hip.add(this.right_upper_leg);
    
    this.right_lower_leg = new THREE.Bone();
    this.right_lower_leg.position.x = -4;
    this.right_lower_leg.position.y = -18;
    
    this.right_upper_leg.add(this.right_lower_leg);
    
    this.right_foot = new THREE.Bone();
    this.right_foot.position.z = 6;
    
    this.right_lower_leg.add(this.right_foot);
    
    this.movement = null;
    
    };
    
    Robot.prototype.show = function(scene) {
    
      var rGroup = new THREE.Group();
      rGroup.add( this.head );
    
      var helper = new THREE.SkeletonHelper( this.head );
      helper.material.linewidth = 10; // make the skeleton thick
    
      scene.add(this.head);
      scene.add(helper);
    
    };
    
    Robot.prototype.onAnimate = function() {
    
        if (this.movement == 'raise left arm') {
            var T = -Math.PI;
            this.left_shoulder.quaternion.slerp( new THREE.Quaternion(
            Math.sin(T/2),   // x
            0,               // y
            0,               // z
            Math.cos(T/2)),  // w
            0.1 );
        }  else if (this.movement == 'lower left arm') {
            var T = 2*Math.PI;
            this.left_shoulder.quaternion.slerp( new THREE.Quaternion(
            Math.sin(T/2),   // x
            0,               // y
            0,               // z
            Math.cos(T/2)),  // w
            0.1 );
        }  else if (this.movement == 'right kick') {
            // check if slerp reached almost the end
            if (this.right_hip.quaternion.w < 0.72) {
                // signal that the kick is done and the leg should move back
                this.movement = 'right kick done';
     
        } else {
          // RIGHT Kicks
          var T = -Math.PI/2;
          this.right_hip.quaternion.slerp( new THREE.Quaternion( 
          Math.sin( T / 2 ),   
          0,                   
          0,                   
          Math.cos( T / 2 ) ), 
          0.1 );
            }
     
      }  else if (this.movement == 'left kick') {
            if (this.left_hip.quaternion.w < 0.72) {
                // signal that the kick is done and the leg should move back
                this.movement = 'left kick done';
     
        } else {
          // LEFT Kicks
          var T = -Math.PI/2;
          this.left_hip.quaternion.slerp( new THREE.Quaternion( 
          Math.sin( T / 2 ),   
          0,                   
          0,                   
          Math.cos( T / 2 ) ), 
          0.1 );
        }
     
      } else if (this.movement == 'left kick done') {
        this.left_hip.quaternion.slerp( new THREE.Quaternion(0,0,0,1), 0.1 );
        }
        else if (this.movement == 'right kick done') {
        this.right_hip.quaternion.slerp( new THREE.Quaternion(0,0,0,1), 0.1 );
        }
    
    
        // MOVE YOUR HANDS
    
        else if (this.movement == 'time2dance') {
            if (this.left_shoulder.quaternion.w < 0.32){
            this.movement = 'left_shoulder done';
        } else {
            var T = -Math.PI;
            this.left_shoulder.quaternion.slerp( new THREE.Quaternion(
            Math.sin(T/2),   // x
            0,   			 // y
            0,               // z
            Math.cos(T/2)),  // w
            0.5 );
            }
        } else if (this.movement == 'left_shoulder done'){
            this.movement = 'move_right_shoulder';
        }
    
    
        // right shoulder
        else if (this.movement == 'move_right_shoulder') {
            // It is time2dance!
            if (this.right_shoulder.quaternion.w < 0.32){
            this.movement = 'move_right_shoulder done';
        } else {
            var T = -Math.PI;
            this.right_shoulder.quaternion.slerp( new THREE.Quaternion(
            Math.sin(T/2),   // x
            0,   			 // y
            0,               // z
            Math.cos(T/2)),  // w
            0.5 );
            }
        } else if (this.movement == 'move_right_shoulder done'){
            this.movement = 'reset_left_shoulder';
        }
    
    
        // reset left_shoulder
        else if (this.movement == 'reset_left_shoulder') {
            
            if (this.left_shoulder.quaternion.w > 0.95){
            this.movement = 'reset_left_shoulder done';
        } else {
            this.left_shoulder.quaternion.slerp( new THREE.Quaternion(0,0,0,1), 0.5 );
            }
        } else if (this.movement == 'reset_left_shoulder done'){
            this.movement = 'reset_right_shoulder';
    
        }
    
        // reset right_shoulder
        else if (this.movement == 'reset_right_shoulder') {
            
            if (this.right_shoulder.quaternion.w > 0.95){
            this.movement = 'reset_right_shoulder done';
        } else {
            this.right_shoulder.quaternion.slerp( new THREE.Quaternion(0,0,0,1), 0.5 );
            }
        } else if (this.movement == 'reset_right_shoulder done'){
            this.movement = 'right_hip';
    
        }
    
        // MOVE YOUR FEET
        //
        //
    
        else if (this.movement == 'right_hip') {
            if (this.right_hip.quaternion.w < 0.72){
            this.movement = 'right_hip done';
        } else {
    
          // RIGHT HIP
          var T = -Math.PI/2;
          this.right_hip.quaternion.slerp( new THREE.Quaternion( 
          Math.sin( T / 2 ),   // x
          0,                   // y
          0,                   // z
          Math.cos( T / 2 ) ), // w
          0.1 );
            }
    
        } else if (this.movement == 'right_hip done'){
            this.movement = 'reset_right_hip';
        }
    
        // RESET RIGHT HIP
    
        else if (this.movement == 'reset_right_hip') {
            
            if (this.right_hip.quaternion.w > 0.97){
            this.movement = 'reset_right_hip done';
        } else {
            this.right_hip.quaternion.slerp( new THREE.Quaternion(0,0,0,1), 0.5 );
            }
        } else if (this.movement == 'reset_right_hip done'){
            this.movement = 'move_left_hip';
    
        }
    
        // LEFT HIP
        else if (this.movement == 'move_left_hip') {
            // It is time2dance!
            if (this.left_hip.quaternion.w < 0.72){
            this.movement = 'move_left_hip done';
        } else {
            var T = -Math.PI/2;
              this.left_hip.quaternion.slerp( new THREE.Quaternion( 
              Math.sin( T / 2 ),   // x
              0,                   // y
              0,                   // z
              Math.cos( T / 2 ) ), // w
              0.1 );
            }
        } else if (this.movement == 'move_left_hip done'){
            this.movement = 'reset_left_hip';
        }
    
        //RESET LEFT HIP
        else if (this.movement == 'reset_left_hip') {
            
            if (this.left_hip.quaternion.w > 0.97){
            this.movement = 'reset_left_hip done';
        } else {
            this.left_hip.quaternion.slerp( new THREE.Quaternion(0,0,0,1), 0.5 );
            }
        } else if (this.movement == 'reset_left_hip done'){
            this.movement = 'time2dance';
    
        }
    };
    
    Robot.prototype.raise_left_arm = function() {
        this.movement = 'raise left arm';
        };
    
    Robot.prototype.lower_left_arm = function() {
        this.movement = 'lower left arm';
        };
    
    Robot.prototype.right_kick = function() {
        this.movement = 'right kick';
        };
    
    Robot.prototype.left_kick = function() {
        this.movement = 'left kick';
        };
    
    Robot.prototype.dance = function() {
        this.movement = 'time2dance';
        };
    
