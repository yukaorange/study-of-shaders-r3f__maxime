uniform float u_time;
uniform float u_intensity;

varying vec2 vUv;

varying float vDisplacement;

#include "./noise.glsl"

void main() {

  vDisplacement = cnoise(position + vec3(2.0 * u_time * 0.4));

  vec3 newPosition = position + normal * (u_intensity * vDisplacement);

  vec4 modelPosition = modelMatrix * vec4(newPosition, 1.0);

  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  vUv = uv;

  gl_Position = projectedPosition;
}