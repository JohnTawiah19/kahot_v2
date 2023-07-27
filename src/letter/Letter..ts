import { Text } from "pixi.js";

const Letter = (text: string) => {
  const letter = new Text(text, {
    fontFamily: "Arial",
    fontSize: 32,
    fill: 0xff1010,
    align: "center",
  });
  return letter;
};

export default Letter;

