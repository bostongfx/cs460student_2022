class Robot{

	constructor (x, y, z) {

		var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, 'blue')
  		var geometry = fromhelper[0];
  		var material = fromhelper[1];
  		var bones = fromhelper[2];

		var mesh = new THREE.SkinnedMesh( geometry, material );
	  	var skeleton = new THREE.Skeleton( bones );
	  	mesh.add( bones[ 0 ] );
	  	mesh.bind( skeleton );

	  	// Anchor point
	  	this.root = bones[ 0 ]; // anchor point of robot
  		this.root.position.set( x, y, z );

		// Body

		this.head = bones[1];
		this.neck = bones[2];
		this.torso = bones[3];

		this.neck.position.y = -10;
		this.torso.position.y = -30;

		this.body_mesh = mesh;

		// Arms

		// Left
		var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, 'blue')
		var geometry = fromhelper[0];
		var material = fromhelper[1];
		var bones = fromhelper[2];

		var mesh = new THREE.SkinnedMesh( geometry, material );
		var skeleton = new THREE.Skeleton( bones );
		mesh.add( bones[0] );
		mesh.bind( skeleton );

		this.neck.add(bones[0]);

		this.leftUpperArm = bones[1];
		this.leftLowerArm = bones[2];
		this.leftHand = bones[3];

		this.leftUpperArm.position.y = -5;
		this.leftUpperArm.position.x = 5;

		this.leftLowerArm.position.y = -15;
		this.leftLowerArm.position.x = 5;

		this.leftHand.position.y = -5;
		this.leftHand.position.x = 5;

		this.leftArmMesh = mesh;

		// Right
		var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, 'blue')
		var geometry = fromhelper[0];
		var material = fromhelper[1];
		var bones = fromhelper[2];

		var mesh = new THREE.SkinnedMesh( geometry, material );
		var skeleton = new THREE.Skeleton( bones );
		mesh.add( bones[0] );
		mesh.bind( skeleton );

		this.neck.add(bones[0]);

		this.rightUpperArm = bones[1];
		this.rightLowerArm = bones[2];
		this.rightHand = bones[3];

		this.rightUpperArm.position.y = -5;
		this.rightUpperArm.position.x = -5;

		this.rightLowerArm.position.y = -15;
		this.rightLowerArm.position.x = -5;

		this.rightHand.position.y = -5;
		this.rightHand.position.x = -5;

		this.rightArmMesh = mesh;

		// Legs

		// Left
		var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, 'blue')
		var geometry = fromhelper[0];
		var material = fromhelper[1];
		var bones = fromhelper[2];

		var mesh = new THREE.SkinnedMesh( geometry, material );
		var skeleton = new THREE.Skeleton( bones );
		mesh.add( bones[0] );
		mesh.bind( skeleton );

		this.torso.add(bones[0]);

		this.leftUpperLeg = bones[1];
		this.leftLowerLeg = bones[2];
		this.leftFoot = bones[3];

		this.leftUpperLeg.position.y = -5;
		this.leftUpperLeg.position.x = 5;

		this.leftLowerLeg.position.y = -15;
		this.leftLowerLeg.position.x = 5;

		this.leftFoot.position.y = -5;
		this.leftFoot.position.x = 5;

		this.leftLegMesh = mesh;

		// Right
		var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, 'blue')
		var geometry = fromhelper[0];
		var material = fromhelper[1];
		var bones = fromhelper[2];

		var mesh = new THREE.SkinnedMesh( geometry, material );
		var skeleton = new THREE.Skeleton( bones );
		mesh.add( bones[0] );
		mesh.bind( skeleton );

		this.torso.add(bones[0]);

		this.rightUpperLeg = bones[1];
		this.rightLowerLeg = bones[2];
		this.rightFoot = bones[3];

		this.rightUpperLeg.position.y = -5;
		this.rightUpperLeg.position.x = -5;

		this.rightLowerLeg.position.y = -15;
		this.rightLowerLeg.position.x = -5;

		this.rightFoot.position.y = -5;
		this.rightFoot.position.x = -5;

		this.rightLegMesh = mesh;

	}

	show(scene) {

		scene.add( this.body_mesh );
		scene.add( this.leftArmMesh );
		scene.add( this.rightArmMesh );
		scene.add( this.leftLegMesh );
		scene.add( this.rightLegMesh );
		

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
