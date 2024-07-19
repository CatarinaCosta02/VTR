#version 460

//uniform
uniform vec4 diffuse;
uniform vec4 l_dir; // world space
uniform mat4 m_view;
uniform vec4 specular;

// input
in vec3 n, eye;

// output
out vec4 color;

void main() {

    vec3 nn = normalize(n); // normal por pixel (camera space)
    vec3 ld = normalize(vec3(m_view * -l_dir)); // camera space
    float intensityD = max(0.0, dot(nn,ld));
    //color = vec4(0.5);
    vec3 e = normalize(eye);
    vec3 h = normalize(ld + eddd);
    float intensityS = max(0.0, dot(nn, h));
    color = (intensityD * diffuse) + (specular * pow(intensityS, 128) );
}