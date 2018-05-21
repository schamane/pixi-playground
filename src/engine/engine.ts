import { head } from "lodash";
import { GameEventName, GameEvents, GameObject, Sprite } from "./base";
import { Tooltip } from "./gui/tooltyp";
import { GuiWindow as Inventory } from "./inventory";
import { Player } from "./object";
import { Pixi } from "./pixi";

export class Engine {
  public static Stage: PIXI.Container;
  public static PIXI: PIXI.Application;
  public static Renderer: PIXI.CanvasRenderer | PIXI.WebGLRenderer;
  public static Tooltyp: Tooltip;

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
    t.position = new PIXI.Point(50, 50);
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
    this.inventory = new Inventory(100, 100);
  }

  private initSprite(): void {
    let o = new Sprite(
      40 + 32 / 2,
      10 + 32 / 2,
      "assets/inv/14264_32.png",
      "Webstasis"
    );
    this.gameObjects.push(o);
    Engine.addGameObject(o);
    o = new Sprite(
      40 + 32 / 2 + 32 * 1,
      10 + 32 / 2,
      "assets/inv/10156_32.png"
    );
    this.gameObjects.push(o);
    Engine.addGameObject(o);
    o = new Sprite(
      40 + 32 / 2 + 32 * 2,
      10 + 32 / 2,
      "assets/inv/14160_32.png",
      "Capacitor"
    );
    this.gameObjects.push(o);
    Engine.addGameObject(o);

    o = new Sprite(
      40 + 32 / 2 + 32 * 3,
      10 + 32 / 2,
      "assets/inv/1221_32.png",
      "Креслення"
    );
    this.gameObjects.push(o);
    Engine.addGameObject(o);
  }
}
