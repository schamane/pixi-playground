import * as Filters from "pixi-filters";
import * as PIXI from "pixi.js";
import { Engine } from "..";
import { GameObject } from "./gameObject";

export class Sprite extends GameObject {
  private static normalFilters = [new Filters.OutlineFilter(0.5)]; // [new Filters.ReflectionFilter()];
  private static hoverFilters = [
    new Filters.OutlineFilter(0.5),
    new Filters.DropShadowFilter()
  ];

  private tooltip: PIXI.Container;
  private name: string;

  constructor(x: number, y: number, image: string, name?: string) {
    super(x, y, false);
    const g = PIXI.Sprite.fromImage(image);

    this.name = name;

    g.anchor.set(0.5);
    g.x = x;
    g.y = y;
    g.filters = Sprite.normalFilters;

    g.interactive = true;
    g
      .on("pointerover", this.filterOn.bind(this))
      .on("pointerout", this.filterOff.bind(this));

    if (this.name) {
      // this.addTooltip();
      g
        .on("pointerover", this.showTooltip.bind(this))
        .on("pointerout", Engine.hideTooltyp);
    }
    this.Graphics = g;
  }

  public draw(): void {
    // nothing to do
  }

  public update(delta: number): void {
    // nothing to do
  }

  private filterOn(): void {
    this.Graphics.filters = Sprite.hoverFilters;
  }

  private filterOff(): void {
    this.Graphics.filters = Sprite.normalFilters;
  }

  /*
  private addTooltip(): void {
    this.tooltip = this.drawTooltip(this.name);
  }
  */

  private showTooltip(event: any): void {
    /*
    this.tooltip.position = event.data.getLocalPosition(Engine.Stage);
    Engine.Stage.addChild(this.tooltip);
    */
    Engine.showTooltyp(this.name);
  }

  /*
  private drawTooltip(label: string): PIXI.Container {
    const g = new PIXI.Container();
    const style = new PIXI.TextStyle({
      fontFamily: "'Roboto', sans-serif",
      fontSize: 10
    });
    const t = new PIXI.Text(label, style);
    t.x = 10;
    t.y = 10;
    g.addChild(t);
    return g;
  }
  */
}
