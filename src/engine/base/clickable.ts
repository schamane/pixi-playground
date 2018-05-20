import { GameObject } from "./gameObject";
import { IClickable } from "./iclickable";

export abstract class Clickable extends GameObject implements IClickable {
  public makeInteractive(): void {
    const g = this.Graphics;

    g.interactive = true;
    g.buttonMode = true;
    g.hitArea = g.getBounds();
    g.on("pointerdown", this.onClick);
  }

  public updateInteractionArrea(): void {
    const g = this.Graphics;
    g.hitArea = g.getBounds();
  }

  protected abstract onClick(): void;
}
