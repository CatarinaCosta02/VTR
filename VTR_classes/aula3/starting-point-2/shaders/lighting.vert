#version 460

// uniforms
uniform mat4 m_pvm;
uniform mat3 m_normal;
uniform mat4 m_vm;

// input streams - local space
in vec4 position;
in vec3 normal;

//output
out vec3 n; // normal in camera space
out vec3 eye; 

void main() {

    n = normalize(m_normal * normal);
    eye = -vec3( m_vm * position);
    //vec3 h = normalize(l + eye);
    gl_Position = m_pvm * position; 
}