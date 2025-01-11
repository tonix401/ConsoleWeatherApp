import PromptSync from "prompt-sync";
import main from "../main.js";
import { createTextBlock, customText, clear } from "../utilities/formatting.js";
import { save, load } from "../utilities/storage.js";
import notification from "./notification.js";
const prompt = PromptSync();

export default async function saveMessage() {
  clear();
  let info = [
    "Du willst also eine Nachricht hinterlassen?",
    "Nett von Dir.",
    "Was darf's denn sein?",
  ];

  info = info.map((str) => customText(str, "output"));

  console.log(createTextBlock(info));

  const msg = prompt(customText("Deine Nachricht", "prompt"));

  let data = await load();
  data = { ...data, message: msg };

  console.log(data);

  save(JSON.stringify(data));
  
  notification("Erfolgreich gespeichert!", "output");
  main();
}
