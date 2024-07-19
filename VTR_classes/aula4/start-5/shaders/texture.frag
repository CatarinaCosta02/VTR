#version 460

// uniforms

uniform sampler2D tex;

uniform int div = 5;
uniform float width = 0.5;
uniform float gap = 0.1;
uniform float factor = 

uniform vec4 diffuse = vec4(0.3, 0.3, 0.6, 0);
uniform vec4 secondary_diffuse = vec4(0.5,0.5,0.5,0);

// interpolated inputs

in vec2 tc;

// output
out vec4 color;


void main() {

    vec2 fr = fract(tc * div);
    float f;
    if (fr.s < width-gap)
        color = diffuse;
    else if (fr.s < width){
        f = fr.s - (width-gap);
        f = f/gap;
        color = mix(diffuse, secondary_diffuse,f);
    }
    else if (fr.s < 1 - gap)
        color = secondary_diffuse;
    else{
        f = fr.s - (1-gap);
        f = f/gap;
        color = mix(diffuse, secondary_diffuse,f);
    }

    f = smoothstep(width-gap, width, fr.s) - smoothstep(1-gap, 1, fr.s);
    color = mix(diffuse,secondary_diffuse,f);

    vec2 deriv = vec2(dFdx(fr,s), dPdy(fr,s));
    float len = length(deriv);

    float actualGap = len * factor;
    //color = texture(tex,fr);
    //color = texture(tex, tc*2); //texture(tex, tc); //vec4(0,1,0,1);//se multiplicar por 2 a textura diminui, porque ele vai por duas imagens no lugar de uma

    //vec2 res = textureQueryLod(tex, tc.st);

    
    /*if (fr.s > width )//&& fr.t > width)
        color = diffuse;
    else
        color = secondary_diffuse;

        //discard;

    //if (res.x == 0)
    //    color = vec4(1,0,0,0);
    //else if (res.x < 1)
    //    color = vec4(0,1,0,0);
    //else if (res.x < 2)
    //    color = vec4(0,0,1,0);
    //else if (res.x < 3)
    //    color = vec4(0,1,1,0);
    //else if (res.x < 4)
    //    color = vec4(1,0,1,0);
    //else if (res.x < 5)
    //    color = vec4(1,1,0,0);
    //else
    //    color = vec4(0.5); */
}