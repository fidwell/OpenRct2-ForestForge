import { FlexibleLayoutContainer, tab, TabCreator } from "openrct2-flexui";

export abstract class WindowTab {
  public image: number | ImageAnimation | IconName = 0;
  public width: number = 0;
  public height: number = 0;
  public content: FlexibleLayoutContainer = [];

  public asTab(): TabCreator {
    return tab({
      image: this.image,
      width: this.width,
      height: this.height,
      content: this.content
    });
  }
}
