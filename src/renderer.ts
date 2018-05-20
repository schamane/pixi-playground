// import * as PIXI from "pixi.js";
import { Engine } from "./engine/index";

// TODO implement fail if webGL not supported
/*
let type = "WebGL";
if (!PIXI.utils.isWebGLSupported()) {
  type = "canvas";
}

PIXI.utils.sayHello(type);

console.log(type);
*/

const t = new Engine();
console.log(t.printFinal());
