import { Colour } from "openrct2-flexui";

export default class SceneryDesc {
  public object: SmallSceneryObject | undefined;

  constructor(
    readonly identifier: string,
    readonly weight: number,
    readonly primaryColour: Colour = Colour.Invisible,
    readonly verticalOffset: number = 0) {
      if (primaryColour === undefined) {
        primaryColour = Colour.GrassGreenDark;
      }
      if (verticalOffset === undefined) {
        verticalOffset = 0;
      }
  }
}
