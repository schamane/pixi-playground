import * as PIXI from "pixi.js";
import { GameObject } from "./base";

export class Pixi {
  private pixi: PIXI.Application;
  private resizeTimeout: NodeJS.Timer;
  private renderer: PIXI.CanvasRenderer | PIXI.WebGLRenderer;

  constructor(el: Element) {
    this.pixi = new PIXI.Application(el.clientWidth, el.clientHeight, {
      antialias: true,
      backgroundColor: 0x1099bb,
      preserveDrawingBuffer: true
    });

    el.appendChild(this.pixi.view);
    this.renderer = this.pixi.renderer;
    this.resize(this.renderer, window.innerWidth, window.innerHeight);
  }

  public resizeThrottler(): void {
    const resizefn = this.resize;
    const renderer = this.renderer;

    if (!this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
    }

    this.resizeTimeout = setTimeout(() => {
      resizefn(renderer, window.innerWidth, window.innerHeight);
    }, 66);
  }

  public getStage(): PIXI.Container {
    return this.pixi.stage;
  }

  /**
   * @deprecated
   */
  public addGameObject(gameObject: GameObject): void {
    this.pixi.stage.addChild(gameObject.getGraphics());
  }

  private resize(
    renderer: PIXI.CanvasRenderer | PIXI.WebGLRenderer,
    widht: number,
    height: number
  ): void {
    renderer.resize(widht, height);
  }
}
