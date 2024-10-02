import { Colour } from "openrct2-flexui";

export default class SceneryDesc {
  public object: SmallSceneryObject | undefined;

  constructor(
    readonly identifier: string,
    readonly weight: number,
    readonly primaryColour?: number,
    readonly verticalOffset?: number) {
      if (primaryColour === undefined) {
        primaryColour = Colour.GrassGreenDark;
      }
      if (verticalOffset === undefined) {
        verticalOffset = 0;
      }
  }

  public get effectiveHeight(): number {
    return ((this.object?.height ?? 0) >> 3) - (this.verticalOffset ?? 0);
  }
}
