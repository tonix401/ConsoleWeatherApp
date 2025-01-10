import PromptSync from "prompt-sync";
import { customText, createTextBlock } from "./styling.js";

const prompt = PromptSync();

export const menu = () => {
  const menu = [
    "Was möchtest Du tun?",
    "1 - Farbeinstellungen ändern?",
    "2 - Temperatur in einer Stadt ansehen",
    "9 - Beenden",
  ];

  const styledMenu = menu.map((line) => customText(line, "output"));
  console.log(createTextBlock(styledMenu));

  const userInput = prompt(customText("Bitte Nummer eingeben", "prompt"));
  return userInput;
};
