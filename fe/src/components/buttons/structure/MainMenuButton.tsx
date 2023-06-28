import react, {useEffect} from "react";
import {Button, Typography} from "@mui/material";
import {mainMenuButtonSX} from "../styling/MainMenuButtonSX";
import {NavigateFunction, useLocation, useNavigate} from "react-router-dom";


type MainMenuButtonParams = {
  id?: string,
  text: string,
  onClick: () => void,
  icon: react.ReactNode,
  contained?: boolean
}

const MainMenuButton = (p: MainMenuButtonParams) => {
  return (
    <Button id={"main-menu-button"} fullWidth sx={mainMenuButtonSX} onClick={p.onClick}
            variant={p.contained ? "contained" : "text"} >
      { p.icon }
      <Typography id={"text"} variant={"h4"}>{p.text}</Typography>
    </Button>
  );
}

export default MainMenuButton;
