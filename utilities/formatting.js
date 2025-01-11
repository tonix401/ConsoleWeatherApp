import { styleText } from "node:util";
import styles from "./types/styles.js";
import textTypes from "./types/textTypes.js";
import { regexANSI } from "./DO_NOT_TOUCH.js";


// returns custom styled text according to the set styles
export function customText(text = "", style = textTypes.output) {
  switch (style) {
    case "err":
    case textTypes.error:
      return styleText(styles.error, `Fehler! ${text}`);

    case "warn":
    case textTypes.warning:
      return styleText(styles.warn, `Warnung! ${text}`);

    case textTypes.prompt:
      return styleText(styles.input, text) + styleText(styles.carret, " > ");

    case textTypes.yesno:
      return styleText(
        styles.input,
        text + " (y/n)" + styleText(styles.carret, " > ")
      );

    case textTypes.title:
      return styleText(styles.title, text);

    case "out":
    case textTypes.output:
      return styleText(styles.output, text);

    case "in":
    case textTypes.input:
      return styleText(styles.input, text);

    case textTypes.box:
      return styleText(styles.box, text);

    default:
      throw new TypeError(`${style} ist kein valider text style`);
  }
}

// logs in a custom style
export function customLog(text, style) {
  console.log(customText(text, style));
}

// makes a box around a string or array of strings
export function createTextBox(textArray) {

  // this turns (formatted) strings into an array, that can be "boxed"
  if (typeof textArray === "string") {
    let format;

    if(regexANSI.test(textArray)){
      format = textArray.match(regexANSI)[0];
      textArray = textArray.replace("\n", `${format}\n\x1B[0m`)
    }

    textArray = textArray.split("\n");
  }


  const maxWidth = Math.max(
    ...textArray.map((str) => str.replace(regexANSI, "").length)
  );

  const outerBorder = styleText(styles.box, "#".repeat(maxWidth + 6));
  const innerBorder = `#${" ".repeat(maxWidth + 4)}#`;

  const rowsArray = textArray.map((str) => {
    return `#  ${str} ${" ".repeat(
      maxWidth - str.replace(regexANSI, "").length
    )} #`;
  });
  const rows = rowsArray.join("\n");
  const result = `${outerBorder}\n${innerBorder}\n${rows}\n${innerBorder}\n${outerBorder}`;

  return result;
}

// actually clears the console completely
export function clear() {
  //TODO revert
  //process.stdout.write("\x1b[2J\x1b[0f");
}
