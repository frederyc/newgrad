import {Palette} from "@mui/material";
import ChromaticsService from "../../../services/ChromaticsService";

export const squareIconButtonSX = (palette: Palette, variant: "theme1" | "theme2" | "primary") => {
  const mainButtonColor = (): string => {
    switch (variant) {
      case "primary":
        return palette.primary.main;
      case "theme1":
        return palette.background.default;
      case "theme2":
        return palette.background.paper;
    }
  }

  const iconColor: string = variant === "primary" ? palette.secondary.main : palette.text.secondary;

  return {
    backgroundColor: `${mainButtonColor()}`,
    borderRadius: "4px",
    color: `${iconColor}`,
    "&:hover": {
      backgroundColor: ChromaticsService.adjustColorLightness(
          `${mainButtonColor()}`,
          15
      )
    },
    "@media (max-width: 1000px)": {
      width: "32px",
      height: "32px"
    },
  }
}
