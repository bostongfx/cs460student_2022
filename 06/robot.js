class Robot{

	constructor (x, y, z) {

		// Body

		this.head = new THREE.Bone();
		this.neck = new THREE.Bone();
		this.torso = new THREE.Bone();

		this.head.position.set( x, y, z );

		this.neck.position.y = -10;
		this.torso.position.y = -30;

		this.head.add(this.neck);
		this.neck.add(this.torso);

		// Arms

		// Left
		this.leftUpperArm = new THREE.Bone();
		this.leftLowerArm = new THREE.Bone();
		this.leftHand = new THREE.Bone();

		this.leftUpperArm.position.y = -5;
		this.leftUpperArm.position.x = 5;

		this.leftLowerArm.position.y = -15;
		this.leftLowerArm.position.x = 5;

		this.leftHand.position.y = -5;
		this.leftHand.position.x = 5;

		this.neck.add(this.leftUpperArm);
		this.leftUpperArm.add(this.leftLowerArm);
		this.leftLowerArm.add(this.leftHand);

		// Right
		this.rightUpperArm = new THREE.Bone();
		this.rightLowerArm = new THREE.Bone();
		this.rightHand = new THREE.Bone();

		this.rightUpperArm.position.y = -5;
		this.rightUpperArm.position.x = -5;

		this.rightLowerArm.position.y = -15;
		this.rightLowerArm.position.x = -5;

		this.rightHand.position.y = -5;
		this.rightHand.position.x = -5;

		this.neck.add(this.rightUpperArm);
		this.rightUpperArm.add(this.rightLowerArm);
		this.rightLowerArm.add(this.rightHand);

		// Legs

		// Left
		this.leftUpperLeg = new THREE.Bone();
		this.leftLowerLeg = new THREE.Bone();
		this.leftFoot = new THREE.Bone();

		this.leftUpperLeg.position.y = -5;
		this.leftUpperLeg.position.x = 5;

		this.leftLowerLeg.position.y = -15;
		this.leftLowerLeg.position.x = 5;

		this.leftFoot.position.y = -5;
		this.leftFoot.position.x = 5;

		this.torso.add(this.leftUpperLeg);
		this.leftUpperLeg.add(this.leftLowerLeg);
		this.leftLowerLeg.add(this.leftFoot);

		// Right
		this.rightUpperLeg = new THREE.Bone();
		this.rightLowerLeg = new THREE.Bone();
		this.rightFoot = new THREE.Bone();

		this.rightUpperLeg.position.y = -5;
		this.rightUpperLeg.position.x = -5;

		this.rightLowerLeg.position.y = -15;
		this.rightLowerLeg.position.x = -5;

		this.rightFoot.position.y = -5;
		this.rightFoot.position.x = -5;

		this.torso.add(this.rightUpperLeg);
		this.rightUpperLeg.add(this.rightLowerLeg);
		this.rightLowerLeg.add(this.rightFoot);

	}

	show(scene) {
		var rGroup = new THREE.Group();
		rGroup.add( this.head );
		var helper = new THREE.SkeletonHelper( rGroup );
		helper.material.linewidth = 3; // make the skeleton thick
		scene.add(rGroup);
		scene.add(helper);
	}

	raise_left_arm() {
		this.movement = 'raise left arm';
	}

	lower_left_arm() {
		this.movement = 'lower left arm';
	}

	kick() {
		this.movement = 'kick';
	}

	dance() {

		this.movement = 'dance';

	}

	onAnimate() {

		var T, x, y, z, w, quat;

		const parts = [this.leftUpperArm, this.rightUpperArm, this.rightUpperLeg, 
					 this.leftUpperLeg, this.head];

		var part = null;

		if (this.movement == 'raise left arm') {

			T = Math.PI;
			x = Math.sin(T/2);
			y = 0;
			z = 0;
			w = Math.cos(T/2);
			quat = new THREE.Quaternion(x, y, z, w);

			this.leftUpperArm.quaternion.slerp(quat, 0.05);
			
		} 
		else if (this.movement == 'lower left arm') {

			quat = new THREE.Quaternion(0, 0, 0, 1);
			this.leftUpperArm.quaternion.slerp(quat, 0.05);

		} 
		else if (this.movement == 'kick') {

			if (this.rightUpperLeg.quaternion.x >= 0.69) {

				this.movement = 'kicked';

			}
			else {

				T = Math.PI/2;
				x = Math.sin(T/2);
				y = 0;
				z = 0;
				w = Math.cos(T/2);
				quat = new THREE.Quaternion(x, y, z, w);

				this.rightUpperLeg.quaternion.slerp(quat, 0.05);

			}

		}
		else if (this.movement == 'kicked') {

			quat = new THREE.Quaternion(0, 0, 0, 1);
			this.rightUpperLeg.quaternion.slerp(quat, 0.05);

		}
		else if (this.movement == 'dance') {

			var idx = Math.floor(Math.random()*parts.length);

			part = parts[idx];

			if (part.quaternion.w <= 0.90) {

				this.movement = 'danced';

			}
			else {

				T = Math.PI/2;
				x = Math.sin(T/2);
				y = 0;
				z = 0;
				w = Math.cos(T/2);
				quat = new THREE.Quaternion(x, y, z, w);

				part.quaternion.slerp(quat, 0.05);
			}

		}
		else if (this.movement == 'danced') {

			quat = new THREE.Quaternion(0, 0, 0, 1);
			this.leftUpperArm.quaternion.slerp(quat, 0.05);
			this.rightUpperArm.quaternion.slerp(quat, 0.05);
			this.rightUpperLeg.quaternion.slerp(quat, 0.05);
			this.leftUpperLeg.quaternion.slerp(quat, 0.05);
			this.head.quaternion.slerp(quat, 0.05);

		}

	}

}