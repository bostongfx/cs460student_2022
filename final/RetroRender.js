import * as THREE from "https://threejs.org/build/three.module.js";

// Starter code from example:
// https://threejs.org/examples/?q=wire#webgl_materials_wireframe


/**
 * Use either RetroRender.vertexShader and RetroRender.fragmentShader,
 * with the helper function RetroRender.setupAttributes(), or the pre-packaged
 * RetroRender.render().
 * 
 * RetroRender.render(geometry, lineWidth: number, colors: {glow, inner, face})
 * glow, inner, and face need to be 4-element arrays of floats with values 0.0-1.0
 * 
 * - lineWidth: I have found that 1.5 provides the best result. Higher values will make the line
 *   thicker.
 * - glow is the color of the outer portion of the line
 * - inner is the color of the inner portion of the line; for the best effect,
 *   this can be either white or a lighter shade of the glow color. If desired, this can also be
 *   the same color as the glow color.
 * - face is the color of faces between the edges. Dark grey or black provide the best effect.
 */
let RetroRender = {
	vertexShader: `
		attribute vec3 center;
		varying vec3 vCenter;

		void main() {

			vCenter = center;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,
	fragmentShader: `
	uniform float thickness;
	uniform vec4 glow;
	uniform vec4 inner;
	uniform vec4 face;

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

		gl_FragColor.rgba = 
		(colorStep == black) ?
			face
		:
			(alpha < 1.0) ?
				glow
			:
				inner;
	}`,
	setupAttributes: (geometry) => {
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
	},
	render: (geometry, lineWidth, colors) => {
		// SHADER
		RetroRender.setupAttributes(geometry);

		var material = new THREE.ShaderMaterial({
			vertexShader: RetroRender.vertexShader,
			fragmentShader: RetroRender.fragmentShader,
			uniforms: {
					'thickness': {value: lineWidth},
					'glow': {value: colors.glow},
					'inner': {value: colors.inner},
					'face': {value: colors.face}
			},
			alphaToCoverage: true,
			side: THREE.DoubleSide,
		});
		return new THREE.Mesh(geometry, material);
	}
};

export default RetroRender;