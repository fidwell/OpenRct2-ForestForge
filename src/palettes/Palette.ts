import { PaletteType } from "./PaletteType";
import SceneryDesc from "./sceneryDesc";

export default class Palette {
  constructor(readonly name: string, readonly objects: SceneryDesc[], readonly type: PaletteType = PaletteType.BuiltIn) {
  }
}
