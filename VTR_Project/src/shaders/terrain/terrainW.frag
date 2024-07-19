#version 460

uniform float shininess = 500;
uniform sampler2D rock1, snow1, snow2, snow3, ice, iceSpec, forest1;

in vec4 eye;
in vec2 tc;
in vec3 n;
in vec3 pos;
in vec3 lightDirection;

out vec4 color;

void main() {
    float topThreshold = 1.8;
    float mediumThreshold = 1.5;
    float lowThreshold = 0.4;
    float snowTopMixFactor = 0.5; // Aumentar o fator de mistura para mais neve no topo

    vec4 snowColor = texture(snow1, tc) * vec4(1.5, 1.5, 1.5, 1.0);  
    vec4 midSnowColor = texture(snow2, tc) * vec4(1.5, 1.5, 1.5, 1.0);  
    vec4 snowTopColor = texture(snow3, tc);  
    vec4 waterColor = texture(ice, tc); 
    vec4 rockColor = texture(rock1, tc); 
    vec4 forestColor = texture(forest1, tc); 
    float eSpec = texture(iceSpec, tc).r;

    vec3 nn = normalize(n);
    float lightIntensity = max(dot(nn, lightDirection), 0.0);

    vec3 viewDir = normalize(eye.xyz - pos);
    vec3 reflDir = reflect(-viewDir, nn);
    vec2 reflTc = reflDir.xy * 0.5 + 0.5;
    vec4 reflectionColor = texture(ice, reflTc);

    vec4 spec = vec4(0.0);
    vec3 e = normalize(vec3(eye));

    if (lightIntensity > 0.0) {
        vec3 h = normalize(lightDirection + e);    
        float intSpec = max(dot(h, nn), 0.0);
        spec = vec4(1) * pow(intSpec, shininess);
    }

    // Aplicação das texturas baseadas na altura do terreno
    if (pos.y > topThreshold) {
        // Mistura mais intensa de neve no topo da montanha
        color = mix(rockColor, snowColor, snowTopMixFactor) * vec4(lightIntensity, lightIntensity, lightIntensity, 1.0);
    } else if (pos.y <= topThreshold && pos.y > mediumThreshold) {
        color = vec4(midSnowColor.rgb * lightIntensity, midSnowColor.a);  
    } else if (pos.y <= mediumThreshold && pos.y > lowThreshold) {
        color = vec4(snowColor.rgb * lightIntensity, snowColor.a);  
    } else if (pos.y <= lowThreshold) {
        // Manter o rio como gelo
        waterColor = mix(waterColor, reflectionColor, 0.7);  
        color = vec4(waterColor.rgb * eSpec + spec.rgb * eSpec, waterColor.a);
    } else {
        color = vec4(snowColor.rgb * lightIntensity, snowColor.a);  
    }
}
