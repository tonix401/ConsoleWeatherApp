import { createTextBlock } from "./styling.js";

const text = createTextBlock(["hallo","tschau"])

const blinkText = (text, interval) => {
  let isVisible = true;

  setInterval(() => {
    if (isVisible) {
      process.stdout.write(`\r${text}`); // Print the text
    } else {
      process.stdout.write("\r" + " ".repeat(text.length));
    }

    isVisible = !isVisible;
  }, interval);
};

// Start blinking the ' > ' text every 500ms
blinkText(text, 600);
