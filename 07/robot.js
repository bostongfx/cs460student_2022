class Robot {

	constructor(x, y, z) {
		// head, neck and torso:
		var fromHelper = HELPER.cylinderSkeletonMesh(3, 5, 'blue');
		var geometry = fromHelper[0];
		var material = fromHelper[1];
		var bones = fromHelper[2];

		var mesh = new THREE.SkinnedMesh(geometry, material);
		var skeleton = new THREE.Skeleton(bones);
		mesh.add(bones[0]);
		mesh.bind(skeleton);

		this.root = bones[0];
		this.root.position.set(x, y, z);

		// bones is a 4 element array
		// element 0 is anchor point
		// element 1 is the head
		this.head = bones[1];
		// element 2 is the neck
		this.neck = bones[2];
		this.neck.position.y = -10;
		// element 3 is the torso
		this.torso = bones[3];
		this.torso.position.y = -30;

		this.bodyMesh = mesh;

		// left arm : left upper arm, left lower arm, left hand
		var fromHelper = HELPER.cylinderSkeletonMesh(3, 5, 'blue');
		var geometry = fromHelper[0];
		var material = fromHelper[1];
		var bones = fromHelper[2];

		var mesh = new THREE.SkinnedMesh(geometry, material);
		var skeleton = new THREE.Skeleton(bones);
		mesh.add(bones[0]);
		mesh.bind(skeleton);

		//this.left_shoulder = new THREE.Bone();
		//this.left_shoulder.position.x = -1;
		this.neck.add(bones[0]); // arm comes from neck

		this.left_upper_arm = bones[1];
		this.left_upper_arm.position.x = -5;
		this.left_upper_arm.position.y = -5;
		this.left_lower_arm = bones[2];
		this.left_lower_arm.position.x = -5;
		this.left_lower_arm.position.y = -10;
		this.left_hand = bones[3];
		this.left_hand.position.x = -3;
		this.left_hand.position.y = -1;


		// code from 06
		/*
		this.neck.add(this.left_shoulder);
		this.left_shoulder.add(this.left_upper_arm);
		this.left_upper_arm.add(this.left_lower_arm);
		this.left_lower_arm.add(this.left_hand);

		// right side arm
		// adding a shoulder
		this.right_shoulder = new THREE.Bone();
		this.right_shoulder.position.x = 1;
		this.right_upper_arm = new THREE.Bone();
		this.right_upper_arm.position.y = -5;
		this.right_upper_arm.position.x = 5;
		this.right_lower_arm = new THREE.Bone();
		this.right_lower_arm.position.y = -10;
		this.right_lower_arm.position.x = 5;
		this.right_hand = new THREE.Bone();
		this.right_hand.position.x = 3;
		this.right_hand.position.y = -1;

		this.neck.add(this.right_shoulder);
		this.right_shoulder.add(this.right_upper_arm);
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
		*/
	}

	show = function(scene) {
		scene.add(this.bodyMesh);
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
		if (this.movement == 'raise left arm') {
			// I added the shoulder so that I could move the entire arm
			// rather than only the lower arm
			const qStart = this.left_shoulder.quaternion;
			const qEnd = new THREE.Quaternion();
			qEnd.setFromAxisAngle(new THREE.Vector3(0, 0, -1), Math.PI *2/3);
			qStart.slerp(qEnd, 0.1);
		} else if (this.movement == 'lower left arm') {
			// I added the shoulder so that I could move the entire arm
			// rather than only the lower arm
			const qStart = this.left_shoulder.quaternion;
			const qEnd = new THREE.Quaternion();
			qEnd.setFromAxisAngle(new THREE.Vector3(0, 0, 1), 0);
			qStart.slerp(qEnd, 0.1);
		} else if (this.movement == 'kick') {
			// TODO slerping and check once it is done for a backwards slerp
  		// you can use the identity quaternion for a backwards slerp
			const qStart = this.right_upper_leg.quaternion;
			const qEnd = new THREE.Quaternion();
			qEnd.setFromAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI/2);
			qStart.slerp(qEnd, 0.1);
			// Quaternion.equals() didn't seem to work
			if(qStart.w.toFixed(2) === qEnd.w.toFixed(2)) {
				this.movement = 'kick down';
			}
		} else if (this.movement == 'kick down') {
			const qStart = this.right_upper_leg.quaternion;
			const qEnd = new THREE.Quaternion();
			qEnd.setFromAxisAngle(new THREE.Vector3(1, 0, 0), 0);
			qStart.slerp(qEnd, 0.1);
		}
	}
}