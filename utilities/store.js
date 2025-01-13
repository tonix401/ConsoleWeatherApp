import { writeFile, readFile, appendFile } from "node:fs";
import notification from "../activities/notification.js";
import textTypes from "./types/textTypes.js";
import logTypes from "./types/logTypes.js";
import { customLog } from "./formatting.js";

// this one is definitely correct do not change
const debuggingLogFile = "./utilities/stores/log.txt";

// TODO: fix this mess
// this one has some problems
const appStorageFile = "./utilities/stores/store.txt";

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
    console.log("Lade Datei...");
    const data = await new Promise((resolve, reject) => {
      readFile(appStorageFile, "utf8", (err, data) => {
        if (err) {
          console.error("Lesefehler:", err);
          reject(new Error("Fehler beim Lesen der Datei: " + err.message));
        } else {
          console.log("Datei geladen, versuche zu parsen...");
          try {
            const jsonData = JSON.parse(data);
            resolve(jsonData);
          } catch (parseError) {
            console.error("Parserfehler:", parseError);
            reject(new Error("Fehler beim Parsen der JSON-Daten: " + parseError.message));
          }
        }
      });
    });
    console.log("Daten erfolgreich geladen:", data);
    return data;
  } catch (err) {
    notification(err.message || "Ein unbekannter Fehler ist aufgetreten.", textTypes.error);
    return null;
  }
}


// log debugging info
export function log(message, logType = logTypes.info) {
  let log = `${new Date().toLocaleTimeString()} | ${logType} | ${message}\n`;

  // append the log to the file
  appendFile(debuggingLogFile, log, (err) => {
    if (err) {
      customLog("Log gescheitert", textTypes.error);
    }
  });
}

log("test log " + Math.random(), logTypes.error);