import * as _ from "lodash";
import { Point } from "pixi.js";
import { Item } from ".";
import { Inventory } from "../object";
import { GameEventName, GameEvents, GameObject, Sprite } from "./../base";
import { Window } from "./../gui";

export class GuiWindow extends GameObject {
  private static window: Window;
  private model: Inventory;
  private content: Item[] = [];

  constructor(x: number, y: number, model: Inventory) {
    super(x, y);
    this.model = model;
    GuiWindow.window = new Window({
      x: 220,
      y: 110,
      width: 440,
      height: 160,
      title: "Inventory"
    });
    this.startListening();
  }

  public update(): void {
    // nothing here
  }

  public draw(): void {
    this.Graphics.position = new Point(0, 0);
  }

  protected open(): void {
    const win = GuiWindow.window;
    if (win.isOpen()) {
      win.close();
    } else {
      win.open();
    }
    this.drawContent(win.getGraphics());
  }

  private drawContent(cont: PIXI.Container): void {
    // this.draw();
    this.Graphics.position = new Point(12, 48);

    let i = 0;
    _.each(this.model.items, item => {
      const x = 66 * i++;
      const y = 0;
      const invItem = new Item(item, x, y);
      this.getGraphics().addChild(invItem);
      this.content.push(invItem);
    });
    /*
    let o = new Sprite(
      64 / 2,
      64 / 2,
      "assets/inv/1221_64.png",
      "Креслення 12"
    );
    this.getGraphics().addChild(o.getGraphics());

    o = new Sprite(64 / 2 + 66, 64 / 2, "assets/inv/533_64.png", "Батарейка I");
    this.getGraphics().addChild(o.getGraphics());

    o = new Sprite(
      64 / 2 + 66 * 2,
      64 / 2,
      "assets/inv/13003_64.png",
      "Батарейка II"
    );
    this.getGraphics().addChild(o.getGraphics());
    */

    cont.addChild(this.getGraphics());
  }

  private startListening(): void {
    GameEvents.on(GameEventName.INVENTAR_OPEN, this.open.bind(this));
  }
}
