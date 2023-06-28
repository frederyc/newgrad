import {Palette} from "@mui/material";

export const deleteJobEntryDialogContentSX = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  gap: "24px",
  width: "600px",
  "@media (max-width: 1000px)": {
    width: "100%"
  }
}

export const logoImgSX = {
  width: "64px",
  height: "64px",
  borderRadius: "5px"
}

export const jobDetailsSX = {
  position: "relative",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: "8px"
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
    textAlign: "center",
    width: "fit-content",
    fontSize: "0.8em",
    color: palette.text.primary,
  }
}

export const cancelIconSX = {
  position: "absolute",
  top: "0px",
  right: "0px"
}
