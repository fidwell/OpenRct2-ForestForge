import { Colour } from "openrct2-flexui";
import Biome from "../biomes/biome";
import { BiomeType } from "../biomes/BiomeType";
import SceneryDesc from "../biomes/sceneryDesc";

const pluginNamespace = "ForestForge";
const palettesKey = `${pluginNamespace}.palettes`;

export default class StorageService {
  public static storePalette(biome: Biome) {
    console.log(`storageService 11: type is ${biome.type}`);
    if (biome.type === BiomeType.BuiltIn)
      return;

    console.log(`storageService 15: saving ${biome.name}`);
    const storedPalettes = StorageService.getStoredPalettes()
      .filter(p => p.name !== biome.name);
    storedPalettes.push(biome);
    context.sharedStorage.set(palettesKey, storedPalettes);
  }

  public static removePalette(name: string) {
    const storedStuff = context.sharedStorage.get<Biome[]>(palettesKey, []);
    this.setStoredPalettes(storedStuff.filter(p => p.name !== name))
  }

  public static setStoredPalettes(palettes: Biome[]) {
    context.sharedStorage.set(palettesKey, palettes);
  }

  public static getStoredPalettes(): Biome[] {
    const storedStuff = context.sharedStorage.get<Biome[]>(palettesKey, []);
    if (storedStuff.length === 0) {
      console.log("Loading example custom biome");
      const desert = new Biome("Desert", <SceneryDesc[]>[
        new SceneryDesc("rct2.scenery_small.tropt1", 1, Colour.Invisible, 0),
        new SceneryDesc("rct2.scenery_small.tpm", 1, Colour.Invisible, 0),
        new SceneryDesc("rct2.scenery_small.th2", 1, Colour.Invisible, 0),
        new SceneryDesc("rct2.scenery_small.tjb1", 1, Colour.Invisible, 0),
        new SceneryDesc("rct2ww.scenery_small.japsnotr", 1, Colour.Invisible, 5),
        new SceneryDesc("rct2.scenery_small.tsh4", 1, Colour.Invisible, 0),
        new SceneryDesc("rct2.scenery_small.tg19", 1, Colour.DarkYellow, 0),
        new SceneryDesc("rct2.scenery_small.tg19", 2, Colour.Invisible, 0)
      ], BiomeType.Custom);
      storedStuff.push(desert);
    }
    return storedStuff;
  }
}
