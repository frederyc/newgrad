import {Palette} from "@mui/material";

export const filterJobsMenuSX = (palette: Palette) => {
  return {
    ".MuiPaper-root": {
      width: "400px",
      maxHeight: "100vh",
      "@media (max-width: 1000px)": {
        width: "100vw",
        maxHeight: "80vh"
      },
      backgroundColor: palette.background.paper,
      padding: "20px"
    },
  }
}

export const innerBoxSX = {
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "16px"
}

export const menuTitleSX = (palette: Palette) => {
  return {
    color: palette.primary.main,
    fontSize: "2em",
  }
}

export const filterCategoryTitleSX = {
  fontSize: "1.2em",
}

export const filterCategorySX = {
  display: "flex",
  flexDirection: "column",
}

export const categoriesWrapperSX = {
  display: "flex",
  flexDirection: "column",
  gap: "16px"
}

export const filterOptionsWrapperSX = (palette: Palette) => {
  return {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    ".MuiCheckbox-root": {
      padding: "0px 0px 0px 8px",
      color: palette.text.primary,
    },
    ".MuiFormControlLabel-label": {
      color: palette.text.primary
    }
  }
}
