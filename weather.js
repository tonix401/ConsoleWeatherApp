import PromptSync from "prompt-sync";

import { customText, customLog, createTextBlock } from "./styling.js";
const prompt = PromptSync();

let repeat = true;

// gets the current Time
const getNow = () => new Date().toLocaleTimeString("de-DE", "HH:MM");

function main() {
  customLog("Willkommen zur Wetterapp!", "title");

  let userInput = prompt(
    customText("Für welche Stadt willst Du das Wetter wissen?", "prompt")
  );

  console.clear();

  let randomTemp = Math.floor(Math.random() * 20);

  customLog(
    createTextBlock([
      `Die Temperatur in ${userInput} um ${getNow()} ist ${randomTemp}*C`,
      randomTemp <= 10 ? "Etwas frisch!" : "Angenehm!",
    ])
  );
}
while (repeat) {
  console.clear();
  main();

  if (prompt("Nochmal? (y/n) > ") === "n") {
    console.clear();
    repeat = false;
  }
}
