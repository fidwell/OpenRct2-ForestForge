import Palette from "../palettes/Palette";
import { PaletteType } from "../palettes/PaletteType";

const pluginNamespace = "ForestForge";
const palettesKey = `${pluginNamespace}.palettes`;

export default class StorageService {
  public static onChange?: () => void;

  public static storePalette(palette: Palette) {
    if (palette.type === PaletteType.BuiltIn)
      return;

    const storedPalettes = StorageService.getStoredPalettes()
      .filter(p => p.name !== palette.name);
    storedPalettes.push(palette);
    context.sharedStorage.set(palettesKey, storedPalettes);

    if (this.onChange) {
      this.onChange();
    }
  }

  public static removePalette(name: string) {
    const storedStuff = context.sharedStorage.get<Palette[]>(palettesKey, []);
    this.setStoredPalettes(storedStuff.filter(p => p.name !== name));

    if (this.onChange) {
      this.onChange();
    }
  }

  public static setStoredPalettes(palettes: Palette[]) {
    context.sharedStorage.set(palettesKey, palettes);
  }

  public static getStoredPalettes(): Palette[] {
    return context.sharedStorage.get<Palette[]>(palettesKey, []);
  }
}
