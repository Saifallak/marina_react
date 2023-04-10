import { atom } from "recoil";

//Navbar state
export const navState = atom({
  key: "nav_state",
  default: false,
});

// Language State
export const languageState = atom({
  key: "language_state",
  default: "ar",
});
