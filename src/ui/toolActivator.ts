import { button, dropdown, store } from "openrct2-flexui";
import { BiomeFactory } from "../biomes/biomeFactory";
import { SelectionTool } from "../selectionTool";
import { WindowTab } from "./windowTab";

let selectedBiome = 0;
let activeTool: SelectionTool | undefined = undefined;
let isActivated: boolean = false;

const biomes = BiomeFactory.biomes();
const buttonText = store<string>("Activate tool");

export class ToolActivator extends WindowTab {
  constructor() {
    super();
    this.image = "scenery_trees";
    this.width = 200;
    this.height = 140;
    this.content = [
      dropdown({
        items: biomes.map(b => b.name),
        onChange: (index: number) => {
          selectedBiome = index;
        }
      }),
      button({
        text: buttonText,
        height: "28px",
        onClick: () => {
          if (isActivated) {
            activeTool?.cancel();
          } else {
            activeTool = new SelectionTool("forestForge", "tree_down");
            activeTool.onCancel = this.cancel;
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
    ];
  }

  private cancel() {
    isActivated = false;
    buttonText.set("Activate tool");
  }
}
