import { button, groupbox, horizontal, listview, store } from "openrct2-flexui";
import Biome from "../biome";
import { BiomeFactory } from "../biomeFactory";
import { WindowTab } from "./windowTab";

export class BiomeList extends WindowTab {
  private biomes: Biome[] = BiomeFactory.biomes();
  private buttonSize = 24;

  private selectedBiome = store<Biome>(this.biomes[0]);
  private objects = store<string[][]>([]);

  constructor() {
    super();
    this.image = {
      frameBase: 5277,
      frameCount: 7,
      frameDuration: 4,
    } as ImageAnimation;
    this.width = 250;
    this.height = 300;
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
        isStriped: true,
        onClick: (item, _) => {
          this.selectedBiome.set(this.biomes[item]);
        }
      }),
      groupbox({
        text: "Edit",
        content: [
          listview({
            columns: [{
              header: "Identifier",
              width: 150,
              canSort: true
            }, {
              header: "Size",
              width: 40,
              canSort: true
            }, {
              header: "Weight",
              width: 25,
              canSort: true
            }],
            items: this.objects,
            canSelect: false,
            isStriped: true
          })
        ]
      })
    ];

    this.selectedBiome.subscribe((b) => {
      const objectArray = b.allObjects.map(o => [
        o.identifier,
        "todo",
        o.weight.toString()
      ]);
      this.objects.set(objectArray);
    });
  }
}
