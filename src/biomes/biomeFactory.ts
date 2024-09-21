import Biome from "../biomes/biome";
import { coniferousForest } from "../presets/coniferousForest";
import { defaultBiome } from "../presets/defaultBiome";
import { pineForest } from "../presets/pineForest";
import { snowyForest } from "../presets/snowyForest";
import { swamp } from "../presets/swamp";
import StorageService from "../services/storageService";

export abstract class BiomeFactory {
  public static biomes(): Biome[] {
    const biomes = [
      defaultBiome,
      swamp,
      coniferousForest,
      pineForest,
      snowyForest,
      ...StorageService.getStoredPalettes()
    ];
    biomes.sort((a, b) => a.name.localeCompare(b.name));
    return biomes;
  }
}
