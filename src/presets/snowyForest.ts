import { Colour } from "openrct2-flexui";
import Biome from "../biome";
import SceneryDesc from "../sceneryDesc";

export const snowyForest = new Biome("Snowy forest", <SceneryDesc[]>[
  new SceneryDesc("rct2.scenery_small.tnss", 1),
  new SceneryDesc("rct2.scenery_small.tnss", 1, undefined, 4),
  new SceneryDesc("rct2.scenery_small.tnss", 1, undefined, 5),
  new SceneryDesc("rct2.scenery_small.tnss", 1, undefined, 6),
  new SceneryDesc("rct2.scenery_small.trfs", 1),
  new SceneryDesc("rct2.scenery_small.trfs", 1, undefined, 4),
  new SceneryDesc("rct2.scenery_small.trfs", 1, undefined, 5),
  new SceneryDesc("rct2.scenery_small.trfs", 1, undefined, 6),
  new SceneryDesc("rct2.scenery_small.tcfs", 1),
  new SceneryDesc("rct2.scenery_small.tcfs", 1, undefined, 4),
  new SceneryDesc("rct2.scenery_small.tcfs", 1, undefined, 5),
  new SceneryDesc("rct2.scenery_small.tcfs", 1, undefined, 6),
  new SceneryDesc("rct2.scenery_small.trf3", 1),
  new SceneryDesc("rct2.scenery_small.tns", 1, undefined, 6),
  new SceneryDesc("rct2.scenery_small.tns", 1, undefined, 7),
  new SceneryDesc("rct2.scenery_small.tns", 1, undefined, 8),
  new SceneryDesc("rct2.scenery_small.tsh1", 7),
  new SceneryDesc("rct2.scenery_small.tsh4", 4),
  new SceneryDesc("rct2.scenery_small.tg19", 5, Colour.GrassGreenDark),
  new SceneryDesc("rct2.scenery_small.tg19", 5, Colour.White),
  new SceneryDesc("rct2.scenery_small.tg19", 3, Colour.Invisible)
]);
