import { head } from "lodash";
import {
  GameEventName,
  GameEvents,
  GameObject,
  Resources,
  Sprite
} from "./base";
import { Container, Application, Renderer, Point} from 'pixi.js';
import { Tooltip } from "./gui/tooltyp";
import { GuiWindow as Inventory } from "./inventory";
import { Player } from "./object";
import { Pixi } from "./pixi";

export class Engine {
  public static Stage: Container;
  public static PIXI: Application;
  public static Renderer: Renderer;
  public static Tooltyp: Tooltip;
  public static Resources: Resources;

  public static addGameObject(obj: GameObject): void {
    Engine.Stage.addChild(obj.getGraphics());
  }

  public static removeGameObject(obj: GameObject): void {
    Engine.Stage.removeChild(obj.getGraphics());
  }

  public static setGlobalMove(status: boolean): void {
    Engine.Renderer.plugins.interaction.moveWhenInside = !status;
  }

  public static showTooltyp(text: string): void {
    Engine.Tooltyp.show(text);
  }

  public static hideTooltyp(): void {
    Engine.Tooltyp.hide();
  }

  private name: string;
  private view: Element;
  private pixi: Pixi;
  private player: Player;
  private inventory: Inventory;
  private gameObjects: GameObject[] = [];

  constructor(viewName: string = "engine-view") {
    this.view = head(document.getElementsByTagName(viewName));
    this.initView(this.view);
    Engine.Tooltyp = new Tooltip();

    const t = new Tooltip();
    t.position = new Point(50, 50);
    t.show("Nazar");

    this.initPlayer();
    this.initInventory();
    this.initSprite();
  }

  public printFinal(): string {
    return "Engine Started: " + this.name;
  }

  private initView(el: Element): void {
    this.name = el.nodeName;
    this.pixi = new Pixi(el);
    Engine.Stage = this.pixi.getStage();
    Engine.PIXI = this.pixi.getApplication();
    Engine.Renderer = this.pixi.getRenderer();
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
    Engine.Resources = Resources.getInstance();
    this.inventory = new Inventory(100, 100, this.player.inventory);
  }

  private initSprite(): void {
    // todo
  }
}
