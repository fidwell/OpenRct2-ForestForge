import { Colour } from "./colour";
import SceneryDesc from "./sceneryDesc";

export default class Biome {
  private bigObjects: SceneryDesc[] = [];
  private mediumObjects: SceneryDesc[] = [];
  private smallObjects: SceneryDesc[] = [];

  constructor(treeIds: string[]) {
    const allScenery = objectManager.getAllObjects("small_scenery");
    const biomeScenery = allScenery.filter(s => treeIds.some(id => s.identifier === id));

    biomeScenery.forEach((obj: SmallSceneryObject) => {
      const isFullTile = (obj.flags & 0x01) === 1;

      let objHeight = obj.height / 8;
      let verticalOffset = 0;
      if (obj.identifier.indexOf("japsnotr") > 0) {
        verticalOffset = context.getRandom(5, 7);
        objHeight -= verticalOffset;
      }

      const primaryColour = Colour.ForestGreen;
      if (isFullTile) {
        if (objHeight > 10) {
          this.bigObjects.push(new SceneryDesc(obj.identifier, obj.index, primaryColour, verticalOffset));
        } else {
          this.mediumObjects.push(new SceneryDesc(obj.identifier, obj.index, primaryColour, verticalOffset));
        }
      } else {
        this.smallObjects.push(new SceneryDesc(obj.identifier, obj.index, primaryColour, verticalOffset));
      }
    });
  }

  getTreeBig(): SceneryDesc {
    return this.bigObjects[context.getRandom(0, this.bigObjects.length)];
  }

  getTreeMedium(): SceneryDesc {
    return this.mediumObjects[context.getRandom(0, this.mediumObjects.length)];
  }

  getTreeSmall(): SceneryDesc {
    return this.smallObjects[context.getRandom(0, this.smallObjects.length)];
  }
}
