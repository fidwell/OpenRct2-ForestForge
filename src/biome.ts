export default class Biome {
  private bigIndexes: number[];
  private mediumIndexes: number[];
  private smallIndexes: number[];

  constructor(
    big: string[],
    medium: string[],
    small: string[]) {
      const smallScenery = objectManager.getAllObjects("small_scenery");

      this.bigIndexes = big.map(t => smallScenery.filter(s => s.identifier === t)[0].index);
      this.mediumIndexes = medium.map(t => smallScenery.filter(s => s.identifier === t)[0].index);
      this.smallIndexes = small.map(t => smallScenery.filter(s => s.identifier === t)[0].index);
  }

  getTree(): number {
    return this.bigIndexes[context.getRandom(0, this.bigIndexes.length)];
  }

  getTreeMedium(): number {
    return this.mediumIndexes[context.getRandom(0, this.bigIndexes.length)];
  }

  getTreeSmall(): number {
    return this.smallIndexes[context.getRandom(0, this.bigIndexes.length)];
  }
}
