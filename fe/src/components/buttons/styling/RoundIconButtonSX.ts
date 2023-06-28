import ChromaticsService from "../../../services/ChromaticsService";
import {Palette} from "@mui/material";

export const roundIconButtonSX = (palette: Palette, variant: "primary" | "theme1" | "theme2") => {
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
    opacity: "0.4",
    borderRadius: "50%",
    width: "32px",
    height: "32px",
    color: `${iconColor}`,
    "&:hover": {
      backgroundColor: ChromaticsService.adjustColorLightness(
          mainButtonColor(),
          15
      )
    },
  }
}
