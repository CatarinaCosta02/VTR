#version 460

uniform mat4 m_pvm;
uniform mat3 m_normal;
uniform vec3 l_dir;
uniform mat4 m_view;
uniform mat4 m_viewModel;

in vec4 position;
in vec3 normal;
in vec2 texCoord0;

out vec3 incident;
out vec4 eye;
out vec2 tc;
out vec3 n;
out vec3 pos;
out vec3 lightDirection;

void main() {
    gl_Position = m_pvm * position;
    
    eye = -(m_viewModel * position);
    tc = texCoord0;
    n = normalize(m_normal * normal);
    pos = vec3(position);

    vec4 lightDirViewSpace = m_view * vec4(l_dir, 0.0);
    lightDirection = normalize(-lightDirViewSpace.xyz);
}