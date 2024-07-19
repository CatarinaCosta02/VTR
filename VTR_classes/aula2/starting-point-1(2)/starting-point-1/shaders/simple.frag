#version 460

uniform vec4 diffuse;
uniform float shininess = 128.0;

// in vec4 cor;
in vec3 n, ld, eye_cam;

out vec4 color;

void main() {

    vec3 nn = normalize(n);

    float intensity = max(0.0, dot(nn,ld)); // dot() -> cosseno

    float specInt = 0;
    if(intensity > 0) {
        vec3 h = normalize(ld + normalize(eye_cam));
        specInt = pow(max(dot(h, nn), 0.0), shininess);
    }

    vec4 cor = diffuse * max(0.30,intensity) + specInt * vec4(1);

    color = cor;
    // color = vec4(intensity)
}