import Biome from "./biome";
import { coniferousForest } from "./biomes/coniferousForest";
import { defaultBiome } from "./biomes/defaultBiome";
import { desert } from "./biomes/desert";
import { pineForest } from "./biomes/pineForest";
import { snowyForest } from "./biomes/snowyForest";
import { swamp } from "./biomes/swamp";

export abstract class BiomeFactory {
  public static biomes(): Biome[] {
    const biomes = [
      defaultBiome,
      desert,
      swamp,
      coniferousForest,
      pineForest,
      snowyForest
    ]
    biomes.sort((a, b) => a.name.localeCompare(b.name));
    return biomes;
  }
}
