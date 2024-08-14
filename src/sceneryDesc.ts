import { Colour } from "./colour";

export default class SceneryDesc {
  public object: SmallSceneryObject | undefined;

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
