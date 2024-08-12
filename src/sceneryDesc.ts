export default class SceneryDesc {
  constructor(
    readonly identifier: string,
    readonly index: number,
    readonly weight: number,
    readonly primaryColour: number,
    readonly verticalOffset?: number) {
      if (verticalOffset === undefined) {
        verticalOffset = 0;
      }
  }
}
