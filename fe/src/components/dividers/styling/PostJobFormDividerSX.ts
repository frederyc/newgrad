import {Palette} from "@mui/material";

export const postJobFormDividerSX = (palette: Palette) => {
  return {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: "8px",
    width: "100%",
    margin: "8px 0px 8px 0px",
    hr: {
      flexGrow: 1,
      width: "30px",
      height: "2px",
      backgroundColor: palette.background.paper
    },
    ".MuiChip-root": {
      backgroundColor: palette.background.paper,
      ".MuiChip-label": {
        color: palette.text.primary
      }
    }
  }
}
