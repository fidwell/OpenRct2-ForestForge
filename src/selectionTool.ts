import Biome from "./biome";
import { MapUtilities } from "./mapUtilities";

export class SelectionTool {
  _isDragging = false;
  _selection: CoordsXY[] = [];

  constructor(
    readonly name: string,
    readonly cursor: CursorType,
    readonly biome: Biome) {
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
      onMove: a => move(this, a),
      onFinish: () => finish(this)
    });
  }
}

function down(tool: SelectionTool, args: ToolEventArgs): void {
  if (!args.mapCoords)
    return;

  const location = MapUtilities.toTileCoords(args.mapCoords);
  if (!location)
    return;

  tool._isDragging = true;
  addIfNotExists(tool._selection, location);
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

  addIfNotExists(tool._selection, location);
}

function finish(tool: SelectionTool): void {
  toggleGridOverlay(false);
  ui.tileSelection.tiles = [];

  tool._selection.forEach((location: CoordsXY) => {
    const tileHere = map.getTile(location.x, location.y);
    const surface = tileHere.elements.filter(e => e.type === "surface")[0];

    const numberOfSelectedNeighbors = MapUtilities.numberOfSelectedNeighbors(tileHere, tool._selection);
    const treeHere = numberOfSelectedNeighbors >= 6
      ? tool.biome.getTreeBig()
      : numberOfSelectedNeighbors >= 2
        ? tool.biome.getTreeMedium()
        : tool.biome.getTreeSmall();

    context.executeAction("smallsceneryplace", <SmallSceneryPlaceArgs>{
      x: location.x * 32,
      y: location.y * 32,
      z: 8 * surface.clearanceHeight,
      direction: context.getRandom(0, 4),
      object: treeHere,
      quadrant: 0,
      primaryColour: 0,
      secondaryColour: 0,
      tertiaryColour: 0
    });
  });

  tool._selection = [];
}

function addIfNotExists(collection: CoordsXY[], location: CoordsXY) {
  if (collection.some(l => l.x === location.x && l.y === location.y))
    return;
  collection.push(location);
  ui.tileSelection.tiles = collection.map(c => MapUtilities.toMapCoords(c));
}

const viewportFlagGridlines = (1 << 7);
function toggleGridOverlay(value: boolean): void {
  if (value) {
    ui.mainViewport.visibilityFlags |= viewportFlagGridlines;
  } else {
    ui.mainViewport.visibilityFlags &= ~(viewportFlagGridlines);
  }
}
