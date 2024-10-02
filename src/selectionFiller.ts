import Biome from "./biome";
import { MapUtilities } from "./mapUtilities";
import SceneryDesc from "./sceneryDesc";
import * as logger from "./services/logger";

export abstract class SelectionFiller {
  public static fillSelectionWithScenery(selection: CoordsXY[], biome: Biome) {
    if (!cheats.disableClearanceChecks) {
      logger.warning("Clearance checks are on. Some objects might not be able to be placed.");
    }

    selection.forEach((location: CoordsXY) => {
      const tileHere = map.getTile(location.x, location.y);
      const surfaces = tileHere.elements.filter(e => e.type === "surface");
      if (surfaces.length !== 1) {
        logger.error("Found either no surfaces or more than one.");
        return;
      }
      const surfaceHeight = surfaces[0].clearanceHeight;
      const numberOfSelectedNeighbors = MapUtilities.numberOfSelectedNeighbors(tileHere, selection);

      if (numberOfSelectedNeighbors <= 4) {
        MapUtilities.neighboredCorners(location, selection).forEach((quadrant: number) => {
          const treeHere = biome.getSceneryObjectSmall();
          if (treeHere !== undefined) {
            SelectionFiller.placeObject(location, surfaceHeight, treeHere, quadrant)
          }
        });
      } else {
        const treeHere = numberOfSelectedNeighbors >= 7
          ? biome.getSceneryObjectLarge()
          : biome.getSceneryObjectMedium();
        if (treeHere !== undefined) {
          SelectionFiller.placeObject(location, surfaceHeight, treeHere, 0);
        }
      }
    });
  }

  private static placeObject(
    location: CoordsXY,
    surfaceHeight: number,
    sceneryDesc: SceneryDesc,
    quadrant: number) {
    const args = <SmallSceneryPlaceArgs>{
      x: location.x << 5,
      y: location.y << 5,
      z:  8 * (surfaceHeight - (sceneryDesc.verticalOffset ?? 0)),
      direction: context.getRandom(0, 4),
      object: sceneryDesc.object?.index,
      quadrant: quadrant,
      primaryColour: sceneryDesc.primaryColour ?? 0,
      secondaryColour: 0,
      tertiaryColour: 0
    };

    context.queryAction("smallsceneryplace", args, (result: GameActionResult) => {
      if (result.error === undefined || result.error === 0) {
        context.executeAction("smallsceneryplace", args);
      } else {
        logger.error(`Couldn't place object ${sceneryDesc.object?.identifier} at ${location.x},${location.y} with vertical offset ${sceneryDesc.verticalOffset}.`);
      }
    });
  }
}
