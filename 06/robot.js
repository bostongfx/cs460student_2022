class Robot  {

  constructor(x,y,z) {

    //  Head
    this.head = new THREE.Bone();
    this.head.position.x = x;
    this.head.position.y = y;
    this.head.position.z = z;
    this.head.boneTextureSize=5;;

   
    // Begin of upper body

    this.neck = new THREE.Bone();
   // this.neck.position.x = x;
    this.neck.position.y = -10;
    this.head.add(this.neck)
    
    //his.neck.position.z = z;

    // Left 
    this.LUpperArm = new THREE.Bone();
    this.LUpperArm.position.x = 5;
    this.LUpperArm.position.y = -5;
    this.neck.add(this.LUpperArm);


    this.LLowerArm = new THREE.Bone();
    this.LLowerArm.position.x = 5;
    this.LLowerArm.position.y = -15;
    this.LUpperArm.add(this.LLowerArm);

    this.Lhands = new THREE.Bone();
    this.Lhands.position.x = 5;
    this.Lhands.position.y = -5;
    this.LLowerArm.add(this.Lhands);

    // Right 

    this.RUpperArm = new THREE.Bone();
    this.RUpperArm.position.x = -5;
    this.RUpperArm.position.y = -5;
    this.neck.add(this.RUpperArm);
  
    this.RLowerArm = new THREE.Bone();
    this.RLowerArm.position.x = -5;
    this.RLowerArm.position.y = -15;
    this.RUpperArm.add(this.RLowerArm);

    this.Rhands = new THREE.Bone();
    this.Rhands.position.x = -5;
    this.Rhands.position.y = -5;
    this.RLowerArm.add(this.Rhands);
  

    // begin of lower body.

    this.torso = new THREE.Bone();
    this.torso.position.y = -30;
    this.neck.add(this.torso);

    // Left

    this.LUpperLeg = new THREE.Bone();
    this.LUpperLeg.position.x = 5;
    this.LUpperLeg.position.y = -5;
    this.torso.add(this.LUpperLeg);

    this.LLowerLeg = new THREE.Bone();
    this.LLowerLeg.position.x = 5;
    this.LLowerLeg.position.y = -15;
    this.LUpperLeg.add(this.LLowerLeg);

    this.LFoot = new THREE.Bone();
    this.LFoot.position.x = 5;
    this.LFoot.position.y = -5;
    this.LLowerLeg.add(this.LFoot);

    // right

    this.RUpperLeg = new THREE.Bone();
    this.RUpperLeg.position.x = -5;
    this.RUpperLeg.position.y = -5;
    this.torso.add(this.RUpperLeg);
    
    this.RLowerLeg = new THREE.Bone();
    this.RLowerLeg.position.x = -5;
    this.RLowerLeg.position.y = -15;
    this.RUpperLeg.add(this.RLowerLeg);

    this.RFoot = new THREE.Bone();
    this.RFoot.position.x = -5;
    this.RFoot.position.y = -5;
    this.RLowerLeg.add(this.RFoot);

  }


};

Robot.prototype.raise_left_arm = function() {
  this.movement = 'raise left arm';
  console.log('Raise left arm');
  };
  Robot.prototype.lower_left_arm = function() {
  this.movement = 'lower left arm';
  console.log('lower left arm');
  };
  Robot.prototype.kick = function() {
  this.movement = 'kick';
  console.log('kick');
  };



//class Arms{
//  upper = new THREE.Bone();
//    upper.position.x = -5;
//    upper.position.y = 5;
//    lower = new THREE.Bone();
//    lower.position.x = -5;
//    lower.position.y = 5;
//    hand = new THREE.Bone();
//    hand.position.x = -5;
//    hand.position.y = 5;
    

    //this.LLowerArm = new THREE.Bone();
    //this.LLowerArm.position.x = x;
    //this.LLowerArm.position.y = y;
    //this.LLowerArm.position.z = z;

    //this.Lhands = new THREE.Bone();
    //this.Lhands.position.x = x;
    //this.Lhands.position.y = y;
    //this.Lhands.position.z = z;




Robot.prototype.show = function (scene) {
  //  console.log('current x ' , this.x);
    rGroup = new THREE.Group();
    rGroup.add(this.head);
    scene.add(rGroup);

    helper = new THREE.SkeletonHelper(rGroup);
   // make the skeleton thick
   helper.material.linewidth = 300;
    scene.add(helper);

   
};

Robot.prototype.OnAnimate = function () {

  
    if (this.movement == 'raise left arm') {
    // ... TODO slerping
    } else if (this.movement == 'lower left arm') {
    // ... TODO slerping
    } else if (this.movement == 'kick') {
    // ... TODO slerping and check once it is done for a backwards slerp
    // you can use the identity quaternion for a backwards slerp
    }
   
    
}