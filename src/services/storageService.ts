import Biome, { BiomeType } from "../biome";
import { defaultBiome } from "../presets/defaultBiome";

const pluginNamespace = "ForestForge";
const palettesKey = `${pluginNamespace}.palettes`;

export default class StorageService {
  public static storePalette(biome: Biome) {
    if (biome.type === BiomeType.BuiltIn)
      return;

    const storedPalettes = StorageService.getStoredPalettes()
      .filter(p => p.name !== biome.name);
    storedPalettes.push(biome);
    context.sharedStorage.set(palettesKey, storedPalettes);
  }

  public static getStoredPalettes(): Biome[] {
    const storedStuff = context.sharedStorage.get<Biome[]>(palettesKey, []);
    if (storedStuff.length === 0) {
      defaultBiome.type = BiomeType.Custom;
      storedStuff.push(defaultBiome);
    }
    return storedStuff;
  }
}
