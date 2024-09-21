import { button, Colour, colourPicker, groupbox, horizontal, label, listview, spinner, store, vertical } from "openrct2-flexui";
import Biome from "../biomes/biome";
import { BiomeFactory } from "../biomes/biomeFactory";
import { BiomeType } from "../biomes/BiomeType";
import { WindowTab } from "./windowTab";

export class BiomeList extends WindowTab {
  private biomes: Biome[] = BiomeFactory.biomes();
  private buttonSize = 24;

  private selectedBiome = store<Biome>(this.biomes[0]);
  private noBiomeSelected = store<boolean>(true);
  private selectedBiomeIsBuiltIn = store<boolean>(true);
  private objects = store<string[][]>([]);

  private entryDisabled = store<boolean>(true);
  private selectedObjectIdentifier = store<string>("");
  private selectedObjectWeight = store<number>(0);
  private selectedObjectVoffset = store<number>(0);
  private selectedObjectColour = store<Colour>(0);

  constructor() {
    super();
    this.image = {
      frameBase: 5277,
      frameCount: 7,
      frameDuration: 4,
    } as ImageAnimation;
    this.width = 350;
    this.height = 420;
    this.content = [
      horizontal([
        button({
          image: "small_scenery",
          width: this.buttonSize,
          height: this.buttonSize,
          tooltip: "Create new palette"
        }),
        button({
          image: "rename",
          width: this.buttonSize,
          height: this.buttonSize,
          tooltip: "Rename selected palette",
          disabled: this.selectedBiomeIsBuiltIn
        }),
        button({
          image: "copy",
          width: this.buttonSize,
          height: this.buttonSize,
          tooltip: "Copy selected palette",
          disabled: this.noBiomeSelected
        }),
        button({
          image: "demolish",
          width: this.buttonSize,
          height: this.buttonSize,
          tooltip: "Delete selected palette",
          disabled: this.selectedBiomeIsBuiltIn
        })
      ]),
      listview({
        columns: ["Name", "Type"],
        items: this.biomes.map(b => [
          b.name,
          BiomeType[b.type]
        ]),
        canSelect: true,
        isStriped: true,
        onClick: (item, _) => {
          this.selectedBiome.set(this.biomes[item]);
          this.selectedBiomeIsBuiltIn.set(this.biomes[item].type === BiomeType.BuiltIn);
          this.noBiomeSelected.set(false);
          // Clear preivously-selected object details
          this.entryDisabled.set(true);
          this.selectedObjectIdentifier.set("");
          this.selectedObjectWeight.set(0);
          this.selectedObjectVoffset.set(0);
          this.selectedObjectColour.set(Colour.Invisible);
        }
      }),
      groupbox({
        text: "Edit palette",
        disabled: this.selectedBiomeIsBuiltIn,
        content: [
          listview({
            columns: [{
                header: "#",
                width: 0
            }, {
              header: "Identifier",
              width: 80,
              canSort: true
            }, {
              header: "V-offset",
              width: 60
            }, {
              header: "Weight",
              width: 40,
              canSort: true
            }, {
              header: "Colour",
              width: 25
            }],
            items: this.objects,
            disabled: this.selectedBiomeIsBuiltIn,
            canSelect: true,
            isStriped: true,
            onClick: (item: number, _) => {
              if (this.selectedBiomeIsBuiltIn.get())
                return;

              const index = this.objects.get()[item][0];
              const object = this.selectedBiome.get().objects[Number(index)];
              this.entryDisabled.set(false);
              this.selectedObjectIdentifier.set(object.identifier);
              this.selectedObjectWeight.set(object.weight);
              this.selectedObjectVoffset.set(object.verticalOffset ?? 0);
              this.selectedObjectColour.set(object.primaryColour ?? Colour.Invisible);
            }
          })
        ]
      }),
      groupbox({
        text: this.selectedObjectIdentifier,
        disabled: this.entryDisabled,
        content: [
          vertical({
            content: [
              horizontal({
                content: [
                  button({
                    image: "eyedropper",
                    width: this.buttonSize,
                    height: this.buttonSize,
                    tooltip: "Select an object from the map",
                    disabled: this.entryDisabled
                  }),
                  button({
                    image: "copy",
                    width: this.buttonSize,
                    height: this.buttonSize,
                    tooltip: "Copy selected object",
                    disabled: this.entryDisabled
                  }),
                  button({
                    image: "demolish",
                    width: this.buttonSize,
                    height: this.buttonSize,
                    tooltip: "Delete selected object",
                    disabled: this.entryDisabled
                  })
                ]
              }),
              horizontal({
                content: [
                  label({
                    text: "Weight",
                    disabled: this.entryDisabled
                  }),
                  spinner({
                    minimum: 1,
                    maximum: 9,
                    value: this.selectedObjectWeight,
                    disabled: this.entryDisabled
                  })
                ]
              }),
              horizontal({
                content: [
                  label({
                    text: "Vertical offset",
                    disabled: this.entryDisabled
                  }),
                  spinner({
                    minimum: 1,
                    maximum: 9,
                    value: this.selectedObjectVoffset,
                    disabled: this.entryDisabled
                  })
                ]
              }),
              horizontal({
                content: [
                  label({
                    text: "Colour",
                    disabled: this.entryDisabled
                  }),
                  colourPicker({
                    colour: this.selectedObjectColour,
                    disabled: this.entryDisabled
                  })
                ]
              })
            ]
          })
        ]
      })
    ];

    this.selectedBiome.subscribe((b) => {
      const objectArray = b.objects.map((o, i) => [
        i.toString(),
        o.basicIdentifier,
        o.verticalOffset?.toString() ?? "",
        o.weight.toString(),
        o.primaryColour ? Colour[o.primaryColour] : ""
      ]);
      this.objects.set(objectArray);
    });
  }
}
