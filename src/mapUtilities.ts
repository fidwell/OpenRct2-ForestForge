export abstract class MapUtilities {
  public static toTileCoords(coord: CoordsXY): CoordsXY {
    return {
      x: coord.x >> 5,
      y: coord.y >> 5
    };
  }

  public static toMapCoords(coord: CoordsXY): CoordsXY {
    return {
      x: coord.x << 5,
      y: coord.y << 5
    };
  }

  public static numberOfSelectedNeighbors(tile: CoordsXY, selection: CoordsXY[]): number {
    return MapUtilities.neigborsOf(tile).filter(s => MapUtilities.contains(s, selection)).length;
  }

  // Quadrants
  // 0: Towards 0,0
  // 1: Towards 0,∞
  // 2: Towards ∞,∞
  // 3: Towards ∞,0
  public static neighboredCorners(tile: CoordsXY, selection: CoordsXY[]): number[] {
    const result: number[] = [];

    // Quadrant 0
    if (
      this.contains(<CoordsXY>{ x: tile.x - 1, y: tile.y }, selection) ||
      this.contains(<CoordsXY>{ x: tile.x, y: tile.y - 1 }, selection) ||
      this.contains(<CoordsXY>{ x: tile.x - 1, y: tile.y - 1 }, selection)
    ) {
      result.push(0);
    }

    // Quadrant 1
    if (
      this.contains(<CoordsXY>{ x: tile.x - 1, y: tile.y }, selection) ||
      this.contains(<CoordsXY>{ x: tile.x, y: tile.y + 1 }, selection) ||
      this.contains(<CoordsXY>{ x: tile.x - 1, y: tile.y + 1 }, selection)
    ) {
      result.push(1);
    }

    // Quadrant 2
    if (
      this.contains(<CoordsXY>{ x: tile.x + 1, y: tile.y }, selection) ||
      this.contains(<CoordsXY>{ x: tile.x, y: tile.y + 1 }, selection) ||
      this.contains(<CoordsXY>{ x: tile.x + 1, y: tile.y + 1 }, selection)
    ) {
      result.push(2);
    }

    // Quadrant 3
    if (
      this.contains(<CoordsXY>{ x: tile.x + 1, y: tile.y }, selection) ||
      this.contains(<CoordsXY>{ x: tile.x, y: tile.y - 1 }, selection) ||
      this.contains(<CoordsXY>{ x: tile.x + 1, y: tile.y - 1 }, selection)
    ) {
      result.push(3);
    }

    if (result.length === 0) {
      // No neighbors; pick at random
      result.push(context.getRandom(0, 4));
    }

    return result;
  }

  private static contains(tile: CoordsXY, selection: CoordsXY[]): boolean {
    return selection.some(c => c.x === tile.x && c.y === tile.y);
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
