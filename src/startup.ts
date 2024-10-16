import { tabwindow } from "openrct2-flexui";
import { SelectionTool } from "./selectionTool";
import { PaletteList } from "./ui/paletteList";
import { ToolActivator } from "./ui/toolActivator";

let activeTool: SelectionTool;
let isWindowOpen = false;

const tabs = [
  new ToolActivator(),
  new PaletteList()
];

const pluginWindow = tabwindow({
  title: "Forest Forge",
  width: 0,
  height: 0,
  tabs: tabs.map(t => t.asTab()),
  onClose: () => {
    activeTool?.cancel();
    isWindowOpen = false;
    ui.tool?.cancel();
  }
});

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
