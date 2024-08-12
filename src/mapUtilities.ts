export abstract class MapUtilities {
  public static toTileCoords(coord: CoordsXY): CoordsXY {
    return {
      x: Math.floor(coord.x / 32),
      y: Math.floor(coord.y / 32)
    };
  }

  public static toMapCoords(coord: CoordsXY): CoordsXY {
    return {
      x: coord.x * 32,
      y: coord.y * 32
    };
  }

  public static numberOfSelectedNeighbors(tile: CoordsXY, selection: CoordsXY[]): number {
    return MapUtilities.neigborsOf(tile).filter(s => MapUtilities.contains(s, selection)).length;
  }

  private static contains(tile: CoordsXY, collection: CoordsXY[]): boolean {
    return collection.some(c => c.x === tile.x && c.y === tile.y);
  }

  private static neigborsOf(tile: CoordsXY): CoordsXY[] {
    return [
      <CoordsXY>{ x: tile.x - 1, y: tile.y - 1 },
      <CoordsXY>{ x: tile.x, y: tile.y - 1 },
      <CoordsXY>{ x: tile.x + 1, y: tile.y - 1 },
      <CoordsXY>{ x: tile.x - 1, y: tile.y },
      <CoordsXY>{ x: tile.x + 2, y: tile.y },
      <CoordsXY>{ x: tile.x - 1, y: tile.y + 1 },
      <CoordsXY>{ x: tile.x, y: tile.y + 1 },
      <CoordsXY>{ x: tile.x + 1, y: tile.y + 1 }
    ];
  }
}
