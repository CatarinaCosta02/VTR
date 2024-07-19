import numpy as np
from PIL import Image
import noise
import random

width, height = 512, 512
scale = random.uniform(50.0, 150.0)
octaves = random.randint(1, 10)
persistence = random.uniform(0.1, 0.9)
lacunarity = random.uniform(0.5, 2)

terrain = np.zeros((height, width))
    
for y in range(height):
    for x in range(width):
        amplitude = 1.0
        frequency = 1.0
            
        for i in range(octaves):
            value = noise.pnoise3(x / scale * frequency, y / scale * frequency, 0)
            amplitude *= persistence
            frequency *= lacunarity
                
            terrain[y, x] += value * amplitude

min_val = np.min(terrain)
max_val = np.max(terrain)
normalized_noise_map = (terrain - min_val) / (max_val - min_val)
heightmap = (normalized_noise_map * 255).astype(np.uint8)

river_width = random.randint(10, 40)
river_curve = random.randint(20, 120)
river_pos = random.randint(2, 6)
for x in range(0, width):
    y = int(height / river_pos + 20 * np.sin(x / river_curve))
    for i in range(-river_width // 2, river_width // 2):
        if 0 <= y + i < height:
            heightmap[y + i, x] = 0

from scipy.ndimage import gaussian_filter
heightmap = gaussian_filter(heightmap, sigma=5)

img = Image.fromarray(heightmap,'L')
img.save('textures/simplexNoise.png')

print("Terreno salvo como simplexNoise.png")
