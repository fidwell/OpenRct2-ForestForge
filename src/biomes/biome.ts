import { BiomeType } from "./BiomeType";
import SceneryDesc from "./sceneryDesc";

export default class Biome {
  constructor(readonly name: string, readonly objects: SceneryDesc[], readonly type: BiomeType = BiomeType.BuiltIn) {
  }
}
