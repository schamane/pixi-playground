export abstract class GameObject {
  protected Graphics: PIXI.Container;

  constructor(x: number, y: number, init: boolean = true) {
    if(init) {
      const g = new PIXI.Graphics();
      g.x = x;
      g.y = y;
      this.Graphics = g;    
    }
  }

  public getGraphics(): PIXI.Container {
    return this.Graphics;
  }

  public abstract update(delta: number): void;

  public abstract draw(): void;
}
