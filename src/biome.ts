import SceneryDesc from "./sceneryDesc";
import * as logger from "./services/logger";

export default class Biome {
  private largeObjects: SceneryDesc[] = [];
  private mediumObjects: SceneryDesc[] = [];
  private smallObjects: SceneryDesc[] = [];

  constructor(readonly name: string, sceneryDescs: SceneryDesc[]) {
    const allScenery = objectManager.getAllObjects("small_scenery");

    sceneryDescs.forEach(s => {
      this.fillSceneryObject(s, allScenery);
    });

    sceneryDescs = sceneryDescs.filter(s => s.object !== undefined);

    const heightCutoff = this.heightCutoff(sceneryDescs);
    sceneryDescs.forEach((scenery: SceneryDesc) => {
      this.applyScenery(scenery, heightCutoff);
    });
  }

  private fillSceneryObject(scenery: SceneryDesc, allScenery: SmallSceneryObject[]): void {
    const sceneryObjectMatches = allScenery.filter(s => s.identifier === scenery.identifier);
    if (sceneryObjectMatches.length !== 1) {
      logger.error(`Scenery identifier ${scenery.identifier} could not be loaded.`);
    }
    scenery.object = sceneryObjectMatches[0];
  }

  private heightCutoff(sceneryDescs: SceneryDesc[]) {
    // Caculate what is "large" and what is "medium" by defining a cutoff
    // point at the median height of all selected full-tile objects.
    const objectHeights = sceneryDescs
      .filter(s => this.isFullTile(s.object))
      .map(s => s.effectiveHeight)
      .sort((a, b) => a - b);
    return objectHeights[Math.ceil(objectHeights.length / 2)] ?? objectHeights[0];
  }

  private applyScenery(scenery: SceneryDesc, cutoff: number) {
    const obj = scenery.object;
    if (obj === undefined)
      return;

    if (this.isFullTile(obj)) {
      if (scenery.effectiveHeight >= cutoff) {
        this.largeObjects.push(scenery);
      } else {
        this.mediumObjects.push(scenery);
      }
    } else {
      this.smallObjects.push(scenery);
    }
  }

  private isFullTile(obj: SmallSceneryObject | undefined): boolean {
    return obj === undefined ? false : (obj.flags & 0x01) === 1;
  }

  getSceneryObjectLarge(): SceneryDesc | undefined {
    return this.getObject(this.largeObjects);
  }

  getSceneryObjectMedium(): SceneryDesc | undefined {
    return this.getObject(this.mediumObjects);
  }

  getSceneryObjectSmall(): SceneryDesc | undefined {
    return this.getObject(this.smallObjects);
  }

  getObject(list: SceneryDesc[]): SceneryDesc | undefined {
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
}
