import { head } from "lodash";
import { GameEventName, GameEvents, GameObject } from "./base";
import { GuiWindow as Inventory } from "./inventory";
import { Player } from "./object";
import { Pixi } from "./pixi";

export class Engine {
  public static Stage: PIXI.Container;

  public static addGameObject(obj: GameObject): void {
    Engine.Stage.addChild(obj.getGraphics());
  }

  public static removeGameObject(obj: GameObject): void {
    Engine.Stage.removeChild(obj.getGraphics());
  }

  private name: string;
  private view: Element;
  private pixi: Pixi;
  private player: Player;
  private inventory: Inventory;

  constructor(viewName: string = "engine-view") {
    this.view = head(document.getElementsByTagName(viewName));
    this.initView(this.view);
    this.initPlayer();
    this.initInventory();
  }

  public printFinal(): string {
    return "Engine Started: " + this.name;
  }

  private initView(el: Element): void {
    this.name = el.nodeName;
    this.pixi = new Pixi(el);
    Engine.Stage = this.pixi.getStage();
    window.addEventListener(
      "resize",
      this.pixi.resizeThrottler.bind(this.pixi),
      false
    );
  }

  private initPlayer(): void {
    this.player = new Player(10, 10, 20, 20, 2);
    this.player.draw();
    Engine.addGameObject(this.player);
  }

  private initInventory(): void {
    this.inventory = new Inventory(100, 100);
  }
}
