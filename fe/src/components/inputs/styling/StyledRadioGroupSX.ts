import {Palette} from "@mui/material";

export const x = 1;
export const styledRadioGroupSX = (palette: Palette, error: boolean) => {
  return {
    ".MuiFormLabel-root": {
      fontSize: "1.1em",
      color: `${error ? palette.error.main : palette.text.primary} !important`,
    },
    ".MuiButtonBase-root": {
      color: palette.text.primary,
      "&.Mui-checked": {
        color: `${palette.primary.main} !important`
      },
      paddingTop: "4px  !important",
      paddingBottom: "4px  !important",
      paddingRight: "4px  !important",
    },
    ".MuiFormControlLabel-label": {
      color: `${palette.text.primary} !important`,
    }
  }
}

