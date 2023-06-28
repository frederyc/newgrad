import {Theme} from "@mui/material";
import {darkTheme, lightTheme} from "../theme";

export default class ThemeService {
  /**
   * Saves the active theme (light or dark) to local storage
   * @param theme Active theme
   */
  public static saveTheme(theme: Theme) {
    //@ts-ignore
    window.localStorage.setItem("theme", theme.palette.type);
  }

  /**
   * Based on the local storage data, get the desired theme
   */
  public static getTheme(): Theme {
    return (!window.localStorage.getItem("theme") || window.localStorage.getItem("theme") === "light") ? lightTheme : darkTheme;
  }
}
