import {Palette} from "@mui/material";
import ChromaticsService from "../../../services/ChromaticsService";
import {lightTheme} from "../../../theme";
import react from "react";

export const jobEntryTagSX = (palette: Palette, icon: react.ReactNode | undefined) => {
  return {
    display: "flex",
    flexDirection: "row",
    gap: "4px",
    borderRadius: "2px",
    backgroundColor: ChromaticsService.adjustColorLightness(
        palette === lightTheme.palette ? palette.secondary.main : palette.background.paper,
        10
    ),
    padding: icon ? "2px 6px 2px 2px" : "0px 6px 0px 6px",
  }
}

export const captionSX = (palette: Palette) => {
  return {
    width: "fit-content",
    height: "100%",
    marginTop: "1px",
    color: palette.text.primary,
  }
}
