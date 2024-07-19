#version 460

in vec3 incident, n;

uniform samplerCube tex_cm;
uniform float alpha = 0.5;
uniform float eta = 1.1;

out vec4 color;

void main() {

    vec3 i = normalize(incident);
    vec3 nn = normalize(n);
    // vetor de reflexão
    //vec3 refl = reflect(normalize(incident), normalize(n));
    vec3 refl = reflect(i, nn);

    vec4 crefl = texture(tex_cm, refl);
    vec3 refr = refract(i, nn, eta);
    vec4 crefr = texture(tex_cm, refr);


    float dot_in = dot(-i,nn);
    float k = 1 - eta * eta * (1 - dot_in * dot_in);

    color = mix(crefl, crefr, k);
    //float opacity = 1 - dot(-i,nn);
    //color = vec4(texture(tex_cm, refl).rgb, alpha);
    //color = vec4(texture(tex_cm, refl).rgb, opacity);

    // vou ter 3 etas, e 3 cores, e pegar um canal de refração que vai buscar cada cor
    
}

