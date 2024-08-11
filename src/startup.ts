import { SelectionTool } from "./selectionTool";

function onClickMenuItem() {
  new SelectionTool("forestForger", "tree_down").activate();
}

export function startup() {
  if (typeof ui !== "undefined") {
    ui.registerMenuItem("Forest Forger", () => onClickMenuItem());
  }
}
