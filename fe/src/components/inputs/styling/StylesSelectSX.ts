import {Palette} from "@mui/material";
import ChromaticsService from "../../../services/ChromaticsService";

export const x = 10;

export const styleSelectSX = (palette: Palette) => {
  return {
    // Cant really change border colors
    backgroundColor: palette.background.paper,
    color: palette.text.primary,
    svg: {
      color: palette.text.primary
    }
  }
}
