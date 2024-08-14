import SceneryDesc from "./sceneryDesc";

export default class Biome {
  private largeObjects: SceneryDesc[] = [];
  private mediumObjects: SceneryDesc[] = [];
  private smallObjects: SceneryDesc[] = [];

  constructor(sceneryDescs: SceneryDesc[]) {
    const allScenery = objectManager.getAllObjects("small_scenery");

    sceneryDescs.forEach(s => {
      this.fillSceneryObject(s, allScenery);
    });

    sceneryDescs = sceneryDescs.filter(s => s.object !== undefined);

    const maxHeight = Math.max(...sceneryDescs.map(s => s.object?.height ?? 0));
    const minHeight = Math.min(...sceneryDescs.map(s => s.object?.height ?? 0));
    const cutoff = (maxHeight + minHeight) / 16;

    sceneryDescs.forEach((scenery: SceneryDesc) => {
      this.applyScenery(scenery, cutoff);
    });
  }

  private fillSceneryObject(scenery: SceneryDesc, allScenery: SmallSceneryObject[]): void {
    const sceneryObjectMatches = allScenery.filter(s => s.identifier === scenery.identifier);
    if (sceneryObjectMatches.length !== 1) {
      console.log(`Scenery identifier ${scenery.identifier} could not be loaded.`);
    }
    scenery.object = sceneryObjectMatches[0];
  }

  private applyScenery(scenery: SceneryDesc, cutoff: number) {
    const obj = scenery.object;
    if (obj === undefined)
      return;

    const isFullTile = (obj.flags & 0x01) === 1;
    const objHeight = (obj.height / 8) - (scenery.verticalOffset ?? 0);

    if (isFullTile) {
      if (objHeight >= cutoff) {
        this.largeObjects.push(scenery);
      } else {
        this.mediumObjects.push(scenery);
      }
    } else {
      this.smallObjects.push(scenery);
    }
  }

  getTreeLarge(): SceneryDesc | undefined {
    return this.getObject(this.largeObjects);
  }

  getTreeMedium(): SceneryDesc | undefined {
    return this.getObject(this.mediumObjects);
  }

  getTreeSmall(): SceneryDesc | undefined {
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
