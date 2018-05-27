import { Inventory } from ".";
import { Clickable, GameEventName, GameEvents } from "./../base";

export class Player extends Clickable {
  public inventory: Inventory;

  private width: number;
  private height: number;
  private line: number;

  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    line: number
  ) {
    super(x, y);
    this.makeInteractive();

    this.width = width;
    this.height = height;
    this.line = line;

    this.createInventory();
  }

  public update(delta: number): void {
    // do nothing
  }

  public draw(): void {
    const g = this.Graphics as PIXI.Graphics;
    const x = 0;
    const y = 0;
    const w = this.width;
    const h = this.height;

    g.beginFill(0xff3300);
    g.lineStyle(this.line, 0xffd900, 1);

    // draw a shape
    g.drawRect(x, y, w, h);

    this.updateInteractionArrea();
  }

  public onClick(): void {
    GameEvents.emit(GameEventName.INVENTAR_OPEN);
  }

  private createInventory(): void {
    this.inventory = new Inventory(this);
    this.inventory.push(1221, 20);
    this.inventory.push(13003, 1);
    const inv = this.inventory;
    setTimeout(() => {
      inv.push(533, 1999999);
      console.log("add new item");
    }, 10000);
  }
}
