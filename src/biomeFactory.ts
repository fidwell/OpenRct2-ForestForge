import Biome from "./biome";
import { coniferousForest } from "./presets/coniferousForest";
import { desert } from "./presets/desert";
import { pineForest } from "./presets/pineForest";
import { snowyForest } from "./presets/snowyForest";
import { swamp } from "./presets/swamp";
import StorageService from "./services/storageService";

export abstract class BiomeFactory {
  public static biomes(): Biome[] {
    const biomes = [
      desert,
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
