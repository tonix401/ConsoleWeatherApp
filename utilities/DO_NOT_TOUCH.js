/*
  DO NOT TOUCH THE HOLY REGEX, IT IS VERY FRAGILE!
  HANDS OFF OR THE BUGS WILL HAUNT YOU!
*/
export const regexANSI = /(\x1B|\033)\[[0-9;]*m/g;

// matches the ansi escape codes used for text formatting
