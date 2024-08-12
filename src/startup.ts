import { BiomeFactory } from "./biomeFactory";
import { SelectionTool } from "./selectionTool";

function onClickMenuItem() {
  const biomes = BiomeFactory.biomes();
  new SelectionTool("forestForger", "tree_down", biomes[0]).activate();
}

export function startup() {
  if (typeof ui !== "undefined") {
    ui.registerMenuItem("Forest Forger", () => onClickMenuItem());
  }
}
