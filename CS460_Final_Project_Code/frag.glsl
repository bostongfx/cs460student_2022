precision mediump float;
varying vec2 vUv;
uniform sampler2D tDiffuse;
uniform float amount;
uniform float intensity;
float noise(vec2 p)
{
    vec2 k = vec2(23.147, 2.665); /* e*pi, 2^sqrt(2) */
    return fract( cos( dot(p, k) ) * 12345.678 );
}
void main(){
    vec4 color = texture2D(tDiffuse, vUv);
    vec2 uv_random = vUv;
    uv_random.y *= noise(vec2(uv_random.y, amount));
    color.rgb += noise(uv_random) * intensity;
    gl_FragColor = vec4(color);
}