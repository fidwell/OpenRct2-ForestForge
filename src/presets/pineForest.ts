import { Colour } from "openrct2-flexui";
import Biome from "../biomes/biome";
import SceneryDesc from "../biomes/sceneryDesc";

export const pineForest = new Biome("Pine forest", <SceneryDesc[]>[
  new SceneryDesc("rct2.scenery_small.twn", 1),
  new SceneryDesc("rct2.scenery_small.twn", 1, undefined, 4),
  new SceneryDesc("rct2.scenery_small.tsb", 1),
  new SceneryDesc("rct2.scenery_small.tsb", 1, undefined, 8),
  new SceneryDesc("rct2.scenery_small.tmc", 1),
  new SceneryDesc("rct2.scenery_small.tmc", 1, undefined, 4),
  new SceneryDesc("rct2.scenery_small.tlp", 1),
  new SceneryDesc("rct2.scenery_small.tghc", 1),
  new SceneryDesc("rct2.scenery_small.tco", 1),
  new SceneryDesc("rct2.scenery_small.tcj", 1),
  new SceneryDesc("rct2.scenery_small.tsh0", 4),
  new SceneryDesc("rct2.scenery_small.tsh1", 7),
  new SceneryDesc("rct2.scenery_small.tsh3", 7),
  new SceneryDesc("rct2.scenery_small.tsh4", 8),
  new SceneryDesc("rct2.scenery_small.tsh5", 4),
  new SceneryDesc("rct2.scenery_small.tg19", 5, Colour.GrassGreenDark),
  new SceneryDesc("rct2.scenery_small.tg19", 4, Colour.MossGreen),
  new SceneryDesc("rct2.scenery_small.tg19", 3, Colour.Invisible),
  new SceneryDesc("rct2.scenery_small.tg19", 1, Colour.DullBrownLight)
]);
