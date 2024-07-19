# pip install noise perlin_noise
import numpy as np
from noise import pnoise2
from PIL import Image
import random

width, height = 512, 512
scale = random.uniform(50.0, 150.0)
octaves = random.randint(1, 10)
persistence = random.uniform(0.1, 0.9)
lacunarity = random.uniform(0.5, 2)

noise_map = np.zeros((height, width))
for y in range(height):
    for x in range(width):
        nx = x / scale
        ny = y / scale
        noise_map[y][x] = pnoise2(nx, ny, octaves=octaves, persistence=persistence, lacunarity=lacunarity, repeatx=width, repeaty=height, base=42)

min_val = np.min(noise_map)
max_val = np.max(noise_map)
normalized_noise_map = (noise_map - min_val) / (max_val - min_val)
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

img = Image.fromarray(heightmap, 'L')
img.save('textures/perlinNoise.png')
