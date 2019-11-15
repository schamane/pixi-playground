import * as PIXI from "pixi.js";
import { GameObject } from "./base";

export class Pixi {
  private pixi: PIXI.Application;
  private resizeTimeout: NodeJS.Timer;
  private renderer: PIXI.Renderer; // PIXI.CanvasRenderer | PIXI.WebGLRenderer;

  constructor(el: Element) {
    this.pixi = new PIXI.Application({width: el.clientWidth, height: el.clientHeight,
      antialias: true,
      backgroundColor: 0x1099bb,
      preserveDrawingBuffer: true
    });

    el.appendChild(this.pixi.view);
    this.renderer = this.pixi.renderer;
    // Better perf - https://github.com/pixijs/pixi.js/issues/4889
    this.renderer.plugins.interaction.moveWhenInside = true;
    this.resize(this.renderer, window.innerWidth, window.innerHeight);
  }

  public resizeThrottler(): void {
    const resizefn = this.resize;
    const renderer = this.renderer;

    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
    }

    this.resizeTimeout = setTimeout(() => {
      resizefn(renderer, window.innerWidth, window.innerHeight);
    }, 66);
  }

  public getStage(): PIXI.Container {
    return this.pixi.stage;
  }

  public getApplication(): PIXI.Application {
    return this.pixi;
  }

  public getRenderer(): PIXI.Renderer {
    return this.renderer;
  }

  /**
   * @deprecated
   */
  public addGameObject(gameObject: GameObject): void {
    this.pixi.stage.addChild(gameObject.getGraphics());
  }

  private resize(
    renderer: PIXI.Renderer,
    widht: number,
    height: number
  ): void {
    renderer.resize(widht, height);
  }
}
