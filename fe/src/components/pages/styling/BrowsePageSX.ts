import {Palette} from "@mui/material";

export const browsePageSX = {
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  overflowX: "hidden",
  padding: "30px 60px 30px 60px",
  "@media (max-width: 1000px)": {
    padding: "16px",
  },
  gap: "32px",
}

export const browsePageWrapperSX = (width: number) => {
  return {
    display: "flex",
    maxWidth: `${width}px`,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: "16px",
    "@media (max-width: 1000px)": {
      gap: "8px",
      width: "100%",
    },
  }
}

export const noJobsText = (palette: Palette) => {
  return {
    color: palette.text.primary,
    fontSize: "0.75em"
  }
}
