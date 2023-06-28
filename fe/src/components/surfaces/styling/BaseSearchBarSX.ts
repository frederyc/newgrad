import {Palette} from "@mui/material";

export const baseSearchBarSX = (palette: Palette) => {
  return {
    width: "85vw",
    height: "56px",
    position: "fixed",
    right: "0px",
    top: "0px",
    display: "flex",
    flexDirection: "row",
    gap: "6px",
    padding: "8px 24px 8px 24px",
    zIndex: "1",
    backgroundColor: palette.background.paper,
    boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
    "@media (max-width: 1000px)": {
      height: "82px",
      padding: "6px 12px 6px 12px",
      width: "100vw"
    },
  }
}

export const contentWrapperSX = {
  width: "100%",
  height: "100%",
  padding: "0px 48px 0px 48px",
  "@media (max-width: 1000px)": {
    padding: "0"
  },
}

export const newgradLogoSX = {
  width: "32px",
  height: "32px",
  borderRadius: "4px"
}

export const mainMenuWrapperSX = {
  display: "flex",
  "@media (min-width: 1000px)": {
    display: "none",
  },
  flexDirection: "row",
  justifyContent: "top",
  gap: "12px",
  "@media (max-width: 1000px)": {
    flexDirection: "column",
    gap: "6px"
  },
}
