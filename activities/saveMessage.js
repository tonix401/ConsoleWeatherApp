import PromptSync from "prompt-sync";
import { createTextBox, customText, clear } from "../utilities/formatting.js";
import { save, load } from "../utilities/store.js";
import notification from "./notification.js";
import textTypes from "../utilities/types/textTypes.js";
const prompt = PromptSync();

export default async function saveMessage() {
  clear();
  let info = [
    "Du willst also eine Nachricht hinterlassen?",
    "Nett von Dir.",
    "Was darf's denn sein?",
  ];

  info = info.map((str) => customText(str, textTypes.output));

  console.log(createTextBox(info));

  const msg = prompt(customText("Deine Nachricht", textTypes.prompt));

  try {
    load().then((data) => {
    data = { ...data, message: msg };
    save(JSON.stringify(data));
  })
  } catch(err) {
    notification("Beim Speichern scheint etwas nicht geklappt zu haben.", textTypes.error);
    return;
  }
  
  notification("Erfolgreich gespeichert!", textTypes.output);
}
