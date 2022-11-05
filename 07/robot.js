class Robot {

	constructor(x, y, z) {
		this.robot = new THREE.Group();
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

		// add a sphere for a head
		// texture is of "koro-sensei" from Assassination Classroom!
		// Character by Yusei Matsui
		var korosphere = new THREE.SphereGeometry(20, 20, 20);
		var texture = new THREE.TextureLoader().load('korotexture.png');
		var koromaterial = new THREE.MeshStandardMaterial(
			{map: texture, roughness: 1}
		);
		this.koromesh = new THREE.Mesh(korosphere, koromaterial);
		this.koromesh.position.x = x;
		this.koromesh.position.y = y+15;
		this.koromesh.position.z = z;
		this.robot.add(this.koromesh);

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

		// left arm
		var fromHelper = HELPER.cylinderSkeletonMesh(4, 5, 'red');
		var geometry = fromHelper[0];
		var material = fromHelper[1];
		var bones = fromHelper[2];

		var mesh = new THREE.SkinnedMesh(geometry, material);
		var skeleton = new THREE.Skeleton(bones);
		mesh.add(bones[0]);
		mesh.bind(skeleton);
		this.bodyMesh.add(mesh);
		this.neck.add(bones[0]); // arm comes from neck

		this.left_shoulder = bones[1];
		this.left_shoulder.position.x = -1;
		this.left_upper_arm = bones[2];
		this.left_upper_arm.position.x = -5;
		this.left_upper_arm.position.y = -5;
		this.left_lower_arm = bones[3];
		this.left_lower_arm.position.x = -5;
		this.left_lower_arm.position.y = -10;
		this.left_hand = bones[4];
		this.left_hand.position.x = -3;
		this.left_hand.position.y = -1;

		// right arm
		var fromHelper = HELPER.cylinderSkeletonMesh(4, 5, 'red');
		var geometry = fromHelper[0];
		var material = fromHelper[1];
		var bones = fromHelper[2];

		var mesh = new THREE.SkinnedMesh(geometry, material);
		var skeleton = new THREE.Skeleton(bones);
		mesh.add(bones[0]);
		mesh.bind(skeleton);
		this.bodyMesh.add(mesh);
		this.neck.add(bones[0]); // arm comes from neck

		this.right_shoulder = bones[1];
		this.right_shoulder.position.x = 1;
		this.right_upper_arm = bones[2];
		this.right_upper_arm.position.y = -5;
		this.right_upper_arm.position.x = 5;
		this.right_lower_arm = bones[3];
		this.right_lower_arm.position.y = -10;
		this.right_lower_arm.position.x = 5;
		this.right_hand = bones[4];
		this.right_hand.position.x = 3;
		this.right_hand.position.y = -1;

		// left leg
		var fromHelper = HELPER.cylinderSkeletonMesh(3, 5, 'purple');
		var geometry = fromHelper[0];
		var material = fromHelper[1];
		var bones = fromHelper[2];

		var mesh = new THREE.SkinnedMesh(geometry, material);
		var skeleton = new THREE.Skeleton(bones);
		mesh.add(bones[0]);
		mesh.bind(skeleton);
		this.bodyMesh.add(mesh);
		this.torso.add(bones[0]); // leg comes from torso

		this.left_upper_leg = bones[1];
		this.left_upper_leg.position.y = -10;
		this.left_upper_leg.position.x = -5;
		this.left_lower_leg = bones[2];
		this.left_lower_leg.position.y = -10;
		this.left_lower_leg.position.x = -2;
		this.left_foot = bones[3];
		this.left_foot.position.x = -2;
		this.left_foot.position.y = -1;
		this.left_foot.position.z = 5;

		// right leg
		var fromHelper = HELPER.cylinderSkeletonMesh(3, 5, 'purple');
		var geometry = fromHelper[0];
		var material = fromHelper[1];
		var bones = fromHelper[2];

		var mesh = new THREE.SkinnedMesh(geometry, material);
		var skeleton = new THREE.Skeleton(bones);
		mesh.add(bones[0]);
		mesh.bind(skeleton);
		this.bodyMesh.add(mesh);
		this.torso.add(bones[0]); // leg comes from torso

		this.right_upper_leg = bones[1];
		this.right_upper_leg.position.y = -10;
		this.right_upper_leg.position.x = 5;
		this.right_lower_leg = bones[2];
		this.right_lower_leg.position.y = -10;
		this.right_lower_leg.position.x = 2;
		this.right_foot = bones[3];
		this.right_foot.position.x = 2;
		this.right_foot.position.y = -1;
		this.right_foot.position.z = 5;

		this.robot.add(this.bodyMesh);
	}

	show = function(scene) {
		scene.add(this.robot);
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