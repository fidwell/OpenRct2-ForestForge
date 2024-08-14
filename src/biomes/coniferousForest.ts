import Biome from "../biome";
import { Colour } from "../colour";
import SceneryDesc from "../sceneryDesc";

export const coniferousForest = new Biome("Coniferous forest", <SceneryDesc[]>[
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
  new SceneryDesc("rct2.scenery_small.tsh0", 1),
  new SceneryDesc("rct2.scenery_small.tsh1", 1),
  new SceneryDesc("rct2.scenery_small.tsh4", 1),
  new SceneryDesc("rct2.scenery_small.tg19", 4, Colour.ForestGreen),
  new SceneryDesc("rct2.scenery_small.tg19", 2, Colour.Umber),
  new SceneryDesc("rct2.scenery_small.tg19", 2, Colour.Invisible)
]);
