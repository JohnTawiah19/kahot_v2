import * as PIXI from "pixi.js";
import Letter from "./Letter.";

let score = 0;
const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const startBtn = document.getElementById("start") as HTMLButtonElement;
let display = document.getElementById("score") as HTMLElement;

let spawnInterval: NodeJS.Timeout | null = null;
const speed = 3;

export function onStart(app: PIXI.Application<PIXI.ICanvas>, duration: number) {
  app.stage.removeChildren();
  score = 0;
  spawnInterval = setInterval(() => spawnLetter(app), duration);
  startBtn.disabled = true;
}

export function spawnLetter(app: PIXI.Application<PIXI.ICanvas>) {
  const index = Math.floor(Math.random() * characters.length);
  let char = Letter(characters[index]);
  char.x = Math.random() * app.screen.width;
  char.anchor.set(0.5);

  const ticker = new PIXI.Ticker();

  app.stage.addChild(char);

  ticker.add((delta) => {
    char.position.y += speed * delta;
    if (char.y + char.height / 2 >= app.screen.bottom) {
      app.stage.removeChild(char);
      char.destroy();
      if (spawnInterval) clearInterval(spawnInterval);
      spawnInterval = null;
      startBtn.disabled = false;
      ticker.destroy();
      alert("Game over");
    }
  });
  ticker.start();
}

export function removeLetter(
  app: PIXI.Application<PIXI.ICanvas>,
  event: KeyboardEvent
) {
  const stageChildren = app.stage.children;
  const child = stageChildren.find(
    //@ts-ignore
    (child) => child._text == event.key.toUpperCase()
  );
  if (child) {
    app.stage.removeChild(child);
    child.destroy();
    score++;
  } else {
    score = score <= 0 ? 0 : score - 1;
  }
  if (score >= 51) {
    alert("Congratulations, you won!!!");
    if (spawnInterval) {
      score = 0;
      startBtn.disabled = false;
      clearInterval(spawnInterval);
    }
    app.stage.removeChildren();
  }

  display.textContent = `Score: ${score}`;
}
