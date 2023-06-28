import {Palette} from "@mui/material";
import ChromaticsService from "../../../services/ChromaticsService";

export const postJobFormSX = {
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "16px",
}

export const titleLocationWrapperSX = {
  width: "100%",
  display: "flex",
  flexDirection: "row",
  gap: "12px",
  "@media (max-width: 1000px)": {
    flexDirection: "column",
  },
}

export const dividerSX = (palette: Palette) => {
  //@ts-ignore
  const darkThemeActive = palette.type === "dark";

  return {
    backgroundColor: darkThemeActive ? palette.text.secondary : palette.text.primary,
    width: "100%",
    height: "2px",
    color: darkThemeActive ? palette.text.secondary : palette.text.primary,
  }
}

export const jobLocationSX = (palette: Palette) => {
  //@ts-ignore
  const darkThemeActive = palette.type === "dark";

  return {
    "& .MuiOutlinedInput-root": {
      height: "fit-content",
      padding: "8.5px 14px 8.5px 14px !important",
      margin: "0px !important",
      backgroundColor: palette.background.paper,
      color: palette.text.secondary,
      "& fieldset": {
        border: `2px solid ${palette.background.paper}`
      },
      "&:hover fieldset": {
        borderColor: ChromaticsService.adjustColorLightness(
            palette.background.paper,
            10 * (darkThemeActive ? 1 : -1)
        ),
      },
      "&.Mui-focused fieldset": {
        borderColor: ChromaticsService.adjustColorLightness(
            palette.background.paper,
            15 * (darkThemeActive ? 1 : -1)
        ),
      },
    },
    "& .MuiAutocomplete-clearIndicator": {
      color: `${palette.text.primary} !important`
    },
    "& .MuiAutocomplete-popupIndicator": {
      display: "none",
      color: `${palette.text.primary} !important`
    },
    ".MuiInputBase-input": {
      color: `${palette.text.primary} !important`,
      padding: "0px !important",
    }
  }
}

export const jobDescriptionSX = (palette: Palette) => {
  //@ts-ignore
  const darkThemeActive = palette.type === "dark";

  return {
    width: "100%",
    "& .MuiOutlinedInput-root": {
      resize: "vertical",
      overflow: "auto",
      backgroundColor: palette.background.paper,
      color: palette.text.primary,
      minHeight: "60px",
      ".MuiOutlinedInput-input": {
        height: "95% !important",
        padding: "0px !important",
        margin: "0xp !important",
        "::-webkit-scrollbar": {
          display: "none",    // Chrome, Safari, Opera
          "-ms-overflow-style": "none",  // IE and Edge
          "scrollbar-width": "none",  // Firefox
        },
      },
      "& fieldset": {
        border: `2px solid ${palette.background.paper}`
      },
      "&:hover fieldset": {
        borderColor: ChromaticsService.adjustColorLightness(
            darkThemeActive ? palette.background.paper : palette.primary.main,
            10 * (darkThemeActive ? 1 : -1)
        ),
      },
      "&.Mui-focused fieldset": {
        borderColor: ChromaticsService.adjustColorLightness(
            palette.background.paper,
            15 * (darkThemeActive ? 1 : -1)
        ),
      }
    },
    "& .MuiInputLabel-shrink": {
      color: `${darkThemeActive ? palette.text.secondary : palette.text.primary} !important`
    }
  }
}

export const dynamicListBoxSX = (palette: Palette) => {
  //@ts-ignore
  const darkThemeActive = palette.type === "dark";

  return {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    gap: "8px",
    h3: {
      fontSize: "1.25em",
      color: darkThemeActive ? palette.text.secondary : palette.text.primary
    }
  }
}

export const postJobButtonSX = (palette: Palette) => {
  return {
    textTransform: "none",
    "&:disabled": {
      backgroundColor: palette.background.paper,
      color: "#A6A6A6",
    },
  }
}

export const jobDetailsWrapperSX = {
  width: "100%",
  display: "flex",
  flexDirection: "row",
  gap: "92px",
  "@media (max-width: 1000px)": {
    flexDirection: "column",
    gap: "16px",
  },
}

export const salaryWrapperSX = (palette: Palette) => {
  //@ts-ignore
  const darkThemeActive = palette.type === "dark";
  return {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    gap: "8px",
    h3: {
      fontSize: "1.25em",
      color: darkThemeActive ? palette.text.secondary : palette.text.primary
    }
  }
}

export const salaryInfoWrapperSX = {
  display: "flex",
  flexDirection: "row",
  gap: "6px"
}

export const compensationWrapperSX = {
  width: "100%",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: "48px",
}

export const salaryDisplaySX = {
  width: "200px",
  "@media (max-width: 1000px)": {
    width: "150px"
  }
}

export const companyLogoSX = {
  width: "92px",
  height: "92px",
  borderRadius: "8px",
}

export const companyNameSX = {
  fontSize: "1.25em"
}
