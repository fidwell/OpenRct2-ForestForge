import { Colour } from "./colour";
import SceneryDesc from "./sceneryDesc";

export default class Biome {
  private largeObjects: SceneryDesc[] = [];
  private mediumObjects: SceneryDesc[] = [];
  private smallObjects: SceneryDesc[] = [];

  constructor(treeIds: string[]) {
    const allScenery = objectManager.getAllObjects("small_scenery");
    const biomeScenery = allScenery.filter(s => treeIds.some(id => s.identifier === id));

    biomeScenery.forEach((obj: SmallSceneryObject) => {
      const isFullTile = (obj.flags & 0x01) === 1;

      let objHeight = obj.height / 8;
      let verticalOffset = 0;
      let weight = 5;
      if (obj.identifier.indexOf("japsnotr") > 0) {
        verticalOffset = context.getRandom(5, 7);
        objHeight -= verticalOffset;
        weight = 1;
      }

      const primaryColour = Colour.ForestGreen;
      if (isFullTile) {
        if (objHeight > 10) {
          this.largeObjects.push(new SceneryDesc(obj.identifier, obj.index, weight, primaryColour, verticalOffset));
        } else {
          this.mediumObjects.push(new SceneryDesc(obj.identifier, obj.index, weight, primaryColour, verticalOffset));
        }
      } else {
        this.smallObjects.push(new SceneryDesc(obj.identifier, obj.index, weight, primaryColour, verticalOffset));
      }
    });
  }

  getTreeLarge(): SceneryDesc {
    return this.getObject(this.largeObjects);
  }

  getTreeMedium(): SceneryDesc {
    return this.getObject(this.mediumObjects);
  }

  getTreeSmall(): SceneryDesc {
    return this.getObject(this.smallObjects);
  }

  getObject(list: SceneryDesc[]): SceneryDesc {
    const totalOfWeights = list.map(i => i.weight).reduce((a, b) => a + b);
    let randomValue = context.getRandom(0, totalOfWeights);
    let returnValue: SceneryDesc = list[0];
    for (let o of list) {
      if (randomValue < o.weight) {
        returnValue = o;
        break;
      }
      randomValue -= o.weight;
    }

    return returnValue;
  }
}
