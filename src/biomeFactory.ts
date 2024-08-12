import Biome from "./biome";

export abstract class BiomeFactory {
  public static biomes(): Biome[] {
    const defaultBiome = new Biome(
      [
        "rct2.scenery_small.tap",
        "rct2.scenery_small.tcc",
        "rct2.scenery_small.tcf",
        "rct2.scenery_small.tco",
        "rct2.scenery_small.tel",
        "rct2.scenery_small.tghc",
        "rct2.scenery_small.thl",
        "rct2.scenery_small.tmc",
        "rct2.scenery_small.tmzp",
        "rct2.scenery_small.tns",
        "rct2.scenery_small.trf",
        "rct2.scenery_small.tce",
        "rct2.scenery_small.tcy",
        "rct2.scenery_small.tghc2",
        "rct2.scenery_small.trf2",
        "rct2.scenery_small.twn",
        "rct2.scenery_small.tcj",
        "rct2.scenery_small.tmbj",
        "rct2.scenery_small.tsh0",
        "rct2.scenery_small.tsh1",
        "rct2.scenery_small.tsh2",
        "rct2.scenery_small.tsh3",
        "rct2.scenery_small.tsh4",
        "rct2.scenery_small.tsh5"
      ]
    );
    return [defaultBiome];
  }
}
