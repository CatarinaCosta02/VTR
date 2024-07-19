#version 460

uniform float shininess = 300;
uniform sampler2D rock1, rock2, rock3, grass1, water1, water2, water3, water4, sand1, forest1;

in vec4 eye;
in vec2 tc;
in vec3 n;
in vec3 pos;
in vec3 lightDirection;

out vec4 color;

void main() {

    float topThreshold = 1.8;
    float mediumThreshold = 1.5;
    float lowThreshold = 0.25;
    float waterThreshold = 0.1;

    vec4 grassColor = texture(grass1, tc);
    vec4 sandColor = texture(sand1, tc);
    vec4 forestColor = texture(forest1, tc);
    
    vec4 rock1Color = texture(rock1, tc);
    vec4 rockColor = mix(texture(rock1, tc), texture(rock2, tc), 0.1);
    rockColor = mix(rockColor, texture(rock3, tc), 0.5);

    vec4 water1Color = texture(water1, tc);
    vec4 waterColor = mix(texture(water1, tc), texture(water2, tc), 0.5);
    waterColor = mix(waterColor, texture(water3, tc), 0.5);
    waterColor = mix(waterColor, texture(water4, tc), 0.5);
    float eSpec = water1Color.r; // Reflexão especular a partir da cor vermelha da textura water1

    vec3 nn = normalize(n);
    float lightIntensity = max(dot(nn, lightDirection), 0.0);

    vec3 viewDir = normalize(eye.xyz - pos);
    vec3 reflDir = reflect(-viewDir, nn);
    vec2 reflTc = reflDir.xy * 0.5 + 0.5;
    vec4 reflectionColor = texture(water1, reflTc);
    vec4 reflectionWaterColor = mix(waterColor, reflectionColor, 0.5);

    vec4 spec = vec4(0.0);
    vec3 e = normalize(vec3(eye));

    if (lightIntensity > 0.0) {
        vec3 h = normalize(lightDirection + e);    
        float intSpec = max(dot(h, nn), 0.0);
        spec = vec4(1) * pow(intSpec, shininess);
    }

    if (pos.y > mediumThreshold) {
        color = vec4(rockColor.rgb * lightIntensity, rockColor.a);
    } else if (pos.y <= mediumThreshold && pos.y > lowThreshold) {
        color = vec4(grassColor.rgb * lightIntensity, grassColor.a);
    } else if (pos.y <= lowThreshold) {
        float blendFactor = (lowThreshold - pos.y) / (lowThreshold - waterThreshold);
        vec4 transitionColor = mix(grassColor, sandColor, blendFactor*2);
        vec4 waterColor = mix(transitionColor, waterColor, blendFactor);
        waterColor = mix(waterColor, reflectionWaterColor, 0.7);
        color = vec4(waterColor.rgb * (1.0 - eSpec) + spec.rgb * eSpec, waterColor.a);
    } else {
        color = vec4(sandColor.rgb * lightIntensity, sandColor.a);
    }
}