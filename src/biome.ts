import SceneryDesc from "./sceneryDesc";

export default class Biome {
  private largeObjects: SceneryDesc[] = [];
  private mediumObjects: SceneryDesc[] = [];
  private smallObjects: SceneryDesc[] = [];

  constructor(sceneryDescs: SceneryDesc[]) {
    const allScenery = objectManager.getAllObjects("small_scenery");
    sceneryDescs.forEach((scenery: SceneryDesc) => {
      const sceneryObjectMatches = allScenery.filter(s => s.identifier === scenery.identifier);
      if (sceneryObjectMatches.length !== 1) {
        console.log(`Scenery identifier ${scenery.identifier} could not be loaded.`);
      }
      const obj = sceneryObjectMatches[0];
      scenery.index = obj.index;

      const isFullTile = (obj.flags & 0x01) === 1;
      const objHeight = (obj.height / 8) - (scenery.verticalOffset ?? 0);

      if (isFullTile) {
        if (objHeight > 10) {
          this.largeObjects.push(scenery);
        } else {
          this.mediumObjects.push(scenery);
        }
      } else {
        this.smallObjects.push(scenery);
      }
    });
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
      return undefined;
    }

    const weights = list.map(i => i.weight);
    const totalOfWeights = weights.reduce((a, b) => a + b, 0);
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
