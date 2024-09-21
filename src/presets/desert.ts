import { Colour } from "openrct2-flexui";
import Biome from "../biomes/biome";
import SceneryDesc from "../biomes/sceneryDesc";

export const desert = new Biome("Desert", <SceneryDesc[]>[
  new SceneryDesc("rct2.scenery_small.tropt1", 1),
  new SceneryDesc("rct2.scenery_small.tpm", 1),
  new SceneryDesc("rct2.scenery_small.th2", 1),
  new SceneryDesc("rct2.scenery_small.tjb1", 1),
  new SceneryDesc("rct2ww.scenery_small.japsnotr", 1, undefined, 5),
  new SceneryDesc("rct2.scenery_small.tsh4", 1),
  new SceneryDesc("rct2.scenery_small.tg19", 1, Colour.DarkYellow),
  new SceneryDesc("rct2.scenery_small.tg19", 2, Colour.Invisible)
]);
