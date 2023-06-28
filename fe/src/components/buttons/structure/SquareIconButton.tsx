import react from "react";
import {IconButton, Palette, useTheme} from "@mui/material";
import {squareIconButtonSX} from "../styling/SquareIconButtonSX";

type SquareIconButtonParams = {
  id?: string,
  icon: react.ReactNode,
  onClick: (...args: any[]) => any,
  /**
   * primary - will make the button have the purple background and a white-ish icon
   * theme1 - will make the button have a background and icon color that complies with the active theme
   * theme2 - will make the button have a background and icon color that complies with the active theme
   */
  variant: "primary" | "theme1" | "theme2"
}

const SquareIconButton = (params: SquareIconButtonParams) => {
  const palette: Palette = useTheme().palette;

  return (
    <IconButton id={"square-icon-button"} children={params.icon} onClick={params.onClick}
      sx={squareIconButtonSX(palette, params.variant)}/>
  );
};

export default SquareIconButton;
