import { GameEventName, GameEvents, GameObject } from "./../base";
import { Window } from "./../gui";

export class GuiWindow extends GameObject {
  private static window: Window;

  constructor(x: number, y: number) {
    super(x, y);
    GuiWindow.window = new Window({
      x: 100,
      y: 100,
      width: 200,
      height: 160,
      title: "Hallo Window"
    });
    this.startListening();
  }

  public update(): void {
    // nothing here
  }

  public draw(): void {
    // draw
    // console.log(this);
  }

  protected open(): void {
    this.draw();
    const win = GuiWindow.window;
    if (win.isOpen()) {
      console.log("close win");
      win.close();
    } else {
      console.log("open win");
      win.open();
    }
  }

  private startListening(): void {
    GameEvents.on(GameEventName.INVENTAR_OPEN, this.open.bind(this));
  }
}
