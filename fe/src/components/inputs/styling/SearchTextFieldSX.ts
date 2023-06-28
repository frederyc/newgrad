import {Palette} from "@mui/material";
import ChromaticsService from "../../../services/ChromaticsService";

export const searchTextFieldSX = (palette: Palette) => {
  //@ts-ignore
  const darkThemeActive = palette.type === "dark";
  return {
    "& .MuiOutlinedInput-root": {
      height: "100%",
      "@media (max-width: 1000px)": {
        height: "32px"
      },
      backgroundColor: palette.background.default,
      color: palette.text.secondary,
      "& fieldset": {
        border: `2px solid ${palette.background.default}`
      },
      "&:hover fieldset": {
        borderColor: palette.background.default
      },
      "&.Mui-focused fieldset": {
        borderColor: ChromaticsService.adjustColorLightness(
            palette.background.default,
            15 * (darkThemeActive ? 1 : -1)
        ),
      },
    },
  }
}
