// import * as PIXI from "pixi.js";
import * as FontFaceObserver from "fontfaceobserver";
import * as sourceMapSupport from "source-map-support";
import { Engine } from "./engine/index";

sourceMapSupport.install();
// TODO implement fail if webGL not supported
/*
let type = "WebGL";
if (!PIXI.utils.isWebGLSupported()) {
  type = "canvas";
}

PIXI.utils.sayHello(type);

console.log(type);
*/

const fonts = [
  /*
  new FontFaceObserver("Roboto").load(),
  new FontFaceObserver("Ubuntu").load(),
  new FontFaceObserver("Oswald").load(),
  new FontFaceObserver("Marck Script").load(),
  new FontFaceObserver("Play").load(),
  new FontFaceObserver("Open Sans").load(),
  new FontFaceObserver("Press Start 2P").load(),
  */
  new FontFaceObserver("FreePixel").load(),
  new FontFaceObserver("WebFont").load(),
  new FontFaceObserver("IBMPlexMono").load(),
  new FontFaceObserver("IBMPlexSans").load(),
  new FontFaceObserver("Oswald").load()
];

Promise.all(fonts).then(() => {
  document.getElementsByTagName("h1")[0].style.display = "none";

  const t = new Engine();
  console.log(t.printFinal());
});
