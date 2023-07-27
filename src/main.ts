import * as PIXI from "pixi.js";
import { onStart, removeLetter } from "./letter";

const app = new PIXI.Application({
  background: "#1099bb",
  width: 800,
});
app.screen.pad(10, 10);

const DURATION = 1000;
const container = document.getElementById("pixi-container") as HTMLElement;
//@ts-ignore
container.appendChild(app.view);

document.addEventListener("click", () => onStart(app, DURATION));
document.addEventListener("keydown", (event) => removeLetter(app, event));

