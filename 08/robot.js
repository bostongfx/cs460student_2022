function getRandomColor() {
    // initializing a Color as RGB values keeps code minimal
      function getRandomRGB() {
                return Math.floor(Math.random()*256);
            }

              return {color: `rgb(${getRandomRGB()}, ${getRandomRGB()}, ${getRandomRGB()})`};
        }

function getRandomGeometry() {
    function getRandomCase() {
        return Math.floor(Math.random() * 5)
    }
    switch(getRandomCase()) {
        case 0:
                    return new THREE.BoxGeometry(10, 10, 10);
                case 1:
                    return new THREE.TorusKnotGeometry(10, 3, 64, 8);
                case 2:
                    return new THREE.SphereGeometry(10, 20, 20);
                case 3:
                    return new THREE.OctahedronGeometry(10);
                case 4:
                    return new THREE.ConeGeometry(10, 20);
                case 5:
                    return new THREE.RingGeometry(4, 10, 12);
    }
}

Robot = function( x, y, z) {
    // this is the constructor

    var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, 'blue');
    var geometry = fromhelper[0];
    var material = fromhelper[1];
    var bones = fromhelper[2];

    var mesh = new THREE.SkinnedMesh(geometry, material);
    var skeleton = new THREE.Skeleton(bones);
    mesh.add(bones[0]);
    mesh.bind(skeleton);

    this.root = bones[0];
    this.root.position.set(x,y,z);

    //bones is 4 elem array, with elem 0 as anchor point, 1 as head, 2 as neck, 3 as torso
    //head, neck, torso
    this.head = bones[1];

    this.neck = bones[2];
    this.neck.position.y = -10;

    this.torso = bones[3];
    this.torso.position.y = -25;

    this.body_mesh = mesh;

    //next HELPER use
    //left upper arm, left lower arm, left hand
    var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, 'blue');
    var geometry = fromhelper[0];
    var material = fromhelper[1];
    var bones = fromhelper[2];

    var mesh = new THREE.SkinnedMesh(geometry, material);
    var skeleton = new THREE.Skeleton(bones);
    mesh.add(bones[0]);
    mesh.bind(skeleton);

    this.neck.add(bones[0]);
    this.left_upper_arm = bones[1];
    this.left_upper_arm.position.y = -6;
    this.left_upper_arm.position.x = 5;

    this.left_lower_arm = bones[2];
    this.left_lower_arm.position.y = -9;
    this.left_lower_arm.position.x = 5;

    this.left_hand = bones[3];
    this.left_hand.position.y = -3;
    this.left_hand.position.x = 2;

    this.left_arm_mesh = mesh;

    //next HELPER use
    //right upper arm, right lower arm, right hand
    var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, 'blue');
    var geometry = fromhelper[0];
    var material = fromhelper[1];
    var bones = fromhelper[2];

    var mesh = new THREE.SkinnedMesh(geometry, material);
    var skeleton = new THREE.Skeleton(bones);
    mesh.add(bones[0]);
    mesh.bind(skeleton);

    this.neck.add(bones[0]);
    this.right_upper_arm = bones[1];
    this.right_upper_arm.position.y = -6;
    this.right_upper_arm.position.x = -5;

    this.right_lower_arm = bones[2];
    this.right_lower_arm.position.y = -9;
    this.right_lower_arm.position.x = -5;

    this.right_hand = bones[3];
    this.right_hand.position.y = -3;
    this.right_hand.position.x = -2;

    this.right_arm_mesh = mesh;

        //next HELPER use
    //left upper leg, left lower leg, left foot
    var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, 'blue');
    var geometry = fromhelper[0];
    var material = fromhelper[1];
    var bones = fromhelper[2];

    var mesh = new THREE.SkinnedMesh(geometry, material);
    var skeleton = new THREE.Skeleton(bones);
    mesh.add(bones[0]);
    mesh.bind(skeleton);

    this.torso.add(bones[0]);
    this.left_upper_leg = bones[1];
    this.left_upper_leg.position.y = -6;
    this.left_upper_leg.position.x = 5;

    this.left_lower_leg = bones[2];
    this.left_lower_leg.position.y = -9;
    this.left_lower_leg.position.x = 5;

    this.left_foot = bones[3];
    this.left_foot.position.y = -3;
    this.left_foot.position.x = 2;

    this.left_leg_mesh = mesh;

    //next HELPER use
    //right upper leg, right lower leg, right foot
    var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, 'blue');
    var geometry = fromhelper[0];
    var material = fromhelper[1];
    var bones = fromhelper[2];

    var mesh = new THREE.SkinnedMesh(geometry, material);
    var skeleton = new THREE.Skeleton(bones);
    mesh.add(bones[0]);
    mesh.bind(skeleton);

    this.torso.add(bones[0]);
    this.right_upper_leg = bones[1];
    this.right_upper_leg.position.y = -6;
    this.right_upper_leg.position.x = -5;

    this.right_lower_leg = bones[2];
    this.right_lower_leg.position.y = -9;
    this.right_lower_leg.position.x = -5;

    this.right_foot = bones[3];
    this.right_foot.position.y = -3;
    this.right_foot.position.x = -2;

    this.right_leg_mesh = mesh;


    };

