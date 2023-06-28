import {Palette} from "@mui/material";
import {lightTheme} from "../../../theme";
import WindowDimensions from "../../../types/interfaces/WindowDimensions";

export const jobEntryCardSX = (palette: Palette) => {
  return {
    height: "280px",
    width: "280px",
    padding: "8px",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    backgroundColor: palette.background.paper,
    border: `2px solid ${palette.background.paper}`,
    borderRadius: "10px",
    transition: ".1s",
    "&:hover": {
      transform: "scale(1.025)",
      cursor: "pointer"
    },
    "@media (max-width: 1000px)": {
      height: "80px",
      width: "100%",
    }
  }
}

export const contentHeaderSX = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "top",
  gap: "6px",
  width: "100%",
  height: "64px",
}

export const companyLogoSX = {
  width: "64px",
  height: "64px",
  borderRadius: "5px"
}

export const mainDetailsSX = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  height: "100%",
  "@media (max-width: 1000px)": {
    width: "100%",
  },
  width: "164px",
}

export const h6TextPrimarySX = (palette: Palette, wd: WindowDimensions) => {
  return {
    fontSize: "0.9em",
    color: palette.text.primary,
    width: wd.width <= 1000 ? `${wd.width * 0.6}px` : "100%"
  }
}

export const sub1ThemePrimarySX = (palette: Palette) => {
  return {
    fontSize: "0.7em",
    color: palette.primary.main,
  }
}

export const sub1TextPrimarySX = (palette: Palette) => {
  return {
    fontSize: "0.7em",
    color: palette.text.primary,
  }
}

export const moreOptionsSX = (palette: Palette) => {
  return {
    height: "24px",
    width: "24px",
    color: palette === lightTheme.palette ? palette.text.secondary : palette.text.primary,
    padding: "0px",
    margin: "0px 0px 0px auto"
  }
}

export const contentMainSX = {
  display: "flex",
  flexDirection: "column",
  gap: "4px",
  "@media (max-width: 1000px)": {
    display: "none"
  }
}

export const titleH5SX = {
  fontSize: "1em",
  maxHeight: "44px",
  overflow: "hidden",
  display: ":-webkit-box",
  ":-webkit-line-clamp": 2,
  lineClamp: 2,
  "-webkit-box-orient": "vertical"
}

export const descriptionSub2SX = (palette: Palette, height: number) => {
  return {
    color: palette.text.secondary,
    overflow: "hidden",
    height: `${height}px`
  }
}

export const tagsBoxSX = {
  display: "flex",
  flexDirection: "row",
  gap: "6px"
}
