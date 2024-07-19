#version 330

layout (triangles) in;
layout(triangle_strip, max_vertices = 3) out;

// Input data
in Data {
    vec3 normal;
    vec3 lightDir;
} DataIn[3];

// Output data
out Data {
    vec3 normal;
    vec3 lightDir;
} DataOut;

void main() {
    
    // Pass the normal and light direction to the fragment shader
    for (i = 0; i < 3; i++) {
    gl_Position = gl_in[i].gl_Position;
    DataOut.normal = DataIn[i].normal;
    DataOut.lightDir = DataIn[i].lightDir;
    EmitVertex();
    }

    // End the triangle 
    EndPrimitive();
}