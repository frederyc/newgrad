import React from "react";
import {Box, Button, Typography} from "@mui/material";
import logo from '../../../resources/images/newgradeu_logo.jpg';
import LoginForm from "../../forms/structure/LoginForm";
import {
  cardTitleSX,
  loginCardSX,
  logoImgSX,
  logoNameSX,
  logoWrapperSX,
  pretextRegisterSX
} from "../styling/LoginCardSX";

type LoginCardParams = {
  switchToRegister: React.Dispatch<React.SetStateAction<boolean>>
}

const LoginCard = (params: LoginCardParams) => {
  return (
      <Box id={"login-card"} sx={loginCardSX}>
        <Box id={"logo-wrapper"} sx={logoWrapperSX}>
          <img src={logo} alt={"Cannot load image"} style={logoImgSX} />
          <Typography id={"logo-name"} variant={"h5"} sx={logoNameSX} >
            New Grad EU
          </Typography>
        </Box>
        <Typography id={"card-title"} variant={"h4"} sx={cardTitleSX}>
          Login
        </Typography>
        <LoginForm />
        <Box sx={pretextRegisterSX}>
          <Typography id={"pretext-register"} variant={"subtitle1"} sx={{color: "#ACB7C0"}}>
            Are you new to this platform?
          </Typography>
          <Button variant={"text"} size={"small"} onClick={()=>params.switchToRegister(true)} sx={{fontWeight: "bold"}}>
            Register
          </Button>
        </Box>
      </Box>
  );
}

export default LoginCard;
