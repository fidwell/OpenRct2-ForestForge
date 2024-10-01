import Biome from "./biome";
import { MapUtilities } from "./mapUtilities";
import { SelectionFiller } from "./selectionFiller";

export class SelectionTool {
  _isDragging = false;
  _isAddingToSelection = true;
  _selection: CoordsXY[] = [];

  constructor(
    readonly name: string,
    readonly cursor: CursorType) {
  }

  activate(): void {
    const tool = ui.tool;
    if (tool && tool.id === this.name)
      return;

    toggleGridOverlay(true);
    ui.activateTool({
      id: this.name,
      cursor: this.cursor,
      filter: ["terrain"],
      onDown: a => down(this, a),
      onUp: a => up(this, a),
      onMove: a => move(this, a)
    });
  }

  apply(biome: Biome): void {
    finish(this, biome);
    this.cancel();
  }

  cancel(): void {
    ui.tool?.cancel();
    if (this.onCancel)
      this.onCancel();
  }

  onCancel?: () => void;
}

function down(tool: SelectionTool, args: ToolEventArgs): void {
  if (!args.mapCoords)
    return;

  const location = MapUtilities.toTileCoords(args.mapCoords);
  if (!location)
    return;

  // Click a selected tile to de-select
  tool._isAddingToSelection = !isSelected(tool._selection, location);
  tool._isDragging = true;
  tool._selection = toggleTile(tool._selection, location, tool._isAddingToSelection);
}

function up(tool: SelectionTool, args: ToolEventArgs): void {
  if (!args.mapCoords)
    return;

  const location = MapUtilities.toTileCoords(args.mapCoords);
  if (!location)
    return;

  tool._isDragging = false;
}

function move(tool: SelectionTool, args: ToolEventArgs): void {
  if (!args.mapCoords)
    return;

  if (!tool._isDragging || !tool._selection)
    return;

  const location = MapUtilities.toTileCoords(args.mapCoords);
  tool._selection = toggleTile(tool._selection, location, tool._isAddingToSelection);
}

function finish(tool: SelectionTool, biome: Biome): void {
  toggleGridOverlay(false);
  SelectionFiller.fillSelectionWithScenery(tool._selection, biome);
  tool._selection = [];
  ui.tileSelection.tiles = [];
}

function toggleTile(collection: CoordsXY[], location: CoordsXY, isAdding: boolean): CoordsXY[] {
  if (isAdding) {
    collection = addIfNotExists(collection, location);
  } else {
    collection = remove(collection, location);
  }
  ui.tileSelection.tiles = collection.map(c => MapUtilities.toMapCoords(c));
  return collection;
}

function addIfNotExists(collection: CoordsXY[], location: CoordsXY): CoordsXY[] {
  if (isSelected(collection, location))
    return collection;
  collection.push(location);
  return collection;
}

function remove(collection: CoordsXY[], location: CoordsXY): CoordsXY[] {
  return collection.filter(i => !(i.x === location.x && i.y === location.y));
}

function isSelected(collection: CoordsXY[], location: CoordsXY) {
  return collection.some(l => l.x === location.x && l.y === location.y);
}

const viewportFlagGridlines = (1 << 7);
function toggleGridOverlay(value: boolean): void {
  if (value) {
    ui.mainViewport.visibilityFlags |= viewportFlagGridlines;
  } else {
    ui.mainViewport.visibilityFlags &= ~(viewportFlagGridlines);
  }
}
