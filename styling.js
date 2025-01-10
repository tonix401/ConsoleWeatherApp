import { styleText } from "node:util";
import styles from "./styles.js";

const regexANSI =
  /(\x1b|\033)\[[0-9;]*m/;

// returns custom styled text according to the set styles
export function customText(text, style = "output") {
  switch (style) {
    case "err":
    case "error":
      return styleText(styles.error, `Fehler! ${text}`);

    case "warn":
    case "warning":
      return styleText(styles.warn, `Warnung! ${text}`);

    case "title":
      return styleText(styles.title, text);

    case "out":
    case "output":
      return styleText(styles.output, text);

    case "in":
    case "input":
      return styleText(styles.input, text);

    case "prompt":
      return styleText(styles.input, text) + styleText(styles.carret, " > ");

    default:
      throw new TypeError(`${style} ist kein valider text style`);
  }
}

// logs in a custom style
export function customLog(text, style) {
  console.log(customText(text, style));
}

// makes a box around an array of strings
export function createTextBlock(textArray) {
  const maxWidth = Math.max(
    ...textArray.map((str) => str.replace(regexANSI, ".").length)
  );

  console.error(maxWidth);

  const outerBorder = "#".repeat(maxWidth + 6);
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
