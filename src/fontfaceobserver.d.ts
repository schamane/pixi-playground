declare class FontfaceObserver {
  constructor(name: string);
  public load(): Promise<any>;
}

declare namespace FontfaceObserver {

}

declare module "fontfaceobserver" {
  export = FontfaceObserver;
}
