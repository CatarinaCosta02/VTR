#version 460

// adding a uniform with the diffuse color
// uniform vec4 diffuse;

//in vec4 cor;
uniform vec4 diffuse;
uniform float shininess = 128.0;
in vec3 n, ld;
out vec4 color;

void main() {

    vec nn = normalize(n);
    float intensity = max(0.0, dot( nn, ld));
    float spectInt = 0;
    if (intensity > 0){
        vec3 h = normalize(ld + normalize(eye_cam));
        spectInt = pow( max(dot(h,nn)0.0), shininess)
    }
    vec4 cor = diffuse* max(0.30, intensity) + spectInt * vec4(1);
    color = cor;
    //color = vec4(intensity);
}