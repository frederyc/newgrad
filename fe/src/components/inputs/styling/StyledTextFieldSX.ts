import {Palette} from "@mui/material";
import ChromaticsService from "../../../services/ChromaticsService";

export const styledTextFieldSX = (palette: Palette) => {
  //@ts-ignore
  const darkThemeActive = palette.type === "dark";
  return {
    "& .MuiOutlinedInput-root": {
      "input::-webkit-inner-spin-button": {
        "-webkit-appearance": "none",
        margin: 0,
      },
      "input[type=number]": {
        "-moz-appearance": "textfield"
      },
      backgroundColor: palette.background.paper,
      color: palette.text.primary,
      "& fieldset": {
        border: `2px solid ${palette.background.paper}`
      },
      "&:hover fieldset": {
        borderColor: ChromaticsService.adjustColorLightness(
            darkThemeActive ? palette.background.paper : palette.primary.main,
            10 * (darkThemeActive ? 1 : -1)
        ),
      },
      "&.Mui-disabled fieldset": {
        borderWidth: "0px",
      },
      "&.Mui-focused fieldset": {
        borderColor: ChromaticsService.adjustColorLightness(
            palette.background.paper,
            15 * (darkThemeActive ? 1 : -1)
        ),
      },
    },
    "#error-message": {
      color: palette.error.main,
      fontSize: "0.75em",
      margin: "4px 0px 0px 16px"
    }
  }
}
