import * as PIXI from "pixi.js";
import { ITooltipOptions } from ".";
import { Engine } from "../..";

export class Tooltip extends PIXI.Container {
  private static box: PIXI.Graphics = new PIXI.Graphics();
  private static text: PIXI.Text;
  private static defaults: ITooltipOptions = {
    offset: new PIXI.Point(10, 12),
    alphaBox: 0.4,
    alphaText: 0.9,
    margin: 3,
    textStyle: new PIXI.TextStyle({
      fontFamily: "FreePixel", // "IBMPlexMono", // "FreePixel"
      fontSize: 10,
      fill: 0xffffff,
      stroke: 0x333333,
      strokeThickness: 2
    })
  };

  private static drawBox(size: PIXI.Rectangle): PIXI.Graphics {
    const x = size.x;
    const y = size.y;
    const margin = Tooltip.defaults.margin * 2;

    const g = Tooltip.box;

    g.clear();

    g.beginFill(0x0, Tooltip.defaults.alphaBox);
    g.lineStyle(0.5, 0xefefef, Tooltip.defaults.alphaBox);

    g.drawRect(size.x, size.y, size.width + margin, size.height + margin);

    return g;
  }

  private static createBox(text: PIXI.Text): PIXI.Graphics {
    const box = Tooltip.drawBox(text.getLocalBounds());
    box.position = Tooltip.defaults.offset;
    return box;
  }

  private static createText(text: string): PIXI.Text {
    const t = new PIXI.Text(text, Tooltip.defaults.textStyle);
    t.alpha = Tooltip.defaults.alphaText;
    t.position.x = Tooltip.defaults.offset.x + Tooltip.defaults.margin;
    t.position.y = Tooltip.defaults.offset.y + Tooltip.defaults.margin;
    Tooltip.text = t;

    /*
    PIXI.loader.add("desyrel", "assets/desyrel.xml").load(() => {
      const bitmapText = new PIXI.extras.BitmapText(
        "text using a fancy font!",
        {
          font: "35px Desyrel",
          align: "right"
        }
      );
      Tooltip.box.addChild(bitmapText);
    });
    */

    return t;
  }

  private content: string;
  private isShowing: boolean;
  private moveTimeout: NodeJS.Timer;

  constructor() {
    super();
    document.addEventListener("pointermove", this.moveThrottler.bind(this));
  }

  public hide() {
    Engine.Stage.removeChild(this);
    this.isShowing = false;
    console.debug("hide tooltyp:" + this.content);
  }

  public show(text?: string): void {
    if (text) {
      this.content = text;
    }

    this.redraw();

    Engine.Stage.addChild(this);
    this.isShowing = true;
    console.debug("start draw tooltyp:" + this.content);
  }

  private redraw(): void {
    if (Tooltip.text || Tooltip.box) {
      this.removeChildren();
      if (Tooltip.text) {
        Tooltip.text.destroy();
      }
    }
    const textBox = Tooltip.createText(this.content);
    Tooltip.createBox(textBox);
    if (this.children.length === 0) {
      this.addChild(Tooltip.box);
      this.addChild(Tooltip.text);
    }
  }

  private moveThrottler(event: any): void {
    const movefn = this.move.bind(this);

    if (this.moveTimeout) {
      clearTimeout(this.moveTimeout);
    }

    this.moveTimeout = setTimeout(() => {
      movefn(event);
    }, 14);
  }

  private move(event: any): void {
    this.position = new PIXI.Point(event.clientX, event.clientY);
    console.debug("move", this.position.x, this.position.y);
  }
}
