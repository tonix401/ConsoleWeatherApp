import { writeFile, readFile } from "fs";
import error from "../components/notification.js";

// save data
export function save(text) {
  writeFile("./utilities/store.json", text, "utf8", (err) => {
    if (err) {
      error("Fehler beim Schreiben der Datei:", err.message);
    }
  });
}

// load data (not 100% understood yet, done with AI's help)
export async function load() {
  try {
    const data = await new Promise((resolve, reject) => {
      readFile("./utilities/store.json", "utf8", (err, data) => {
        if (err) {
          reject("Fehler beim Lesen der Datei: " + err.message);
        } else {
          try {
            const jsonData = JSON.parse(data); // JSON-String in Objekt umwandeln
            resolve(jsonData); // Das JSON-Objekt zurückgeben
          } catch (parseError) {
            reject("Fehler beim Parsen der JSON-Daten: " + parseError.message);
          }
        }
      });
    });
    return data;
  } catch (err) {
    error(err.message);
    return null;
  }
}
