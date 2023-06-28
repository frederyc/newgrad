import {Palette} from "@mui/material";

export const reportJobDialogContentSX = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  gap: "24px",
  width: "600px",
  "@media (max-width: 1000px)": {
    width: "100%"
  },
  overflowX: "hidden"
}

export const reportJobDialogContentLoadingSX = {
  width: "100%",
  height: "200px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
}

export const jobDetailsSX = {
  position: "relative",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: "8px"
}

export const logoImgSX = {
  width: "64px",
  height: "64px",
  borderRadius: "5px"
}

export const companyNameSX = (palette: Palette) => {
  return {
    textAlign: "center",
    width: "fit-content",
    fontSize: "1em",
    color: palette.text.primary,
  }
}

export const jobTitleSX = (palette: Palette) => {
  return {
    textAlign: "start",
    width: "85%",
    "@media (max-width: 1000px)": {
      width: "70%",
    },
    fontSize: "0.8em",
    color: palette.text.primary,
    overflowX: "hidden",
  }
}

export const cancelIconSX = {
  position: "absolute",
  top: "0px",
  right: "0px"
}
