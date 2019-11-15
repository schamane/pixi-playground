import {Container, Graphics} from 'pixi.js';

export abstract class GameObject {
  protected Graphics: Container;

  constructor(x: number, y: number, init: boolean = true) {
    if(init) {
      const g = new Graphics();
      g.x = x;
      g.y = y;
      this.Graphics = g;    
    }
  }

  public getGraphics(): Container {
    return this.Graphics;
  }

  public abstract update(delta: number): void;

  public abstract draw(): void;
}
