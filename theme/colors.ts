export interface Colors {
  background: string;
  text: string;
  error: string;
  foreground: string;
  light_gray: string;
  button: string;
  text_white: string;
  text_black: string;
  icon_color: string;
  green: string;
}

// themes.js
export const light: Colors = {
  background: "#f6f7f7",
  text: "#000000",
  error: "crimson",
  foreground: "#fefeff",
  light_gray: "#868686",
  button: "#539be9",
  text_white: "#ffffff",
  text_black: "#000000",
  icon_color: "#868686",
  green: "green",
};

export const dark: Colors = {
  background: "#0d0d0c",
  text: "#dddddd",
  error: "crimson",
  foreground: "#181918",
  light_gray: "#868686",
  button: "#ffffff",
  text_white: "#ffffff",
  text_black: "#151414",
  icon_color: "#868686",
  green: "green",
};
