export default class Biome {
  private bigIndexes: number[] = [];
  private mediumIndexes: number[] = [];
  private smallIndexes: number[] = [];

  constructor(treeIds: string[]) {
    const allScenery = objectManager.getAllObjects("small_scenery");
    const biomeScenery = allScenery.filter(s => treeIds.some(id => s.identifier === id));

    biomeScenery.forEach((obj: SmallSceneryObject) => {
      const isFullTile = (obj.flags & 0x01) === 1;

      if (isFullTile) {
        if ((obj.height / 8) > 10) {
          this.bigIndexes.push(obj.index);
        } else {
          this.mediumIndexes.push(obj.index);
        }
      } else {
        this.smallIndexes.push(obj.index);
      }
    });
  }

  getTreeBig(): number {
    return this.bigIndexes[context.getRandom(0, this.bigIndexes.length)];
  }

  getTreeMedium(): number {
    return this.mediumIndexes[context.getRandom(0, this.mediumIndexes.length)];
  }

  getTreeSmall(): number {
    return this.smallIndexes[context.getRandom(0, this.smallIndexes.length)];
  }
}
