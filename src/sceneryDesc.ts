import { Colour } from "./colour";

export default class SceneryDesc {
  public index: number = 0;

  constructor(
    readonly identifier: string,
    readonly weight: number,
    readonly primaryColour?: number,
    readonly verticalOffset?: number) {
      if (primaryColour === undefined) {
        primaryColour = Colour.ForestGreen;
      }
      if (verticalOffset === undefined) {
        verticalOffset = 0;
      }
  }
}
