import { Colour } from "openrct2-flexui";
import Palette from "../palettes/Palette";
import SceneryDesc from "../palettes/sceneryDesc";

export const desert = new Palette("Desert", <SceneryDesc[]>[
  new SceneryDesc("rct2.scenery_small.tropt1", 1, Colour.Invisible, 0),
  new SceneryDesc("rct2.scenery_small.tpm", 1, Colour.Invisible, 0),
  new SceneryDesc("rct2.scenery_small.th2", 1, Colour.Invisible, 0),
  new SceneryDesc("rct2.scenery_small.tjb1", 1, Colour.Invisible, 0),
  new SceneryDesc("rct2ww.scenery_small.japsnotr", 1, Colour.Invisible, 5),
  new SceneryDesc("rct2.scenery_small.tsh4", 1, Colour.Invisible, 0),
  new SceneryDesc("rct2.scenery_small.tg19", 1, Colour.DarkYellow, 0),
  new SceneryDesc("rct2.scenery_small.tg19", 2, Colour.Invisible, 0)
]);
