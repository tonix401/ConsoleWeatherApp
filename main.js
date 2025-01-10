import menu from "./components/menu.js";
import error from "./components/notification.js";
import exit from "./components/exit.js";
import { clear, customLog } from "./utilities/formatting.js";
import { load } from "./utilities/storage.js";
import saveMessage from "./components/saveMessage.js";

export default async function main() {
  clear();
  let input = menu();

  // should always match with menu.js
  switch (input) {
    default:
      error(`"${input}" ist keine valide Eingabe!`);
      break;
    case "9":
      exit();

    case "1":
      const data = await load();
      customLog(JSON.stringify(data), "output");
      break;

    case "2":
      saveMessage();
      break;
  }
}

main();
