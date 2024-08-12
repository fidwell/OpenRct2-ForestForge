import { button, dropdown, window } from "openrct2-flexui";
import { BiomeFactory } from "./biomeFactory";
import { SelectionTool } from "./selectionTool";

let selectedTool = 0;
let activeTool: SelectionTool;
const biomes = BiomeFactory.biomes();

const pluginWindow = window({
  title: "Forest Forge",
  width: 200,
  height: 100,
  content: [
    dropdown({
			items: [ "Default", "Desert" ],
			onChange: (index: number) => {
        selectedTool = index;
      }
    }),
    button({
      text: "Activate tool",
      height: "28px",
      onClick: () => {
        activeTool = new SelectionTool("forestForge", "tree_down", biomes[selectedTool]);
        activeTool.activate();
      }
    }),
    button({
      text: "Apply",
      height: "28px",
      onClick: () => {
        activeTool?.apply();
      }
    })
  ],
  onClose: () => {
    activeTool.cancel();
  }
});

export function startup() {
  if (typeof ui !== "undefined") {
    ui.registerMenuItem("Forest Forge", () => pluginWindow.open());
  }
}
