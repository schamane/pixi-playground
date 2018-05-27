import * as NumberSuffix from "number-suffix";
import { Container } from "pixi.js";
import { IItemSize, Item } from ".";

export class CountLabel extends PIXI.Container {
  private static TextStyle = new PIXI.TextStyle({
    fontFamily: "FreePixel", // "IBMPlexMono", // "FreePixel"
    fontSize: 10,
    fill: 0xffffff,
    stroke: 0x333333,
    strokeThickness: 2
  });

  private countParent: Item;

  constructor(parent: Item) {
    super();
    this.countParent = parent;
    this.createBackground();
    this.createLabel();
  }

  private createBackground(): void {
    const g = new PIXI.Graphics();
    g.beginFill(0);
    // g.lineStyle(0.5, 0xffffff, 1);

    g.drawRect(0, 0, IItemSize.BIG - 10, 10);
    g.alpha = 0.8;

    this.addChild(g);
  }

  private createLabel() {
    const count = this.countParent.getCount();
    const t = new PIXI.Text(this.formater(count), CountLabel.TextStyle);
    const b = t.getLocalBounds();
    t.x = IItemSize.BIG - 12 - b.width;
    this.addChild(t);
  }

  private formater(count: number) {
    return count > 1000
      ? NumberSuffix.format(count, { precision: 2 })
      : count.toString();
  }
}
