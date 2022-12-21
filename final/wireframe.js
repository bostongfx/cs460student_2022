// Starter code from example:
// https://threejs.org/examples/?q=wire#webgl_materials_wireframe
const wireframe = {
	VertexShader: `
		attribute vec3 center;
		varying vec3 vCenter;

		void main() {

			vCenter = center;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,
	FragmentShader: `
		uniform float thickness;
		uniform vec3 glow;
		uniform vec3 inner;
		uniform vec3 face;

		varying vec3 vCenter;

		void main() {

			vec3 afwidth = fwidth( vCenter.xyz );

			vec3 edge3 = smoothstep( ( thickness - 1.0 ) * afwidth, thickness * afwidth, vCenter.xyz );

			float alpha = 1.0 - min( min( edge3.x, edge3.y ), edge3.z );

			vec3 black = vec3(0.0, 0.0, 0.0);
			vec3 white = vec3(1.0, 1.0, 1.0);

			vec3 colorStep = smoothstep(
				vec3(0.9, 0.0, 0.9),
				white,
				vec3(alpha, alpha, alpha)
			);

			gl_FragColor.rgb = 
			(colorStep == black) ?
				face
			:
				(alpha < 1.) ?
					glow
				:
					inner;
		gl_FragColor.a = 1.0;
		}`,
		setupAttributes: ( THREE, geometry ) => {

			const vectors = [
				new THREE.Vector3( 1, 0, 0 ),
				new THREE.Vector3( 0, 1, 0 ),
				new THREE.Vector3( 0, 0, 1 )
			];

			const position = geometry.attributes.position;
			const centers = new Float32Array( position.count * 3 );

			for ( let i = 0, l = position.count; i < l; i ++ ) {

				vectors[ i % 3 ].toArray( centers, i * 3 );

			}

			geometry.setAttribute( 'center', new THREE.BufferAttribute( centers, 3 ) );

		}
	};

	/* UNUSED FRAGMENT SHADER CODE
		vec3 color3 = edge3 * 2.0;

		vec3 shinyCurves = smoothstep(
			glow-edge3,
			glow,
			edge3
		);
	*/

export {wireframe};