import { createTextBox, customText, clear } from "../utilities/formatting.js";
import PromptSync from "prompt-sync";
import textTypes from "../utilities/types/textTypes.js";
const prompt = PromptSync();

export default async function notification(text, textType = textTypes.output) {
  clear();
  console.log(createTextBox(customText(text, textType)));
  prompt(customText("Drücke [Enter] um das Menü zu sehen.", textTypes.input));
}

