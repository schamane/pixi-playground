import * as EventEmitter from "events";

export class GameEvents extends EventEmitter {
  public static getInstance() {
    if (!GameEvents.instance) {
      GameEvents.instance = new GameEvents();
    }
    return GameEvents.instance;
  }

  public static on(eventName: string, listener: any): void {
    this.getInstance().on(eventName, listener);
  }

  public static emit(eventName: string, data?: any): void {
    this.getInstance().emit(eventName, data);
  }

  private static instance: GameEvents;
}
