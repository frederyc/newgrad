import {Palette} from "@mui/material";
import ChromaticsService from "../../../services/ChromaticsService";
import {lightTheme} from "../../../theme";

export const comingSoonChipSX = (palette: Palette) => {
  return {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "4px",
    padding: "3px 6px 3px 6px",
    width: "fit-content",
    backgroundColor: ChromaticsService.adjustColorLightness(
        palette === lightTheme.palette ? palette.secondary.main : palette.background.paper,
        10
    ),
    borderRadius: "2px",
    fontWeight: "bold",
    color: palette.text.primary
  }
}
