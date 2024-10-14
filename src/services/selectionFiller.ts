import simplify from "../helpers/identifierHelper";
import { MapUtilities } from "../helpers/mapUtilities";
import Palette from "../palettes/Palette";
import SceneryDesc from "../palettes/sceneryDesc";
import * as logger from "../services/logger";

export default function fillSelectionWithScenery(selection: CoordsXY[], palette: Palette) {
  const allScenery = objectManager.getAllObjects("small_scenery");

  const fullTileScenery: SceneryDesc[] = [];
  const quarterTileScenery: SceneryDesc[] = [];
  palette.objects.forEach(sceneryDesc => {
    sceneryDesc.object = getSceneryObject(sceneryDesc, allScenery);
  });

  palette.objects.forEach(sceneryDesc => {
    if (sceneryDesc.object === undefined)
      return;

    if (isFullTile(sceneryDesc.object)) {
      fullTileScenery.push(sceneryDesc);
    } else {
      quarterTileScenery.push(sceneryDesc);
    }
  });
  fullTileScenery.sort((a, b) => effectiveHeight(a) - effectiveHeight(b));

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
        const treeHere = getObject(quarterTileScenery, max => context.getRandom(0, max));
        if (treeHere !== undefined) {
          placeObject(location, surfaceHeight, treeHere, quadrant)
        }
      });
    } else {
      const treeHere = getObject(fullTileScenery, max => {
        // Randomly select a full-tile object, weighted based
        // on how tall each potential object could be.
        const gaussed = gaussianRandom((numberOfSelectedNeighbors - 6.5) / 4 * fullTileScenery.length, 2);
        return clamp(gaussed, 0, max);
      });
      if (treeHere !== undefined) {
        placeObject(location, surfaceHeight, treeHere, 0);
      }
    }
  });
}

function getSceneryObject(scenery: SceneryDesc, allScenery: SmallSceneryObject[]): SmallSceneryObject {
  const sceneryObjectMatches = allScenery.filter(s => s.identifier === scenery.identifier);
  if (sceneryObjectMatches.length !== 1) {
    logger.error(`Scenery identifier ${scenery.identifier} could not be loaded.`);
  }
  return sceneryObjectMatches[0];
}

function isFullTile(obj: SmallSceneryObject | undefined): boolean {
  return obj === undefined ? false : (obj.flags & 0x01) === 1;
}

function getObject(list: SceneryDesc[], randomGenerator: (max: number) => number): SceneryDesc | undefined {
  if (list.length === 0) {
    ui.showError("ForestForge", "No foliage could be placed.");
    return undefined;
  }

  const weights = list.map(i => i.weight);
  const totalOfWeights = weights.reduce((a, b) => a + b, 0);

  if (totalOfWeights <= 0) {
    ui.showError("ForestForge", "Invalid weights for foliage selection.");
    return list[0];
  }

  let randomValue = randomGenerator(totalOfWeights);
  for (let i = 0; i < list.length; i++) {
    if (randomValue < list[i].weight) {
      return list[i];
    }
    randomValue -= list[i].weight;
  }

  return list[list.length - 1];
}

function placeObject(
  location: CoordsXY,
  surfaceHeight: number,
  sceneryDesc: SceneryDesc,
  quadrant: number) {
  const args = <SmallSceneryPlaceArgs>{
    x: location.x << 5,
    y: location.y << 5,
    z: (surfaceHeight - (sceneryDesc.verticalOffset ?? 0)) << 3,
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
      logger.error(`Couldn't place object ${simplify(sceneryDesc.object?.identifier ?? "")} at ${location.x},${location.y} with vertical offset ${sceneryDesc.verticalOffset}.`);
    }
  });
}

function effectiveHeight(scenery: SceneryDesc): number {
  return ((scenery.object?.height ?? 0) >> 3) - (scenery.verticalOffset ?? 0);
}

function gaussianRandom(mean: number = 0, stdDev: number = 1): number {
  const u = 1 - Math.random();
  const v = Math.random();
  const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  return z * stdDev + mean;
}

function clamp(value: number, min: number = 0, max: number = 1) {
  return value < min ? min : value > max ? max : value;
}
