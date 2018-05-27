import * as _ from "lodash";
import { IItem } from "../object";

export interface IResourceData {
  id: number;
  name: string;
  tech?: number;
}

export class Resources {
  public static getInstance() {
    if (!Resources.instance) {
      Resources.instance = new Resources();
    }
    return Resources.instance;
  }

  private static instance: Resources;

  private items: IResourceData[];

  constructor() {
    this.load();
  }

  public getItem(id: number): IResourceData {
    return _.find(this.items, ["id", id]);
  }

  private load(): void {
    this.items = require("../../../assets/data/items");
  }
}
