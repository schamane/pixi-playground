import * as Filters from "pixi-filters";
import * as PIXI from "pixi.js";
import { Engine } from "..";
import { GameObject } from "./gameObject";

export class Icon extends PIXI.Sprite {
  private static normalFilters = [new Filters.OutlineFilter(0.5)]; // [new Filters.ReflectionFilter()];
  private static hoverFilters = [
    new Filters.OutlineFilter(0.5),
    new Filters.DropShadowFilter()
  ];

  private tooltip: PIXI.Container;
  // private name: string;

  constructor(x: number, y: number, image: string, name?: string) {
    super(PIXI.Texture.from(image));
    this.name = name;

    // g.anchor.set(0.5);
    this.filters = Icon.normalFilters;

    this.interactive = true;
    this.on("pointerover", this.filterOn.bind(this)).on(
      "pointerout",
      this.filterOff.bind(this)
    );

    if (this.name) {
      // this.addTooltip();
      this.on("pointerover", this.showTooltip.bind(this)).on(
        "pointerout",
        Engine.hideTooltyp
      );
    }
  }

  private filterOn(): void {
    this.filters = Icon.hoverFilters;
  }

  private filterOff(): void {
    this.filters = Icon.normalFilters;
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
