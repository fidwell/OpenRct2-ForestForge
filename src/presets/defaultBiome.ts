import { Colour } from "openrct2-flexui";
import Biome from "../biomes/biome";
import SceneryDesc from "../biomes/sceneryDesc";

export const defaultBiome = new Biome("Default", <SceneryDesc[]>[
  new SceneryDesc("rct2.scenery_small.tap", 1),
  new SceneryDesc("rct2.scenery_small.tcc", 1),
  new SceneryDesc("rct2.scenery_small.tcf", 3),
  new SceneryDesc("rct2.scenery_small.tco", 1),
  new SceneryDesc("rct2.scenery_small.tel", 2),
  new SceneryDesc("rct2.scenery_small.tghc", 1),
  new SceneryDesc("rct2.scenery_small.thl", 1),
  new SceneryDesc("rct2.scenery_small.tmc", 1),
  new SceneryDesc("rct2.scenery_small.tmzp", 4),
  new SceneryDesc("rct2.scenery_small.tns", 1),
  new SceneryDesc("rct2.scenery_small.trf", 2),
  new SceneryDesc("rct2.scenery_small.tce", 1),
  new SceneryDesc("rct2.scenery_small.tcy", 1),
  new SceneryDesc("rct2.scenery_small.tghc2", 1),
  new SceneryDesc("rct2.scenery_small.trf2", 1),
  new SceneryDesc("rct2.scenery_small.twn", 2),
  new SceneryDesc("rct2.scenery_small.tcj", 4),
  new SceneryDesc("rct2.scenery_small.tmbj", 2),
  new SceneryDesc("rct2.scenery_small.tsh0", 2),
  new SceneryDesc("rct2.scenery_small.tsh1", 4),
  new SceneryDesc("rct2.scenery_small.tsh2", 1),
  new SceneryDesc("rct2.scenery_small.tsh3", 2),
  new SceneryDesc("rct2.scenery_small.tsh4", 4),
  new SceneryDesc("rct2.scenery_small.tsh5", 2),
  new SceneryDesc("rct2.scenery_small.tg19", 4, Colour.GrassGreenDark),
  new SceneryDesc("rct2.scenery_small.tg19", 2, Colour.MossGreen),
  new SceneryDesc("rct2.scenery_small.tg19", 1, Colour.DarkGreen),
  new SceneryDesc("rct2.scenery_small.tg19", 1, Colour.BordeauxRed),
  new SceneryDesc("rct2.scenery_small.tg19", 1, Colour.Yellow),
  new SceneryDesc("rct2.scenery_small.tg19", 2, Colour.Invisible)
]);
