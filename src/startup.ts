import { button, dropdown, listview, store, tab, tabwindow } from "openrct2-flexui";
import { BiomeFactory } from "./biomeFactory";
import { SelectionTool } from "./selectionTool";

let selectedBiome = 0;
let activeTool: SelectionTool;
const biomes = BiomeFactory.biomes();
let isWindowOpen = false;

let isActivated: boolean = false;
const buttonText = store<string>("Activate tool");

const tabToolActivator = [
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
];

const tabBiomeList = [
  listview({
    columns: ["Name", "Type"],
    items: biomes.map(b => [
      b.name,
      "Built-in"
    ]),
    canSelect: true,
    onClick: (item, number) => console.log(`row: ${item}, column: ${number}`)
  })
];

const pluginWindow = tabwindow({
  title: "Forest Forge",
  width: 0,
  height: 0,
  tabs: [
    tab({
      image: "scenery_trees",
      width: 200,
      height: 140,
      content: tabToolActivator
    }),
    tab({
      image: {
        frameBase: 5277,
        frameCount: 7,
        frameDuration: 4,
      } as ImageAnimation,
      width: 250,
      height: 170,
      content: tabBiomeList
    })
  ],
  onClose: () => {
    activeTool?.cancel();
    isWindowOpen = false;
  }
});

function cancel() {
  isActivated = false;
  buttonText.set("Activate tool");
}

export function startup() {
  if (typeof ui !== "undefined") {
    ui.registerMenuItem("Forest Forge", () => {
      if (isWindowOpen) {
        pluginWindow.focus();
      } else {
        pluginWindow.open();
        isWindowOpen = true;
      }
    });
  }
}
