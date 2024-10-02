import { coniferousForest } from "../presets/coniferousForest";
import { defaultPalette } from "../presets/defaultPalette";
import { pineForest } from "../presets/pineForest";
import { snowyForest } from "../presets/snowyForest";
import { swamp } from "../presets/swamp";
import StorageService from "../services/storageService";
import Palette from "./Palette";

export abstract class PaletteFactory {
  public static palettes(): Palette[] {
    const palettes = [
      defaultPalette,
      swamp,
      coniferousForest,
      pineForest,
      snowyForest,
      ...StorageService.getStoredPalettes()
    ];
    palettes.sort((a, b) => a.name.localeCompare(b.name));
    return palettes;
  }
}
