import { tabwindow } from "openrct2-flexui";
import { SelectionTool } from "./selectionTool";
import { BiomeList } from "./ui/biomeList";
import { ToolActivator } from "./ui/toolActivator";

let activeTool: SelectionTool;
let isWindowOpen = false;

const tabs = [
  new ToolActivator(),
  new BiomeList()
];

const pluginWindow = tabwindow({
  title: "Forest Forge",
  width: 0,
  height: 0,
  tabs: tabs.map(t => t.asTab()),
  onClose: () => {
    activeTool?.cancel();
    isWindowOpen = false;
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
