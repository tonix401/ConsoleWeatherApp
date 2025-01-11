import { writeFile, readFile } from "fs";
import notification from "../activities/notification.js";
import textTypes from "./textTypes.js";
import { customText } from "./formatting.js";

const debuggingLogFile = "./logs/debugging.log";
const appStorageFile = "./utilities/store.json";

// save data
export function save(text) {
  writeFile(appStorageFile, text, "utf8", (err) => {
    if (err) {
      notification("Fehler beim Schreiben der Datei:", err.message);
    }
  });
}

// load data
export async function load() {
  try {
    const data = await new Promise((resolve, reject) => {
      readFile(appStorageFile, "utf8", (err, data) => {
        if (err) {
          reject("Fehler beim Lesen der Datei: " + err.message);
        } else {
          try {
            const jsonData = JSON.parse(data);
            resolve(jsonData);
          } catch (parseError) {
            reject("Fehler beim Parsen der JSON-Daten: " + parseError.message);
          }
        }
      });
    });
    return data;
  } catch (err) {
    notification(err.message || err);
    return null;
  }
}

// log debugging info
export function logInfo(message, type = textTypes.output) {

  let log = `[${new Date().toISOString()}] ${message}\n`;
  log = customText(log, type);

  // Append the message to the log file
  fs.appendFile(debuggingLogFile, log, (err) => {
    if (err) {
      console.error("Failed to write to log file:", err);
    } else {
      console.log("Log written successfully!");
    }
  });
}
