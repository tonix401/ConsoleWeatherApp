import { clear } from "../utilities/formatting";

// gets the current Time
const getNow = () => new Date().toLocaleTimeString("de-DE", "HH:MM");

const getTemperature = () => Math.floor(Math.random() * 20);

export default function showTempByCity() {
  let userInput = prompt(
    customText("Für welche Stadt willst Du das Wetter wissen?", textTypes.prompt)
  );

  clear()

  const randomTemp = getTemperature();

  customLog(
    createTextBlock([
      `Die Temperatur in ${userInput} um ${getNow()} ist ${randomTemp}*C`,
      randomTemp <= 10 ? "Etwas frisch!" : "Angenehm!",
    ])
  );
}
