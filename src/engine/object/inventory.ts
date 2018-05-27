import { GameObject } from "../base";

export interface IItem {
  [id: number]: number;
}

interface IItems extends Array<IItem> {}

export class Inventory {
  public parent: GameObject | undefined;
  public items: IItems;

  constructor(parent?: GameObject) {
    this.parent = parent;
    this.items = [];
  }

  public push(id: number, count: number = 1): void {
    this.items.push([id, count]);
  }
}
