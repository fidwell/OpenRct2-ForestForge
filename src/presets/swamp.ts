import { Colour } from "openrct2-flexui";
import Palette from "../palettes/Palette";
import SceneryDesc from "../palettes/sceneryDesc";

export const swamp = new Palette("Swamp", <SceneryDesc[]>[
  new SceneryDesc("rct2.scenery_small.tjt1", 2),
  new SceneryDesc("rct2.scenery_small.tjt2", 2),
  new SceneryDesc("rct2.scenery_small.tjt5", 1),
  new SceneryDesc("rct2.scenery_small.tjt6", 1),
  new SceneryDesc("rct2.scenery_small.tww", 1),
  new SceneryDesc("rct2.scenery_small.tww", 2, undefined, 4),
  new SceneryDesc("rct2.scenery_small.tsh1", 1),
  new SceneryDesc("rct2.scenery_small.tsh4", 1),
  new SceneryDesc("rct2.scenery_small.fern1", 2),
  new SceneryDesc("rct2.scenery_small.tbr", 1),
  new SceneryDesc("rct2.scenery_small.tjb1", 1),
  new SceneryDesc("rct2.scenery_small.tjb2", 1),
  new SceneryDesc("rct2.scenery_small.tjb3", 1),
  new SceneryDesc("rct2.scenery_small.tce", 1, undefined, 4),
  new SceneryDesc("rct2.scenery_small.tg19", 4, Colour.GrassGreenDark),
  new SceneryDesc("rct2.scenery_small.tg19", 2, Colour.DullBrownDark),
  new SceneryDesc("rct2.scenery_small.tg19", 2, Colour.Invisible)
]);
