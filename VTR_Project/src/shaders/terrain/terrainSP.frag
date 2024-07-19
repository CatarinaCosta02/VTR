#version 460

uniform float shininess = 300;
uniform sampler2D rock1, rock2, rock3;
uniform sampler2D flowers1, flowers2, flowers3, flowers4, flowers5, flowers6, flowers7;
uniform sampler2D water1, water2, water3, water4, sand1, forest1, grass1;

in vec4 eye;
in vec2 tc;
in vec3 n;
in vec3 pos;
in vec3 lightDirection;

out vec4 color;

void main() {

    float topThreshold = 1.8;
    float mediumThreshold = 1.7;
    float lowThreshold = 0.3;
    float waterThreshold = 0.1;

    vec4 sandColor = texture(sand1, tc);
    vec4 grassColor = texture(grass1, tc);
    
    vec4 rock1Color = texture(rock1, tc);
    vec4 rockColor = mix(texture(rock1, tc), texture(rock2, tc), 0.1);
    rockColor = mix(rockColor, texture(rock3, tc), 0.5);

    vec4 water1Color = texture(water1, tc);
    vec4 waterColor = mix(texture(water1, tc), texture(water2, tc), 0.5);
    waterColor = mix(waterColor, texture(water3, tc), 0.5);
    waterColor = mix(waterColor, texture(water4, tc), 0.5);
    float eSpec = water1Color.r; // reflexao especular a partir da cor vermelha da textura water1

    vec4 flowers1Color = texture(flowers1, tc);
    vec4 flowers2Color = texture(flowers2, tc);
    vec4 flowers3Color = texture(flowers3, tc);
    vec4 flowers4Color = texture(flowers4, tc);
    vec4 flowers5Color = texture(flowers5, tc);
    vec4 flowers6Color = texture(flowers6, tc);
    vec4 flowers7Color = texture(flowers7, tc);
    
    vec4 flowersColor = mix(flowers1Color, flowers2Color, 0.5);
    flowersColor = mix(flowersColor, flowers3Color, 0.5);
    flowersColor = mix(flowersColor, flowers4Color, 0.5);
    flowersColor = mix(flowersColor, flowers5Color, 0.5);
    flowersColor = mix(flowersColor, flowers6Color, 0.5);
    flowersColor = mix(flowersColor, flowers7Color, 0.5);

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
        color = vec4(flowersColor.rgb * lightIntensity, flowersColor.a);
    } else if (pos.y <= lowThreshold) {
        float blendFactor = (lowThreshold - pos.y) / (lowThreshold - waterThreshold);
        vec4 transitionColor = mix(grassColor, sandColor, blendFactor*2);
        vec4 waterColor = mix(transitionColor, waterColor, blendFactor);
        waterColor = mix(waterColor, reflectionWaterColor, 0.7);
        color = vec4(waterColor.rgb * (1.0 - eSpec) + spec.rgb * eSpec, waterColor.a);
    }
}
