import notification from "./activities/notification.js";
import { clear, createTextBox, customText } from "./utilities/formatting.js";
import { load, logInfo } from "./utilities/store.js";
import textTypes from "./utilities/textTypes.js";
import exit from "./activities/exit.js";
import saveMessage from "./activities/saveMessage.js";
import PromptSync from "prompt-sync";
const prompt = PromptSync();

async function main() {
  clear();
  let input = menu();

  // needs to match with menu()
  switch (input) {
    case "1":
      load()
      .then((data) => {
        logInfo("test", textTypes.error);
        notification("Der Speicherinhalt:\n" + 
          JSON.stringify(data)
            .replaceAll(",","\n")
            .replaceAll(/[\{\}\"]/g,"")
            .replaceAll(":", ": "),
          textTypes.output);
      })
      .catch(
        err => { 
          notification(err.message, textTypes.error)
        }
      );
      break;

    case "2":
      saveMessage();
      break;

    case "3":
      load().then((data) => {
        console.log()
        notification("Die letzte Nachricht war:\n" + data.message, textTypes.output);
      })
      break;

    case "9":
      exit();

    case "x":
      process.exit();

    default:
      notification(`"${input}" ist keine valide Eingabe!`, textTypes.warning);
      break;
  }
}

function menu() {
  const menu = [
    "Was möchtest Du tun?",
    "1 - Den Speicher ausgeben",
    "2 - Eine Nachricht speichern",
    "3 - Die letzte Nachricht ansehen",
    "9 - Beenden",
  ];

  const styledMenu = menu.map((line) => customText(line, textTypes.output));
  console.log(createTextBox(styledMenu));
  const userInput = prompt(customText("Bitte Nummer eingeben", textTypes.prompt));
  return userInput;
};

// starting the program
notification("Herzlich willkommen zur Wetterapp", textTypes.title);
while(true){
  main();
}
