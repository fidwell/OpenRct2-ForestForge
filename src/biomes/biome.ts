import { BiomeType } from "./BiomeType";
import SceneryDesc from "./sceneryDesc";

export default class Biome {
  public type: BiomeType;

  constructor(readonly name: string, readonly objects: SceneryDesc[]) {
    this.type = BiomeType.BuiltIn;
  }
}
