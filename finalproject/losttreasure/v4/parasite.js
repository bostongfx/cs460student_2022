import * as Three from '../../libs/Three.module.js';

class parasite{
	constructor(options){
		//const fps = options.fps || 60; 
		
		this.name = options.name | 'parasite';
		
		this.animations = {};	
		
		options.app.scene.add(options.object);
		
		this.object = options.object;
		this.pathLines = new Three.Object3D();
		this.path_color = new Three.Color(0xFFFFFF);
		options.app.scene.add(this.pathLines);

		this.showPath = options.showPath | false;

        this.waypoints = options.waypoints;

        this.dead = false;
		
        this.speed = options.speed;
        this.app = options.app;
        
        if (options.app.pathfinder){
            this.pathfinder = options.app.pathfinder;
            this.zone = options.zone;
            this.navMeshGroup = this.pathfinder.getGroup(this.zone, this.object.position);	
        }
		
		const pt = this.object.position.clone();
		pt.z += 10;
		this.object.lookAt(pt);
        
        if (options.animations){
            this.mixer = new Three.AnimationMixer(options.object);
            options.animations.forEach( (animation) => {
                this.animations[animation.name.toLowerCase()] = animation;
            })
        }
	}

    get randomWaypoint(){
		const index = Math.floor(Math.random()*this.waypoints.length);
		return this.waypoints[index];
	}
	
	newPath(pt){
        const mc = this.object;
        
        if (this.pathfinder===undefined){
            this.calculatedPath = [ pt.clone() ];
            pt.y = mc.position.y;
            const quaternion = mc.quaternion.clone();
            mc.lookAt(pt);
            this.quaternion = mc.quaternion.clone();
            mc.quaternion.copy(quaternion); 
            this.action = 'walking';
            return;
        }
        
		const targetGroup = this.pathfinder.getGroup(this.zone, pt);
		const closestTargetNode = this.pathfinder.getClosestNode(pt, this.zone, targetGroup);
		
		this.calculatedPath = this.pathfinder.findPath(mc.position, pt, this.zone, this.navMeshGroup);

		if (this.calculatedPath && this.calculatedPath.length) {
			this.action = 'walking';
			
			const pt = this.calculatedPath[0].clone();
			pt.y = mc.position.y;
			const quaternion = mc.quaternion.clone();
			mc.lookAt(pt);
			this.quaternion = mc.quaternion.clone();
			mc.quaternion.copy(quaternion);
			
			if (this.showPath){
				if (this.pathLines) this.app.scene.remove(this.pathLines);

				const material = new Three.LineBasicMaterial({
					color: this.path_color,
					linewidth: 2
				});

				const points = [mc.position];
				

				this.calculatedPath.forEach( function(vertex){
					points.push(vertex.clone());
				});

				let geometry = new Three.BufferGeometry().setFromPoints( points );

				this.pathLines = new Three.Line( geometry, material );
				this.app.scene.add( this.pathLines );

				const debugPath = [mc.position].concat(this.calculatedPath);

				debugPath.forEach(vertex => {
					geometry = new Three.SphereGeometry( 0.2 );
					const material = new Three.MeshBasicMaterial( {color: this.path_color} );
					const node = new Three.Mesh( geometry, material );
					node.position.copy(vertex);
					this.pathLines.add( node );
				});
			}
		} else {
			this.action = 'idle';
			
            if (this.pathfinder){
                const closestmcNode = this.pathfinder.getClosestNode(mc.position, this.zone, this.navMeshGroup);
                const clamped = new Three.Vector3();
                this.pathfinder.clampStep(
                    mc.position, 
                    pt.clone(), 
                    closestmcNode, 
                    this.zone, 
                    this.navMeshGroup, 
                    clamped);
            }
            
			if (this.pathLines) this.app.scene.remove(this.pathLines);
		}
	}
	
	set action(name){
		if (this.actionName == name.toLowerCase()) return;
				
		const clip = this.animations[name.toLowerCase()];

		if (clip!==undefined){
			const action = this.mixer.clipAction( clip );
			if (name=='slashed'){
				action.clampWhenFinished = true;
				action.setLoop( Three.LoopOnce );
			}
			action.reset();
			const nofade = this.actionName == 'slashed';
			this.actionName = name.toLowerCase();
			action.play();
			if (this.curAction){
				if (nofade){
					this.curAction.enabled = false;
				}else{
					this.curAction.crossFadeTo(action, 0.5);
				}
			}
			this.curAction = action;
		}
	}
	
	update(dt){
		const speed = this.speed;
		const mc = this.object;
		
		if (this.mixer) this.mixer.update(dt);
		
        if (this.calculatedPath && this.calculatedPath.length) {
            const targetPosition = this.calculatedPath[0];

            const vel = targetPosition.clone().sub(mc.position);
            
            let pathLegComplete = (vel.lengthSq()<0.01);
            
            if (!pathLegComplete) {
                const prevDistanceSq = mc.position.distanceToSquared(targetPosition);
                vel.normalize();
                if (this.quaternion) mc.quaternion.slerp(this.quaternion, 0.1);
                mc.position.add(vel.multiplyScalar(dt * speed));
                const newDistanceSq = mc.position.distanceToSquared(targetPosition);
                pathLegComplete = (newDistanceSq > prevDistanceSq);
            } 
            
            if (pathLegComplete){
                this.calculatedPath.shift();
                if (this.calculatedPath.length==0){
                    if (this.waypoints!==undefined){
                        this.newPath(this.randomWaypoint);
                    }else{
                        mc.position.copy( targetPosition );
                        this.action = 'idle';
                    }
                }else{
                    const pt = this.calculatedPath[0].clone();
                    pt.y = mc.position.y;
                    const quaternion = mc.quaternion.clone();
                    mc.lookAt(pt);
                    this.quaternion = mc.quaternion.clone();
                    mc.quaternion.copy(quaternion); 
                }
            }
        }else{
            if (!this.dead && this.waypoints!==undefined) this.newPath(this.randomWaypoint);
        }
    }
}

export { parasite };