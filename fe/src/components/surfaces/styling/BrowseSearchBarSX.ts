import ChromaticsService from "../../../services/ChromaticsService";
import {Palette} from "@mui/material";

export const browseSearchBarSX = {
  width: "100%",
  display: "flex",
  flexDirection: "row",
  gap: "12px",
  "@media (max-width: 1000px)": {
    gap: "6px"
  },
}

export const searchInputsWrapperSX = {
  width: "100%",
  display: "flex",
  flexDirection: "row",
  gap: "12px",
  "@media (max-width: 1000px)": {
    flexDirection: "column",
    gap: "6px"
  },
}

export const locationFieldSX = (palette: Palette) => {
  // @ts-ignore
  const darkTheme: boolean = palette.type === "dark";
  return {
    height: "100%",
    "& .MuiOutlinedInput-root": {
      "@media (max-width: 1000px)": {
        height: "32px"
      },
      height: "100%",
      padding: "8.5px 14px 8.5px 14px !important",
      margin: "0px !important",
      backgroundColor: palette.background.default,
      color: palette.text.secondary,
      "& fieldset": {
        border: `2px solid ${palette.background.default}`
      },
      "&:hover fieldset": {
        borderColor: palette.background.default
      },
      "&.Mui-focused fieldset": {
        borderColor: ChromaticsService.adjustColorLightness(
            palette.background.default,
            15 * (darkTheme ? 1 : -1)
        ),
      },
    },
    "& .MuiAutocomplete-clearIndicator": {
      color: palette.text.secondary
    },
    "& .MuiAutocomplete-popupIndicator": {
      display: "none",
      color: palette.text.secondary
    },
    ".MuiInputBase-input": {
      height: "100% !important",
      padding: "0px !important",
      "@media (max-width: 1000px)": {
      },
    },
  }
}

export const actionButtonsWrapperSX = {
  display: "flex",
  flexDirection: "row",
  gap: "12px",
  "@media (max-width: 1000px)": {
    flexDirection: "column",
    gap: "6px"
  }
}

