import { button, dropdown, store, window } from "openrct2-flexui";
import { BiomeFactory } from "./biomeFactory";
import { SelectionTool } from "./selectionTool";

let selectedBiome = 0;
let activeTool: SelectionTool;
const biomes = BiomeFactory.biomes();

let isActivated: boolean = false;
const buttonText = store<string>("Activate tool");

const pluginWindow = window({
  title: "Forest Forge",
  width: 200,
  height: 105,
  content: [
    dropdown({
      items: ["Default", "Desert"],
      onChange: (index: number) => {
        selectedBiome = index;
      }
    }),
    button({
      text: buttonText,
      height: "28px",
      onClick: () => {
        if (isActivated) {
          activeTool.cancel();
        } else {
          activeTool = new SelectionTool("forestForge", "tree_down");
          activeTool.onCancel = cancel;
          activeTool.activate();
          buttonText.set("Cancel");
          isActivated = true;
        }
      }
    }),
    button({
      text: "Apply",
      height: "28px",
      onClick: () => {
        activeTool?.apply(biomes[selectedBiome]);
        buttonText.set("Activate tool");
        isActivated = false;
      }
    })
  ],
  onClose: () => {
    activeTool.cancel();
  }
});

function cancel() {
  isActivated = false;
  buttonText.set("Activate tool");
}

export function startup() {
  if (typeof ui !== "undefined") {
    ui.registerMenuItem("Forest Forge", () => pluginWindow.open());
  }
}
