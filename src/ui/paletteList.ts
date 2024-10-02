import { button, Colour, colourPicker, groupbox, horizontal, label, listview, spinner, store, vertical } from "openrct2-flexui";
import identifierHelper from "../helpers/identifierHelper";
import Palette from "../palettes/Palette";
import { PaletteFactory } from "../palettes/paletteFactory";
import { PaletteType } from "../palettes/PaletteType";
import SceneryDesc from "../palettes/sceneryDesc";
import StorageService from "../services/storageService";
import showRenamer from "./renamer";
import { WindowTab } from "./windowTab";

export class PaletteList extends WindowTab {
  // todo: make this a store, so the listview can update
  private palettes: Palette[] = [];
  private paletteListView = store<ListViewItem[]>([]);
  private buttonSize = 24;

  private selectedPalette = store<Palette>(new Palette("", []));
  private selectedPaletteIndex = -1;
  private noPaletteSelected = store<boolean>(true);
  private selectedPaletteIsBuiltIn = store<boolean>(true);
  private objects = store<string[][]>([]);

  private entryDisabled = store<boolean>(true);
  private selectedObjectIndex = 0;
  private selectedObjectIdentifier = store<string>("");
  private selectedObjectWeight = store<number>(0);
  private selectedObjectVoffset = store<number>(0);
  private selectedObjectColour = store<Colour>(0);

  constructor() {
    super();
    this.refreshPaletteList();
    this.image = {
      frameBase: 5277,
      frameCount: 7,
      frameDuration: 4,
    } as ImageAnimation;
    this.width = 350;
    this.height = 480;
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
          disabled: this.selectedPaletteIsBuiltIn,
          onClick: () => {
            const p = this.selectedPalette.get()
            const oldName = p.name;
            showRenamer(oldName, (name: string) => {
              StorageService.removePalette(oldName);
              const newPalette = new Palette(name, p.objects, PaletteType.Custom);
              this.savePalette(newPalette);
            });
          }
        }),
        button({
          image: "copy",
          width: this.buttonSize,
          height: this.buttonSize,
          tooltip: "Copy selected palette",
          disabled: this.noPaletteSelected
        }),
        button({
          image: "demolish",
          width: this.buttonSize,
          height: this.buttonSize,
          tooltip: "Delete selected palette",
          disabled: this.selectedPaletteIsBuiltIn
        })
      ]),
      listview({
        columns: ["Name", "Type"],
        items: this.paletteListView,
        canSelect: true,
        isStriped: true,
        onClick: (index, _) => {
          const palette = this.palettes[index];
          this.selectedPalette.set(palette);
          this.selectedPaletteIndex = index;
          this.selectedPaletteIsBuiltIn.set(palette.type === PaletteType.BuiltIn);
          this.noPaletteSelected.set(false);
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
        disabled: this.selectedPaletteIsBuiltIn,
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
            disabled: this.selectedPaletteIsBuiltIn,
            canSelect: true,
            isStriped: true,
            onClick: (indexStr: number, _) => {
              if (this.selectedPaletteIsBuiltIn.get())
                return;

              const index = Number(this.objects.get()[indexStr][0]);
              const object = this.selectedPalette.get().objects[Number(index)];
              this.entryDisabled.set(false);
              this.selectedObjectIndex = index;
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
                    tooltip: "Duplicate selected object",
                    disabled: this.entryDisabled,
                    onClick: () => {
                      const palette = this.selectedPalette.get();
                      const object = palette.objects[this.selectedObjectIndex];
                      palette.objects.push(object);
                      this.savePalette(palette);
                    }
                  }),
                  button({
                    image: "demolish",
                    width: this.buttonSize,
                    height: this.buttonSize,
                    tooltip: "Delete selected object",
                    disabled: this.entryDisabled,
                    onClick: () => {
                      const palette = this.selectedPalette.get();
                      palette.objects.splice(this.selectedObjectIndex, 1);
                      this.savePalette(palette);
                    }
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
                    disabled: this.entryDisabled,
                    onChange: (weight: number) => {
                      this.selectedObjectWeight.set(weight);
                      this.saveObject();
                    }
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
                    minimum: 0,
                    maximum: 9,
                    value: this.selectedObjectVoffset,
                    disabled: this.entryDisabled,
                    onChange: (vOffset: number) => {
                      this.selectedObjectVoffset.set(vOffset);
                      this.saveObject();
                    }
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
                    disabled: this.entryDisabled,
                    onChange: (colour: Colour) => {
                      this.selectedObjectColour.set(colour);
                      this.saveObject();
                    }
                  })
                ]
              })
            ]
          })
        ]
      })
    ];

    this.selectedPalette.subscribe((b) => {
      const objectArray = b.objects.map((o: SceneryDesc, i: number) => [
        i.toString(),
        identifierHelper(o.identifier),
        o.verticalOffset?.toString() ?? "",
        o.weight.toString(),
        o.primaryColour ? Colour[o.primaryColour] : ""
      ]);
      this.objects.set(objectArray);
    });
  }

  private refreshPaletteList() {
    this.palettes = PaletteFactory.palettes();
    this.paletteListView.set(this.palettes.map(p => [
      p.name,
      PaletteType[p.type]
    ]));
  }

  private savePalette(selectedPalette: Palette) {
    StorageService.storePalette(selectedPalette);
    this.refreshPaletteList();
    this.selectedPalette.set(new Palette("", [])); // force list refresh
    this.selectedPalette.set(this.palettes[this.selectedPaletteIndex]);
  }

  private saveObject() {
    const selectedPalette = this.selectedPalette.get();
    const selectedObject = selectedPalette.objects[this.selectedObjectIndex];
    selectedPalette.objects[this.selectedObjectIndex] = new SceneryDesc(
      selectedObject.identifier,
      this.selectedObjectWeight?.get(),
      this.selectedObjectColour?.get(),
      this.selectedObjectVoffset?.get());
    this.savePalette(selectedPalette);
  }
}
