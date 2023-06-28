import {Palette} from "@mui/material";
import WindowDimensions from "../../../types/interfaces/WindowDimensions";

export const mainMenuDesktopSX = (palette: Palette, wd: WindowDimensions) => {
  return {
    ".MuiPaper-root": {
      width: `${wd.width <= 1000 ? 75 : 15}vw`,
      height: "100vh",
      backgroundColor: palette.background.paper,
      padding: "20px",
      // boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
    },
    position: "fixed",
    left: "0px",
    top: "0px",
    zIndex: 1,
  }
}

export const headerSX = {
  display: "flex",
  flexDirection: "row",
}

export const logoWrapperSX = (palette: Palette) => {
  return {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    gap: "10px",
    alignItems: "center",
    img: {
      width: "24px",
      borderRadius: "4px"
    },
    h5: {
      height: "fit-content",
      width: "fit-content",
      fontWeight: "bold",
      fontSize: "0.85em",
      color: palette.primary.main
    }
  }
}

export const menuContainerSX = {
  display: "flex",
  flexDirection: "column",
  gap: "6px",
  height: "100%",
  width: "100%",
}

export const mainMenuContainerSX = (palette: Palette) => {
  return {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    height: "100%",
    paddingTop: "32px",
    hr: {
      backgroundColor: palette.primary.main,
      height: "2px",
      marginBottom: "2px",
    }
  }
}

export const bottomMenuContainerSX = (palette: Palette) => {
  return {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    hr: {
      backgroundColor: palette.primary.main,
      height: "1px",
      marginBottom: "2px",
    }
  }
}

export const iconButtonSX = (palette: Palette, wd: WindowDimensions) => {
  return {
    display: wd.width > 1000 ? "none" : "",
    color: palette.text.primary
  }
}
