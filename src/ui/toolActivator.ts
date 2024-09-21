import { button, dropdown, store } from "openrct2-flexui";
import { BiomeFactory } from "../biomeFactory";
import { SelectionTool } from "../selectionTool";
import { WindowTab } from "./windowTab";


export class ToolActivator extends WindowTab {
  selectedBiome = 0;
  activeTool: SelectionTool | undefined = undefined;
  biomes = BiomeFactory.biomes();

  isActivated: boolean = false;
  buttonText = store<string>("Activate tool");

  constructor() {
    super();
    this.image = "scenery_trees";
    this.width = 200;
    this.height = 140;
    this.content = [
      dropdown({
        items: this.biomes.map(b => b.name),
        onChange: (index: number) => {
          this.selectedBiome = index;
        }
      }),
      button({
        text: this.buttonText,
        height: "28px",
        onClick: () => {
          if (this.isActivated) {
            this.activeTool?.cancel();
          } else {
            this.activeTool = new SelectionTool("forestForge", "tree_down");
            this.activeTool.onCancel = this.cancel;
            this.activeTool.activate();
            this.buttonText.set("Cancel");
            this.isActivated = true;
          }
        }
      }),
      button({
        text: "Apply",
        height: "28px",
        onClick: () => {
          this.activeTool?.apply(this.biomes[this.selectedBiome]);
          this.buttonText.set("Activate tool");
          this.isActivated = false;
        }
      })
    ];
  }

  private cancel() {
    this.isActivated = false;
    this.buttonText.set("Activate tool");
  }
}
