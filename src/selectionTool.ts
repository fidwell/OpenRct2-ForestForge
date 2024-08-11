export class SelectionTool {
  _isDragging = false;
  _selection: CoordsXY[] = [];

  constructor(readonly name: string, readonly cursor: CursorType) {
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

  const location = toTileCoords(args.mapCoords);
  if (!location)
    return;

  tool._isDragging = true;
  addIfNotExists(tool._selection, location);
}

function up(tool: SelectionTool, args: ToolEventArgs): void {
  if (!args.mapCoords)
    return;

  const location = toTileCoords(args.mapCoords);
  if (!location)
    return;

  tool._isDragging = false;
}

function move(tool: SelectionTool, args: ToolEventArgs): void {
  if (!args.mapCoords)
    return;

  if (!tool._isDragging || !tool._selection)
    return;

  const location = toTileCoords(args.mapCoords);

  addIfNotExists(tool._selection, location);
}

function finish(tool: SelectionTool): void {
  toggleGridOverlay(false);
  ui.tileSelection.tiles = [];

  const smallObjects = objectManager
    .getAllObjects("small_scenery").filter(o => o.name.indexOf("Tree") >= 0)
    .map(o => o.index);

  tool._selection.forEach((location: CoordsXY) => {
    const tileHere = map.getTile(location.x/32, location.y/32);
    console.log(`Filling at ${tileHere.x},${tileHere.y}`);
    const surface = tileHere.elements.filter(e => e.type === "surface")[0];

    console.log(`BH ${surface.baseHeight} CH ${surface.clearanceHeight}`);

    context.executeAction("smallsceneryplace", <SmallSceneryPlaceArgs>{
      x: location.x,
      y: location.y,
      z: 8 * surface.clearanceHeight,
      direction: context.getRandom(0, 4),
      object: smallObjects[context.getRandom(0, smallObjects.length)],
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
  ui.tileSelection.tiles = [...collection];
}

const viewportFlagGridlines = (1 << 7);
function toggleGridOverlay(value: boolean): void {
  if (value) {
    ui.mainViewport.visibilityFlags |= viewportFlagGridlines;
  } else {
    ui.mainViewport.visibilityFlags &= ~(viewportFlagGridlines);
  }
}

function toTileCoords(coord: CoordsXY): CoordsXY {
  return {
    x: Math.floor(coord.x / 32) * 32,
    y: Math.floor(coord.y / 32) * 32
  };
}
