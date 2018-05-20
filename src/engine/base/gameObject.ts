export abstract class GameObject {
  protected Graphics: PIXI.Graphics;
  protected x: number;
  protected y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.Graphics = new PIXI.Graphics();
  }

  public getGraphics(): PIXI.Graphics {
    return this.Graphics;
  }

  public abstract update(delta: number): void;

  public abstract draw(): void;
}
