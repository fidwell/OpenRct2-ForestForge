import { button, horizontal, listview, WindowTemplate } from "openrct2-flexui";
import Biome from "../biome";
import { BiomeFactory } from "../biomeFactory";
import * as editWindow from "./editWindow";
import { WindowTab } from "./windowTab";

export class BiomeList extends WindowTab {
  private biomes: Biome[];
  private buttonSize = 24;

  private editorWindow: WindowTemplate | undefined = undefined;

  constructor() {
    super();
    this.image = {
      frameBase: 5277,
      frameCount: 7,
      frameDuration: 4,
    } as ImageAnimation;
    this.width = 250;
    this.height = 200;
    this.biomes = BiomeFactory.biomes();
    this.content = [
      horizontal([
        button({
          image: "small_scenery",
          width: this.buttonSize,
          height: this.buttonSize,
          tooltip: "Create new palette"
        }),
        button({
          image: "copy",
          width: this.buttonSize,
          height: this.buttonSize,
          tooltip: "Copy selected palette"
        }),
        button({
          image: "demolish",
          width: this.buttonSize,
          height: this.buttonSize,
          tooltip: "Delete selected palette"
        })
      ]),
      listview({
        columns: ["Name", "Type"],
        items: this.biomes.map(b => [
          b.name,
          "Built-in"
        ]),
        canSelect: true,
        onClick: (item, number) => {
          if (this.editorWindow) {
            this.editorWindow?.close();
          }

          this.editorWindow = editWindow.create(this.biomes[item]);
          this.editorWindow.open();

          console.log(`row: ${item}, column: ${number}`);
        }
      })
    ];
  }
}
