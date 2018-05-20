import { Engine } from "../engine";
import { GameObject } from "./../base";
import { IWindowOptions } from "./iWindowOptions";

export class Window extends GameObject {
  public static lineStroke: number = 1;
  private options: IWindowOptions;
  private state: string = "close";
  private dragging: boolean;
  private draggingData: any;

  constructor(options: IWindowOptions) {
    super(options.x, options.y);
    this.options = options;

    this.draw();

    // todo move to draggable
    this.Graphics.interactive = true;
    // this.Graphics.buttonMode = true;
    // this.Graphics.anchor.set(0.5);

    this.Graphics.on("pointerdown", this.onDragStart.bind(this))
      .on("pointerup", this.onDragEnd.bind(this))
      .on("pointerupoutside", this.onDragEnd.bind(this))
      .on("pointermove", this.onDragMove.bind(this));
  }

  public update(): void {
    // nothing here
  }

  public draw(): void {
    const g = this.Graphics;
    const o = this.options;
    const x = 0;
    const y = 0;
    const w = o.width;
    const h = o.height;

    g.beginFill(0xff3300);
    g.lineStyle(Window.lineStroke, 0xffd900, 1);

    // draw a shape
    g.moveTo(x, y);
    g.lineTo(w, y);
    g.lineTo(w, h);
    g.lineTo(x, h);
    g.lineTo(x, y);
    g.endFill();
  }

  public isOpen(): boolean {
    return this.state === "open";
  }

  public open(): void {
    if (this.isOpen()) {
      return;
    }

    Engine.addGameObject(this);
    this.state = "open";
  }

  public close(): void {
    if (!this.isOpen()) {
      return;
    }
    Engine.removeGameObject(this);
    this.state = "close";
  }

  protected onDragStart(event: any): void {
    this.draggingData = event.data;
    this.Graphics.alpha = 0.5;
    this.dragging = true;
  }

  protected onDragEnd(event: any): void {
    this.Graphics.alpha = 1;
    this.dragging = false;
    // set the interaction data to null
    this.draggingData = null;
  }

  protected onDragMove(event: any): void {
    if (this.dragging) {
      const newPosition = this.draggingData.getLocalPosition(
        this.Graphics.parent
      );
      this.Graphics.x = newPosition.x;
      this.Graphics.y = newPosition.y;
      console.log(newPosition);
    }
  }
}