Robot.prototype.raise_left_arm = function() {
    this.movement = 'raise left arm';
    };
Robot.prototype.lower_left_arm = function() {
    this.movement = 'lower left arm';
    };
Robot.prototype.kick = function() {
    this.movement = 'kick';
    };
Robot.prototype.dance = function() {
    this.movement = 'dance';
    };
Robot.prototype.walk = function() {
    this.movement = 'walk';
    };
Robot.prototype.onStep = function() {
    this.root.translateZ(3);
}

Robot.prototype.show = function( scene) { //prototype is keyword for all methods

    scene.add(this.body_mesh);
    scene.add(this.left_arm_mesh);
    scene.add(this.right_arm_mesh);
    scene.add(this.left_leg_mesh);
    scene.add(this.right_leg_mesh);

    vec_pos_global = new THREE.Vector3( );
    
    vec_test = this.neck.getWorldPosition(vec_pos_global);
    // console.log('current x', vec_test);

    };

    Robot.prototype.onAnimate = function() {
        var T = -Math.PI/4;
        const quaternion = new THREE.Quaternion();
        ident_quat = quaternion.identity()

    if (this.movement == 'raise left arm') {
        var T = Math.PI;
        var quat_to = new THREE.Quaternion(Math.sin(T/2), 0, 0, Math.cos(T/2));
        this.left_upper_arm.quaternion.slerp( quat_to, 0.5 );  
        } 

    else if (this.movement == 'lower left arm') {
        var quat_to = new THREE.Quaternion(0, 0, 0, 1);
        this.left_upper_arm.quaternion.slerp( quat_to, 0.5 ); 
        } 
    else if (this.movement == 'kick') {
        var T = -Math.PI;
        var quat_to = new THREE.Quaternion(0, 0, Math.sin(T/2), Math.cos(T/2));
        // console.log('stuff', this.left_upper_leg.quaternion);
        quat_orig = this.left_upper_leg.quaternion;
        this.left_upper_leg.quaternion.slerp( quat_to, 0.5 );
        if (this.left_upper_leg.quaternion.w < 5.0e-8 )  {
            this.movement = 'kickback';
        }
        }
    else if (this.movement == 'kickback') {
        quat_ident = new THREE.Quaternion(0, 0, 0, 1);
        this.left_upper_leg.quaternion.slerp( quat_ident, 0.5 );
    }
    else if (this.movement == 'walk') {
        // var T = -Math.PI/4;
        // var quat_to = new THREE.Quaternion(0, 0, Math.sin(T/2), Math.cos(T/2));
        var quat_to = new THREE.Quaternion(Math.sin(T/2), 0, 0, Math.cos(T/2));
        quat_orig = this.left_upper_leg.quaternion;
        this.left_upper_leg.quaternion.slerp( quat_to, 0.15 );
        // quat_back = new THREE.Quaternion(-Math.sin(T/2), 0, 0, Math.cos(T/2));
        this.right_upper_leg.quaternion.slerp(ident_quat, 0.15 );
        this.onStep();
        if (this.left_upper_leg.quaternion.x < -0.38 )  {
            this.movement = 'walk2';
        }
        }
    else if (this.movement == 'walk2') {
        // var quat_to = new THREE.Quaternion(0, 0, Math.sin(T/2), Math.cos(T/2));
        var quat_to = new THREE.Quaternion(Math.sin(T/2), 0, 0, Math.cos(T/2));
        quat_orig = this.right_upper_leg.quaternion;
        this.right_upper_leg.quaternion.slerp( quat_to, 0.15 );
        // quat_back = new THREE.Quaternion(-Math.sin(T/2), 0, 0, Math.cos(T/2));
        this.left_upper_leg.quaternion.slerp( ident_quat, 0.15 );
        this.onStep();
        // console.log('stuff', this.root.position);
        if (this.right_upper_leg.quaternion.x < -0.38) {
            this.movement = 'walk';
        }
            }
    else if (this.movement == 'dance') {

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

            this.root.position.x += shakehead;
            // this.head.position.x += shakehead;
            // this.neck.position.x += shakehead;
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
                this.movement = 'kickback';
            }

            }.bind(this), 500);
    
        }
    
      }
    };
        
