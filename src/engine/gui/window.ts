import * as Filters from "pixi-filters";
import { Graphics, Filter, Text, TextStyle } from 'pixi.js';
import { Engine } from "../engine";
import { GameObject } from "./../base";
import { IPoint } from "./iPoint";
import { IWindowOptions } from "./iWindowOptions";

export class Window extends GameObject {
  public static lineStroke: number = 0.5;

  public Graphics: Graphics;

  private static normalFilters: Filter[] = [];
  private static hoverFilters = [
    new Filters.OutlineFilter(0.5),
    new Filters.DropShadowFilter()
  ];

  private options: IWindowOptions;
  private state: string = "close";
  private dragging: boolean;
  private draggingData: any;
  private draggingOffset: IPoint;
  private moveTimeout: NodeJS.Timer;

  constructor(options: IWindowOptions) {
    super(options.x, options.y);
    this.options = options;

    this.draw();

    // todo move to draggable
    this.Graphics.interactive = true;
    this.Graphics.filters = Window.normalFilters;
    // this.Graphics.buttonMode = true;

    this.Graphics.on("pointerover", this.filterOn.bind(this)).on(
      "pointerout",
      this.filterOff.bind(this)
    );

    this.Graphics.on("pointerdown", this.onDragStart.bind(this))
      .on("pointerup", this.onDragEnd.bind(this))
      .on("pointerupoutside", this.onDragEnd.bind(this))
      .on("pointermove", this.onDragMoveThrottler.bind(this));
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

    g.clear();
    g.removeChildren();

    g.beginFill(0xffffff);
    g.lineStyle(Window.lineStroke, 0x666666, 1);

    // draw a shape
    g.drawRect(x, y, w, h);

    // draw content area
    const ca = new Graphics();

    ca.x = 10;
    ca.y = 44;
    ca.beginFill(0x000000);
    ca.drawRect(0, 0, w - 20, h - 44 - 10);
    g.addChild(ca);

    if (this.options.title) {
      const style1 = new TextStyle({
        fontFamily: "Oswald",
        fontSize: 18
      });
      const t = new Text(this.options.title, style1);
      g.addChild(t);
    }
  }

  public isOpen(): boolean {
    return this.state === "open";
  }

  public open(): void {
    if (this.isOpen()) {
      return;
    }

    this.draw();
    Engine.addGameObject(this);
    this.state = "open";
  }

  public close(): void {
    if (!this.isOpen()) {
      return;
    }
    Engine.removeGameObject(this);
    this.Graphics.clear();
    this.state = "close";
  }

  protected onDragStart(event: any): void {
    const g = this.Graphics;
    this.draggingData = event.data;
    g.alpha = 0.5;
    if (!this.dragging) {
      this.draggingOffset = this.draggingData.getLocalPosition(this.Graphics);
    }
    this.dragging = true;
    Engine.setGlobalMove(true);
  }

  protected onDragEnd(event: any): void {
    this.Graphics.alpha = 1;
    this.dragging = false;
    // set the interaction data to null
    this.draggingData = null;
    Engine.setGlobalMove(false);
  }

  protected onDragMoveThrottler(event: any): void {
    const movefn = this.onDragMove.bind(this);

    if (this.moveTimeout) {
      clearTimeout(this.moveTimeout);
    }

    this.moveTimeout = setTimeout(() => {
      movefn(event);
    }, 14);
  }

  protected onDragMove(event: any): void {
    if (this.dragging) {
      const newPosition = this.draggingData.getLocalPosition(
        this.Graphics.parent
      );
      this.Graphics.x = newPosition.x - this.draggingOffset.x;
      this.Graphics.y = newPosition.y - this.draggingOffset.y;
    }
  }

  private filterOn(): void {
    this.Graphics.filters = Window.hoverFilters;
  }

  private filterOff(): void {
    this.Graphics.filters = Window.normalFilters;
  }
}
