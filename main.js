import { customText, customLog, createTextBlock } from "./styling.js";
import pressAnyKey from "press-any-key";
import { menu } from "./menu.js";
import PromptSync from "prompt-sync";
const prompt = PromptSync();

let repeat = true;

// gets the current Time
const getNow = () => new Date().toLocaleTimeString("de-DE", "HH:MM");

const getTemperature = () => Math.floor(Math.random() * 20);

function showTempByCity() {
  let userInput = prompt(
    customText("Für welche Stadt willst Du das Wetter wissen?", "prompt")
  );

  console.clear();

  const randomTemp = getTemperature();

  customLog(
    createTextBlock([
      `Die Temperatur in ${userInput} um ${getNow()} ist ${randomTemp}*C`,
      randomTemp <= 10 ? "Etwas frisch!" : "Angenehm!",
    ])
  );

  pressAnyKey("Drücke eine Taste um das Menu zu sehen");
}

function main() {
  console.clear();
  let input = menu();

  switch(input){
    default:
      console.clear();
      customLog(`"${input}" ist keine valide Eingabe`, "error");
      prompt(customText("Drücke [Enter] um das Menü zu sehen.", "input"));
      main();
      break;
    case "9":
      process.exit()
    case "1":
      


  }

}

while (true) {
  main();
}
