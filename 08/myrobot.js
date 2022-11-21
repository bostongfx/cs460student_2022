class Robot {

	constructor(x, y, z) {
		this.robot = new THREE.Group();
		// head, neck and torso:
		var fromHelper = HELPER.cylinderSkeletonMesh(3, 5, 'red');
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
		// texture is of "ironman-sensei" from Assassination Classroom!
		// Character by Yusei Matsui
		var ironmansphere = new THREE.SphereGeometry(20, 20, 20);
		var texture = new THREE.TextureLoader().load('ironman2.png');
		texture.needsUpdate = true;
		var ironmanmaterial = new THREE.MeshStandardMaterial(
			{map: texture, roughness: 1}
		);
		this.ironmanmesh = new THREE.Mesh(ironmansphere, ironmanmaterial);
		this.ironmanmesh.position.x = x;
		this.ironmanmesh.position.y = y+15;
		this.ironmanmesh.position.z = z;
		this.robot.add(this.ironmanmesh);

		// bones is a 4 element array
		// element 0 is anchor point
		// element 1 is the head
		this.head = bones[1];
		// element 2 is the neck
		this.neck = bones[2];
		this.neck.position.y = -15;
		// element 3 is the torso
		this.torso = bones[3];
		this.torso.position.y = -30;

		this.bodyMesh = mesh;

		// left arm
		var fromHelper = HELPER.cylinderSkeletonMesh(4, 5, 'orange');
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
		var fromHelper = HELPER.cylinderSkeletonMesh(4, 5, 'orange');
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
		var fromHelper = HELPER.cylinderSkeletonMesh(3, 5, 'orange');
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
		var fromHelper = HELPER.cylinderSkeletonMesh(3, 5, 'orange');
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

	raise_right_arm = function() {
		this.movement = 'raise right arm'
	}

	lower_right_arm = function() {
		this.movement = 'lower right arm'
	}

	kick = function() {
		this.movement = 'kick';
	}

	dance = function() {
		this.movement = 'dance'
	}

	onAnimate = function() {
		if (this.movement == 'raise left arm') {

			const qStart = this.left_shoulder.quaternion;
			const qEnd = new THREE.Quaternion();
			qEnd.setFromAxisAngle(new THREE.Vector3(0, 0, -1), Math.PI *2/3);
			qStart.slerp(qEnd, 0.1);
		} else if (this.movement == 'lower left arm') {

			const qStart = this.left_shoulder.quaternion;
			const qEnd = new THREE.Quaternion();
			qEnd.setFromAxisAngle(new THREE.Vector3(0, 0, 1), 0);
			qStart.slerp(qEnd, 0.1);
		} else if (this.movement == 'raise right arm') {

				const qStart = this.right_shoulder.quaternion;
				const qEnd = new THREE.Quaternion();
				qEnd.setFromAxisAngle(new THREE.Vector3(0, 0, -1), -Math.PI *2/3);
				qStart.slerp(qEnd, 0.1);
			} else if (this.movement == 'lower right arm') {

					const qStart = this.right_shoulder.quaternion;
					const qEnd = new THREE.Quaternion();
					qEnd.setFromAxisAngle(new THREE.Vector3(0, 0, 1), 0);
					qStart.slerp(qEnd, 0.1);
		} else if (this.movement == 'kick') {

			const qStart = this.right_upper_leg.quaternion;
			const qEnd = new THREE.Quaternion();
			qEnd.setFromAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI/2);
			qStart.slerp(qEnd, 0.1);
			if(qStart.w.toFixed(2) === qEnd.w.toFixed(2)) {
				this.movement = 'kick down';
			}
		} else if (this.movement == 'kick down') {
			const qStart = this.right_upper_leg.quaternion;
			const qEnd = new THREE.Quaternion();
			qEnd.setFromAxisAngle(new THREE.Vector3(1, 0, 0), 0);
			qStart.slerp(qEnd, 0.1);
		} else if (this.movement == 'dance') {

    if (typeof this.dancer === 'undefined') {

      this.dancer = setInterval(function() {

        //
        // some random translation
        //
        var shakehead = 3*Math.random();
        if (Math.random() < .5) {
          shakehead *= -1;
        }

        var shakeneck = 3*Math.random();
        if (Math.random() < .5) {
          shakeneck *= -1;
        }

        var shaketorso = 3*Math.random();
        if (Math.random() < .5) {
          shaketorso *= -1;
        }

        this.head.position.x += shakehead;

        this.neck.position.x += shakeneck;

        this.torso.position.x += shaketorso;


        //
        // use actions
        //
        if (Math.random() < .3) {
          this.raise_left_arm();
        }

        if (Math.random() < .3) {
          this.lower_left_arm();
        }

        if (Math.random() < .3) {
          this.kick();
        }

        if (Math.random() < .3) {
          this.movement = 'kick done';
        }

      }.bind(this), 500);

    }

  }
	}
}
