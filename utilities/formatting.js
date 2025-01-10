import { styleText } from "node:util";
import styles from "./styles.js";
import { regexANSI } from "./DO_NOT_TOUCH.js";


// returns custom styled text according to the set styles
export function customText(text = "", style = "output") {
  switch (style) {
    case "err":
    case "error":
      return styleText(styles.error, `Fehler! ${text}`);

    case "warn":
    case "warning":
      return styleText(styles.warn, `Warnung! ${text}`);

    case "prompt":
      return styleText(styles.input, text) + styleText(styles.carret, " > ");

    case "yesno":
      return styleText(
        styles.input,
        text + " (y/n)" + styleText(styles.carret, " > ")
      );

    case "title":
      return styleText(styles.title, text);

    case "out":
    case "output":
      return styleText(styles.output, text);

    case "in":
    case "input":
      return styleText(styles.input, text);

    case "box":
      return styleText(styles.box, text);

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
  // this makes single lines possible, because map() doesn't make sense on a single string
  if (typeof textArray === "string") {
    textArray = [textArray];
  }

  const maxWidth = Math.max(
    ...textArray.map((str) => str.replace(regexANSI, ".").length)
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
  process.stdout.write("\x1b[2J\x1b[0f");
}
