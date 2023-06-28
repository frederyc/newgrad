import {Palette} from "@mui/material";

export const autocompleteCheckboxesSX = (palette: Palette, variant: "theme1" | "theme2") => {
  return {
    width: "100%",
    backgroundColor: variant === "theme1" ? palette.background.default : palette.background.paper,
    borderRadius: "3px",
    svg: {
      color: palette.text.secondary
    },
    ".MuiChip-root": {
      backgroundColor: palette.primary.main,
    },
  }
}

export const paperComponentSX = (palette: Palette, variant: "theme1" | "theme2") => {
  return {
    backgroundColor: variant === "theme1" ? palette.background.default : palette.background.paper,
    borderWidth: "1px 1px 0px 1px",
    borderStyle: "solid",
    borderColor: palette.text.secondary
  }
}
