import PromptSync from "prompt-sync";
import main from "../main.js";
import { createTextBlock, customText, clear } from "../utilities/formatting.js";
const prompt = PromptSync();

export default function exit() {
  clear();
  let exitWarning = [
    "Du bist dabei das Program zu verlassen.",
    "Willst Du das wirklich????"
  ];

  exitWarning = exitWarning.map((str) => customText(str, "output"));

  console.log(createTextBlock(exitWarning));

  const input = prompt(customText("Bist Du sicher?", "yesno"));
  if (input === "y") {
    clear();
    process.exit();
  }
  main();
}
