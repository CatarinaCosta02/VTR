# VTR_Project

### terrain.frag (vários)

Estes ficheiros contêm o Fragment Shader responsável por calcular a cor final de cada pixel renderizado na tela, para cada terreno. Eles determinam como a luz é aplicada aos objetos, como as texturas são mapeadas e como os objetos são sombreados. Estes shaders são particularmente importantes para a aplicação de texturas variadas ao terreno, dependendo da estação do ano, e para a manipulação de reflexões e misturas de cores.

Existem os seguintes Fragment Shaders:
- `terrainA.frag` - corresponde à estação de outono
- `terrainS.frag` - corresponde à estação de verão
- `terrainSP.frag` - corresponde à estação de primavera
- `terrainW.frag` - corresponde à estação de inverno

### terrain.vert 

Este ficheiro contém o _shader_ de vértices (_Vertex Shader_). Este componente é crucial para processar os dados de cada vértice individual de objetos 3D, incluindo suas posições e possíveis transformações necessárias para a renderização. No contexto deste projeto, o shader de vértices é responsável por transformar as posições dos vértices do espaço do mundo para o espaço de _clip_, além de calcular as direções de luz e normais no espaço de visualização, preparando assim os dados para a fase de renderização.

### terrain.mlib

Este ficheiro contém os dados multimédia associados ao projeto, incluindo texturas, modelos 3D (_terrain_), _skybox_, e quaisquer outros recursos necessários para a visualização e interação com o ambiente gerado pelo terreno. Ele serve como um repositório central para todos os recursos gráficos usados no projeto.

### terrain.xml

Este ficheiro funcionará como um documento de configuração para o projeto, especificando parâmetros de inicialização, configurações de renderização e possivelmente definições de texturas e shaders. Este arquivo permite uma fácil modificação e personalização do projeto, facilitando a experimentação com diferentes configurações sem a necessidade de alterações diretas nos códigos dos shaders.


### Pyhton Scripts

Estes scripts servem para gerar as imagens de ruído _Perlin_ (_perlinNoiseScript.py_) e _Simplex_ (_simplex_NoiseScript.py_) para serem utilizados pelo ficheiro XML para gerar os terrenos tridimensionais.
