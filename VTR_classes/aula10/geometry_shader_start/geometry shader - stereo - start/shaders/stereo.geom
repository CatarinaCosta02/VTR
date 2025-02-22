#version 330

layout(triangles) in;
layout (triangle_strip, max_vertices=6) out;

uniform mat4 m_proj;

uniform vec4 camPos, camView, camUp;
uniform vec4 l_dir;

uniform float eye_separation = 0.03;

in DataV2G {
    vec4 normal;
} DataIn[];

out Data {
    vec3 normal;
    vec3 eye;
    vec3 lightDir;
} DataOut;

// this example assumes the model matrix to be the identity matrix,
// hence, we can use the view matrix as the normal matrix

void main() {

    mat4 mT, mR, m_View;

    vec3 camRight = normalize(cross(vec3(camView), vec3(camUp)));

    mR = transpose(mat4(camRight, 0, camUp, -camView, 0, 0, 0, 1));

    vec3 pos = vec3(camPos) - camRight * eye_separation;
    mT = mat4(1,0,0,0 , 0,1,0,0, 0,0,1,0, -pos, 1.0);

    m_View = mR * mT;

    gl_Layer = 0;
    for(int i = 0; i < 3; i++){
        gl_Position = m_proj * m_View * gl_in[i].gl_Position;
        DataOut.normal = vec3 (m_View * DataIn[i].normal);
        DataOut.eye = vec3 (m_View * gl_in[i].gl_Position);
        DataOut.lightDir = vec3 (m_View * -l_dir);
        EmitVertex();        
        
    } 
    EndPrimitive();

    vec3 pos = vec3(camPos) + camRight * eye_separation;
    mT = mat4(1,0,0,0 , 0,1,0,0, 0,0,1,0, -pos, 1.0);

        m_View = mR * mT;

    gl_Layer = 1;
    for(int i = 0; i < 3; i++){
        gl_Position = m_proj * m_View * gl_in[i].gl_Position;
        DataOut.normal = vec3 (m_View * DataIn[i].normal);
        DataOut.eye = vec3 (m_View * gl_in[i].gl_Position);
        DataOut.lightDir = vec3 (m_View * -l_dir);
        EmitVertex();        
        
    } 
    EndPrimitive();
}