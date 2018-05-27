import { Container, Graphics } from "pixi.js";
import { CountLabel } from ".";
import { Engine } from "..";
import { GameObject, Icon, IResourceData } from "../base";
import { IItem } from "../object";

export enum IItemSize {
  SMALL = 32,
  BIG = 64
}

export class Item extends Container {
  public static AssetPath: string = "assets/inv/";
  public static EXT: string = ".png";
  private Icon: Icon;
  private Label: Graphics;
  private data: IResourceData;
  private CountLabel: CountLabel;
  private count: number;

  constructor(item: IItem, x: number, y: number) {
    super();
    const data = (this.data = this.getItemData(item[0]));
    this.count = item[1];

    this.x = x;
    this.y = y;

    this.Icon = this.createIcon();
    this.CountLabel = this.createCount();
  }

  public getCount(): number {
    return this.count;
  }

  private picUrl(size: IItemSize): string {
    return Item.AssetPath + this.data.id + "_" + size + Item.EXT;
  }

  private getItemData(id: number): IResourceData {
    return Engine.Resources.getItem(id);
  }

  private createIcon(): Icon {
    const icon = new Icon(0, 0, this.picUrl(IItemSize.BIG), this.data.name);
    this.addChild(icon);
    return icon;
  }

  private createCount(): CountLabel {
    const t = new CountLabel(this);
    t.position = new PIXI.Point(10, 52);
    this.addChild(t);
    return t;
  }
}
