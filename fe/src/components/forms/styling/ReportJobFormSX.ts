import {Palette} from "@mui/material";
import ChromaticsService from "../../../services/ChromaticsService";

export const reportJobFormSX = {
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "24px",
}

export const reportJobFormInnerSX = {
  display: "flex",
  flexDirection: "column",
  gap: "12px"
}

export const reportReasonSX = (palette: Palette) => {
  //@ts-ignore
  const darkThemeActive = palette.type === "dark";

  return {
    "& .MuiOutlinedInput-root": {
      backgroundColor: palette.background.default,
      color: palette.text.secondary,
      "& fieldset": {
        border: `2px solid ${palette.background.default}`,
      },
      "&:hover fieldset": {
        borderColor: ChromaticsService.adjustColorLightness(
            palette.background.default,
            10 * (darkThemeActive ? 1 : -1)
        ),
      },
      "&.Mui-focused fieldset": {
        borderColor: ChromaticsService.adjustColorLightness(
            palette.background.default,
            15 * (darkThemeActive ? 1 : -1)
        ),
      },
    },
    "& .MuiInputLabel-shrink": {
      color: `${palette.text.secondary} !important`,
    }
  }
}

export const reportDescriptionSX = (palette: Palette) => {
  //@ts-ignore
  const darkThemeActive = palette.type === "dark";

  return {
    width: "100%",
    "& .MuiOutlinedInput-root": {
      backgroundColor: palette.background.default,
      color: palette.text.secondary,
      "& fieldset": {
        border: `2px solid ${palette.background.default}`
      },
      "&:hover fieldset": {
        borderColor: ChromaticsService.adjustColorLightness(
            palette.background.default,
            10 * (darkThemeActive ? 1 : -1)
        ),
      },
      "&.Mui-focused fieldset": {
        borderColor: ChromaticsService.adjustColorLightness(
            palette.background.default,
            15 * (darkThemeActive ? 1 : -1)
        ),
      }
    },
    "& .MuiInputLabel-shrink": {
      color: `${palette.text.secondary} !important`,
    }
  }
}

export const submitReportSX = {
  textTransform: "none",
  "&:disabled": {
    color: "#A6A6A6"
  }
}
