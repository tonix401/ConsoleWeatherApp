import PromptSync from "prompt-sync";
import { createTextBox, customText, clear } from "../utilities/formatting.js";
import textTypes from "../utilities/types/textTypes.js";
const prompt = PromptSync();

export default function exit() {
  clear()
  let exitWarning = [
    "Du bist dabei das Program zu verlassen.",
    "Willst Du das wirklich????"
  ];

  exitWarning = exitWarning.map((str) => customText(str, textTypes.output));

  console.log(createTextBox(exitWarning)); 

  const input = prompt(customText("Bist Du sicher?", textTypes.yesno));
  if (input === "y") {
    clear()
    process.exit();
  }
}
 