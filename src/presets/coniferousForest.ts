import { Colour } from "openrct2-flexui";
import Biome from "../biomes/biome";
import SceneryDesc from "../biomes/sceneryDesc";

export const coniferousForest = new Biome("Coniferous forest", <SceneryDesc[]>[
  new SceneryDesc("rct2.scenery_small.tns", 1),
  new SceneryDesc("rct2.scenery_small.tns", 1, undefined, 5),
  new SceneryDesc("rct2.scenery_small.tns", 1, undefined, 6),
  new SceneryDesc("rct2.scenery_small.trf", 1),
  new SceneryDesc("rct2.scenery_small.trf", 1, undefined, 4),
  new SceneryDesc("rct2.scenery_small.trf", 1, undefined, 5),
  new SceneryDesc("rct2.scenery_small.trf2", 1),
  new SceneryDesc("rct2.scenery_small.trf2", 1, undefined, 4),
  new SceneryDesc("rct2.scenery_small.trf2", 1, undefined, 5),
  new SceneryDesc("rct2.scenery_small.tmzp", 1),
  new SceneryDesc("rct2.scenery_small.tmzp", 1, undefined, 4),
  new SceneryDesc("rct2.scenery_small.tmzp", 1, undefined, 5),
  new SceneryDesc("rct2.scenery_small.tmbj", 1),
  new SceneryDesc("rct2.scenery_small.tcf", 1),
  new SceneryDesc("rct2.scenery_small.tcf", 1, undefined, 5),
  new SceneryDesc("rct2.scenery_small.tsh0", 4),
  new SceneryDesc("rct2.scenery_small.tsh1", 7),
  new SceneryDesc("rct2.scenery_small.tsh4", 8),
  new SceneryDesc("rct2.scenery_small.tg19", 8, Colour.GrassGreenDark),
  new SceneryDesc("rct2.scenery_small.tg19", 3, Colour.Invisible),
  new SceneryDesc("rct2.scenery_small.tg19", 1, Colour.BordeauxRed)
]);
