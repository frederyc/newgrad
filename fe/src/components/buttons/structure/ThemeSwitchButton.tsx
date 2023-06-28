import react, {useContext} from "react";
import {Button, Palette, Theme, Typography, useTheme} from "@mui/material";
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import ThemeContext from "../../../contexts/ThemeContext";
import ThemeService from "../../../services/ThemeService";
import {darkTheme, lightTheme} from "../../../theme";
import {themeSwitchButtonSX} from "../styling/ThemeSwitchButtonSX";

const ThemeSwitchButton = () => {
  const setTheme: react.Dispatch<react.SetStateAction<Theme>> = useContext(ThemeContext)!;
  const palette: Palette = useTheme().palette;
  //@ts-ignore
  const darkThemeActive = palette.type === "dark";

  const switchTheme = () => {
    ThemeService.saveTheme(darkThemeActive ? lightTheme : darkTheme);
    setTheme(darkThemeActive ? lightTheme : darkTheme);
  }

  return (
      <Button id={"theme-switch-button"} onClick={switchTheme} fullWidth sx={themeSwitchButtonSX}>
        { darkThemeActive ? <DarkModeIcon /> : <LightModeIcon /> }
        <Typography id={"text"} variant={"h4"}>
          { darkThemeActive ? "Dark mode" : "Light mode" }
        </Typography>
      </Button>
  );
}

export default ThemeSwitchButton;
