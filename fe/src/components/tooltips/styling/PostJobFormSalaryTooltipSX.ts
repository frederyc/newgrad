import {Palette} from "@mui/material";

export const x = 1;

export const postJobFormSalaryTooltipIconSX = (palette: Palette) => {
  //@ts-ignore
  const darkThemeActive = palette.type === "dark";

  return {
    color: darkThemeActive ? palette.text.secondary : palette.text.primary,
    "&:hover": {
      cursor: "pointer"
    }
  }
}
