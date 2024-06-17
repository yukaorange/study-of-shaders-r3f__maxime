uniform vec3 u_colorA;
uniform vec3 u_colorB;

uniform float u_time;
uniform float u_intensity;

varying float vDisplacement;
varying vec2 vUv;

void main() {

  float distort = 2.0 * u_intensity * vDisplacement;

  vec3 color = vec3(abs(vUv - 0.5) * 2.0 * (1.0 - distort), 1.0);

  // vec3 testColor = vec3(vDisplacement);

  // color = testColor;

  gl_FragColor = vec4(color, 1.0);
}