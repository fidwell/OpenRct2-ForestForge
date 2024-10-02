import { Colour } from "openrct2-flexui";
import Palette from "../palettes/Palette";
import { PaletteType } from "../palettes/PaletteType";
import SceneryDesc from "../palettes/sceneryDesc";

const pluginNamespace = "ForestForge";
const palettesKey = `${pluginNamespace}.palettes`;

export default class StorageService {
  public static storePalette(palette: Palette) {
    if (palette.type === PaletteType.BuiltIn)
      return;

    const storedPalettes = StorageService.getStoredPalettes()
      .filter(p => p.name !== palette.name);
    storedPalettes.push(palette);
    context.sharedStorage.set(palettesKey, storedPalettes);
  }

  public static removePalette(name: string) {
    const storedStuff = context.sharedStorage.get<Palette[]>(palettesKey, []);
    this.setStoredPalettes(storedStuff.filter(p => p.name !== name))
  }

  public static setStoredPalettes(palettes: Palette[]) {
    context.sharedStorage.set(palettesKey, palettes);
  }

  public static getStoredPalettes(): Palette[] {
    const storedStuff = context.sharedStorage.get<Palette[]>(palettesKey, []);
    if (storedStuff.length === 0) {
      console.log("No saved palettes found. Loading example custom palette.");
      const desert = new Palette("Desert", <SceneryDesc[]>[
        new SceneryDesc("rct2.scenery_small.tropt1", 1, Colour.Invisible, 0),
        new SceneryDesc("rct2.scenery_small.tpm", 1, Colour.Invisible, 0),
        new SceneryDesc("rct2.scenery_small.th2", 1, Colour.Invisible, 0),
        new SceneryDesc("rct2.scenery_small.tjb1", 1, Colour.Invisible, 0),
        new SceneryDesc("rct2ww.scenery_small.japsnotr", 1, Colour.Invisible, 5),
        new SceneryDesc("rct2.scenery_small.tsh4", 1, Colour.Invisible, 0),
        new SceneryDesc("rct2.scenery_small.tg19", 1, Colour.DarkYellow, 0),
        new SceneryDesc("rct2.scenery_small.tg19", 2, Colour.Invisible, 0)
      ], PaletteType.Custom);
      storedStuff.push(desert);
    }
    return storedStuff;
  }
}
