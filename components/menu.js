import PromptSync from "prompt-sync";
import { customText, createTextBlock } from "../utilities/formatting.js";
const prompt = PromptSync();

export default function menu () {

  // should always match with main.js
  const menu = [
    "Was möchtest Du tun?",
    "1 - Den Speicher ausgeben",
    "2 - Eine Nachricht speichern",
    "3 - Die letzte Nachricht ansehen",
    "9 - Beenden",
  ];

  const styledMenu = menu.map((line) => customText(line, "output"));
  console.log(createTextBlock(styledMenu));
  const userInput = prompt(customText("Bitte Nummer eingeben", "prompt"));
  return userInput;
};
