import { createTextBlock, customText, clear } from "../utilities/formatting.js";
import main from "../main.js";
import PromptSync from "prompt-sync";
const prompt = PromptSync();

export default function notification(text, type = "output") {
  clear();
  console.log(createTextBlock(customText(text, type)));
  prompt(customText("Drücke [Enter] um das Menü zu sehen.", "input"));
  main();
}
