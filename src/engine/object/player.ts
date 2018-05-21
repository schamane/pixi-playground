import { Clickable, GameEventName, GameEvents } from "./../base";

export class Player extends Clickable {
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
    g.moveTo(x, y);
    g.lineTo(w, y);
    g.lineTo(w, h);
    g.lineTo(x, h);
    g.lineTo(x, y);
    g.endFill();

    this.updateInteractionArrea();
  }

  public onClick(): void {
    GameEvents.emit(GameEventName.INVENTAR_OPEN);
  }
}
