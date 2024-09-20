import { listview } from "openrct2-flexui";
import Biome from "../biome";
import { BiomeFactory } from "../biomeFactory";
import { WindowTab } from "./windowTab";

export class BiomeList extends WindowTab {
  private biomes: Biome[];

  constructor() {
    super();
    this.image = {
      frameBase: 5277,
      frameCount: 7,
      frameDuration: 4,
    } as ImageAnimation;
    this.width = 250;
    this.height = 170;
    this.biomes = BiomeFactory.biomes();
    this.content = [
      listview({
        columns: ["Name", "Type"],
        items: this.biomes.map(b => [
          b.name,
          "Built-in"
        ]),
        canSelect: true,
        onClick: (item, number) => console.log(`row: ${item}, column: ${number}`)
      })
    ];
  }
}
