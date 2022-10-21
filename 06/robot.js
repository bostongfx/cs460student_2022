class Robot {

	constructor(x, y, z) {
		// Create the spine
		this.head = new THREE.Bone();
		this.head.position.set(x, y, z);
		this.neck = new THREE.Bone();
		this.neck.position.y = -10;
		this.torso = new THREE.Bone();
		this.torso.position.y = -30;

		this.head.add(this.neck);
		this.neck.add(this.torso);

		// Create the arms
		// left side arm
		this.left_upper_arm = new THREE.Bone();
		this.left_upper_arm.position.x = -5;
		this.left_upper_arm.position.y = -5;
		this.left_lower_arm = new THREE.Bone();
		this.left_lower_arm.position.x = -5;
		this.left_lower_arm.position.y = -10;
		this.left_hand = new THREE.Bone();
		this.left_hand.position.x = -3;
		this.left_hand.position.y = -1;

		this.neck.add(this.left_upper_arm);
		this.left_upper_arm.add(this.left_lower_arm);
		this.left_lower_arm.add(this.left_hand);

		// right side arm
		this.right_upper_arm = new THREE.Bone();
		this.right_upper_arm.position.y = -5;
		this.right_upper_arm.position.x = 5;
		this.right_lower_arm = new THREE.Bone();
		this.right_lower_arm.position.y = -10;
		this.right_lower_arm.position.x = 5;
		this.right_hand = new THREE.Bone();
		this.right_hand.position.x = 3;
		this.right_hand.position.y = -1;

		this.neck.add(this.right_upper_arm);
		this.right_upper_arm.add(this.right_lower_arm);
		this.right_lower_arm.add(this.right_hand);

		// legs
		// left side leg
		this.left_upper_leg = new THREE.Bone();
		this.left_upper_leg.position.y = -10;
		this.left_upper_leg.position.x = -5;
		this.left_lower_leg = new THREE.Bone();
		this.left_lower_leg.position.y = -10;
		this.left_lower_leg.position.x = -2;
		this.left_foot = new THREE.Bone();
		this.left_foot.position.x = -2;
		this.left_foot.position.z = 5;

		this.torso.add(this.left_upper_leg);
		this.left_upper_leg.add(this.left_lower_leg);
		this.left_lower_leg.add(this.left_foot);

		// right side leg
		this.right_upper_leg = new THREE.Bone();
		this.right_upper_leg.position.y = -10;
		this.right_upper_leg.position.x = 5;
		this.right_lower_leg = new THREE.Bone();
		this.right_lower_leg.position.y = -10;
		this.right_lower_leg.position.x = 2;
		this.right_foot = new THREE.Bone();
		this.right_foot.position.x = 2;
		this.right_foot.position.z = 5;

		this.torso.add(this.right_upper_leg);
		this.right_upper_leg.add(this.right_lower_leg);
		this.right_lower_leg.add(this.right_foot);
	}

	show = function(scene) {
		var rGroup = new THREE.Group();
		rGroup.add( this.head );

		var helper = new THREE.SkeletonHelper( rGroup );
		helper.material.linewidth = 3;

		scene.add(rGroup);
		scene.add(helper);
	}

}