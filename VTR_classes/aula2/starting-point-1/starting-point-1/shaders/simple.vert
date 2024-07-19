#version 460

uniform mat4 m_pvm;
uniform mat4 m_view;
uniform mat3 m_normal;
uniform mat4 m_viewModel;
uniform vec4 ldir;
uniform vec4 diffuse;

in vec4 position; //model space
in vec3 normal; // model space

out vec3 n, ld, eye_cam;

void main() {

    //passar a normal para o espaço camera
    n = normalize(m_normal*normal); //esta no camera space
    ld = normalize(vec3(m_view*ldir)); //estamos a converter para vetor de 3 ao invés de 4, fica no camera space
    eye_cam = -vec3(m_viewModel * position);

    //float intensity = max(0.0, dot(n,ld)); //quando, por exemplo a luz está por baixo, o cosseno vai dar valores negativos e por isso pretendemos o máximo entre a operação e 0
    gl_Position = m_pvm * position;
}