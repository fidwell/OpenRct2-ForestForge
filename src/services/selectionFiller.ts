import { MapUtilities } from "../mapUtilities";
import Palette from "../palettes/Palette";
import SceneryDesc from "../palettes/sceneryDesc";

export default function fillSelectionWithScenery(selection: CoordsXY[], palette: Palette) {
  const allScenery = objectManager.getAllObjects("small_scenery");

  const largeScenery: SceneryDesc[] = [];
  const mediumScenery: SceneryDesc[] = [];
  const smallScenery: SceneryDesc[] = [];
  palette.objects.forEach(sceneryDesc => {
    sceneryDesc.object = getSceneryObject(sceneryDesc, allScenery);
  });
  const heightCutoff = getHeightCutoff(palette.objects);
  palette.objects.forEach(sceneryDesc => {
    if (sceneryDesc.object === undefined)
      return;

    if (isFullTile(sceneryDesc.object)) {
      if (sceneryDesc.effectiveHeight >= heightCutoff) {
        largeScenery.push(sceneryDesc);
      } else {
        mediumScenery.push(sceneryDesc);
      }
    } else {
      smallScenery.push(sceneryDesc);
    }
  });

  selection.forEach((location: CoordsXY) => {
    const tileHere = map.getTile(location.x, location.y);
    const surfaces = tileHere.elements.filter(e => e.type === "surface");
    if (surfaces.length !== 1) {
      console.log("Found either no surfaces or more than one.");
      return;
    }
    const surfaceHeight = surfaces[0].clearanceHeight;
    const numberOfSelectedNeighbors = MapUtilities.numberOfSelectedNeighbors(tileHere, selection);

    if (numberOfSelectedNeighbors <= 4) {
      MapUtilities.neighboredCorners(location, selection).forEach((quadrant: number) => {
        const treeHere = getObject(smallScenery);
        if (treeHere !== undefined) {
          placeObject(location, surfaceHeight, treeHere, quadrant)
        }
      });
    } else {
      const treeHere = numberOfSelectedNeighbors >= 7
        ? getObject(largeScenery)
        : getObject(mediumScenery);
      if (treeHere !== undefined) {
        placeObject(location, surfaceHeight, treeHere, 0);
      }
    }
  });
}

function getSceneryObject(scenery: SceneryDesc, allScenery: SmallSceneryObject[]): SmallSceneryObject {
  const sceneryObjectMatches = allScenery.filter(s => s.identifier === scenery.identifier);
  if (sceneryObjectMatches.length !== 1) {
    console.log(`Scenery identifier ${scenery.identifier} could not be loaded.`);
  }
  return sceneryObjectMatches[0];
}

function getHeightCutoff(allObjects: SceneryDesc[]) {
  // Caculate what is "large" and what is "medium" by defining a cutoff
  // point at the median height of all selected full-tile objects.
  const objectHeights = allObjects
    .filter(s => isFullTile(s.object))
    .map(s => s.effectiveHeight)
    .sort((a, b) => a - b);
  return objectHeights[Math.ceil(objectHeights.length / 2)] ?? objectHeights[0];
}

function isFullTile(obj: SmallSceneryObject | undefined): boolean {
  return obj === undefined ? false : (obj.flags & 0x01) === 1;
}

function getObject(list: SceneryDesc[]): SceneryDesc | undefined {
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

  let randomValue = context.getRandom(0, totalOfWeights);
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
    x: location.x * 32,
    y: location.y * 32,
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
    }
  });
}
