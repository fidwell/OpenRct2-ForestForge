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
  park.postMessage(`${tool._selection.length} tiles selected`);
  tool._selection = [];
  ui.tileSelection.tiles = [];
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
