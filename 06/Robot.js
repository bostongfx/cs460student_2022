class Robot{
    constructor(x, y, z){
        this.x=x;
        this.y=y;
        this.z=z;
        this.movement= '';
        // creating head and adding neck and torso
        
         // Head
        this.head = new THREE.Bone();

        
        // Neck
        this.neck = new THREE.Bone();

        // Torso
        this.torso = new THREE.Bone();
        this.head.position.x=x;
        this.head.position.y=y;
        this.head.position.z=z;

         
        // Add neck to head  
        this.neck.position.y = -10;
        this.head.add(this.neck);

        
       // Add torso to neck
       this.torso.position.y = -30;
      this.neck.add(this.torso);
       
       // creating upper arm, lower arm and hand for left and right hands
        
// Right hand
       
            // upper arm
        this.right_upper_arm = new THREE.Bone();
       this.right_upper_arm.position.x= 5;
       this.right_upper_arm.position.y= -5;

       // lower arm
        this.right_lower_arm = new THREE.Bone();
        this.right_lower_arm.position.x= 5;
       this.right_lower_arm.position.y= -5;

       // Hand 
        this.right_hand = new THREE.Bone();
        this.right_hand.position.x= 5;
       this.right_hand.position.y= -5;

       // Ataching the hand to neck to form a complete arm
        this.neck.add(this.right_upper_arm);
        this.right_upper_arm.add(this.right_lower_arm);
        this.right_lower_arm.add(this.right_hand);

// left hand 
        this.left_upper_arm = new THREE.Bone();
        this.left_upper_arm.position.x= -5;
        this.left_upper_arm.position.y= -5;


       // left lower arm
        this.left_lower_arm = new THREE.Bone();
        this.left_lower_arm.position.x= -5;
       this.left_lower_arm.position.y= -5;

       //left hand
        this.left_hand = new THREE.Bone();
        this.left_hand.position.x= -5;
       this.left_hand.position.y= -5;

       // Ataching the hand to neck to form a complete arm
        this.neck.add(this.left_upper_arm);
        this.left_upper_arm.add(this.left_lower_arm);
        this.left_lower_arm.add(this.left_hand);

        // upper right leg
        this.right_upper_leg = new THREE.Bone();
        this.right_upper_leg.position.x= 5;
        this.right_upper_leg.position.y= -5;
        
        // lower right leg
        this.right_lower_leg = new THREE.Bone();
        this.right_lower_leg.position.x= 5;
        this.right_lower_leg.position.y= -5;

        // right leg
        this.right_foot = new THREE.Bone();
        this.right_foot.position.x= 5;
        this.right_foot.position.y= -5;

        // Adding right leg to the Torso
        this.torso.add(this.right_upper_leg);
        this.right_upper_leg.add(this.right_lower_leg);
        this.right_lower_leg.add(this.right_foot);

        // upper left leg
        this.left_upper_leg = new THREE.Bone();
        this.left_upper_leg.position.x= -5;
        this.left_upper_leg.position.y= -5;

        // lower left leg
        this.left_lower_leg = new THREE.Bone();
        this.left_lower_leg.position.x= -5;
        this.left_lower_leg.position.y= -5;

        this.left_foot = new THREE.Bone();
        this.left_foot.position.x= -5;
        this.left_foot.position.y= -5;


        // Attaching left leg to Torso
        this.torso.add(this.left_upper_leg);
        this.left_upper_leg.add(this.left_lower_leg);
        this.left_lower_leg.add(this.left_foot);



    };
    
      show = function(scene){
        var rGroup = new THREE.Group();
        rGroup.add(this.head);

        var helper = new THREE.SkeletonHelper(rGroup);
        helper.material.linewidth = 10; // making the skeleton thick

        scene.add(rGroup);
        scene.add(helper);

    };
     raise_left_arm = function(){
        this.movement = 'raise left arm';
    };
    lower_left_arm = function(){
        this.movement = 'lower left arm';
    };

     kick = function(){
        this.movement = 'kick';
    };

    onAnimate = function(){
        console.log('onAnimate Called');
        
        var axis=[1,0,0];
        var T = Math.PI;
        var x = Math.sin(T/2)*axis[0];
        var y = Math.sin(T/2)*axis[1];
        var z = Math.sin(T/2)*axis[2];
        var w = Math.cos(T/2);
            var q = new THREE.Quaternion(x, y, z, w);
            if (this.movement == 'raise left arm'){
        this.left_upper_arm.quaternion.slerp(q, 0.10);
    }
    else if(this.movement == 'lower left arm'){
        this.left_lower_arm.quaternion.slerp(q, 0.10);

    } else if(this.movement == 'kick'){

        this.right_lower_leg.quaternion.slerp(q, 0.10);
        this.right_foot.position.x= 5;
        this.right_foot.position.y= -5;

    };
    };

    dance = function(){
        console.log("Dance called");
        var axis=[1,1,0];
        var T = Math.PI;
        var x = Math.sin(T/2)*axis[1];
        var y =  Math.sin(T/2)*axis[1];
        var z = Math.sin(T/2)*axis[2];
        var w = Math.cos(T/2);
            var q = new THREE.Quaternion(x, y, z, w);
            
            this.left_upper_arm.quaternion.slerp(q, 0.60);
            this.right_upper_arm.quaternion.slerp(q, 0.50);
            this.left_upper_leg.quaternion.slerp(q, 0.60);
            

    };
    
}
