#version 460

uniform mat4 m_pvm;
uniform mat4 m_view;
uniform mat4 m_viewModel;
uniform mat3 m_normal;
uniform vec4 ldir;
uniform vec4 diffuse;

in vec4 position; // model space
in vec3 normal; // model space

// out vec4 cor;
out vec3 n, ld, eye_cam;

void main() {

    n = normalize(m_normal * normal); // camera space
    ld = normalize(vec3(m_view * ldir)); // camera space
    eye_cam = -vec3(m_viewModel * position); // camera space

    // intensity = max(0.0, dot(n,ld)); // dot() -> cosseno

    gl_Position = m_pvm * position;
}