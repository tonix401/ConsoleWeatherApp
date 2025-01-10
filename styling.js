import { styleText } from "node:util";

const titleStyle = ["cyan", "bold"];
const outputStyle = "white";
const inputStyle = ["cyan"];

const colors = ["red", "green", "yellow", "blue", "magenta", "cyan"];
let colorCounter = colors.length - 1;

// returns custom styled text
export function customText(text, style = "output") {
  switch (style) {
    case "title":
      return styleText(titleStyle, text);

    case "output":
    case "out":
      return styleText(outputStyle, text);

    case "input":
    case "in":
      return styleText(inputStyle, text);

    case "prompt":
      return styleText(inputStyle, text) + styleText("blink", " > ");

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
  const maxWidth = Math.max(...textArray.map((str) => str.length));

  const outerBorder = [..."#".repeat(maxWidth + 6)]
    .map((char) => colorString(char))
    .join("");
  const innerBorderHash = cHash();
  const innerBorder =
    innerBorderHash + `${" ".repeat(maxWidth + 4)}` + innerBorderHash;

  const rowsArray = textArray.map((str) => {
    const colorHash = cHash();
    return (
      colorHash + `  ${str} ${" ".repeat(maxWidth - str.length)} ` + colorHash
    );
  });
  const rows = rowsArray.join("\n");
  const result = `${outerBorder}\n${innerBorder}\n${rows}\n${innerBorder}\n${outerBorder}`;

  return result;
}

const cHash = () => styleText(getNextColor(), "#");
const colorString = (string) => styleText(getNextColor(), string);

// gets a color for the box borders
function getNextColor() {
  let color = colors[colorCounter];

  if (colorCounter === 0) {
    colorCounter = colors.length - 1;
  } else {
    colorCounter--;
  }

  return color;
}
