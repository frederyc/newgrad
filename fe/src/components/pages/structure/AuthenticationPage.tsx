import react, {useState} from "react";
import {Alert, Box, Snackbar} from "@mui/material";
import WindowDimensions from "../../../types/interfaces/WindowDimensions";
import useWindowDimensions from "../../../hooks/useWindowDimensions";
import AuthenticationCard from "../../cards/structure/AuthenticationCard";
import background from "../../../resources/images/background_companies.jpg";
import {
  authenticationFormWrapperSX,
  authenticationPageSX,
  backgroundImgSX,
  backgroundWrapperSX
} from "../styling/AuthenticationPageSX";

const AuthenticationPage = () => {
  const wd: WindowDimensions = useWindowDimensions();

  return (
    <Box id={"authentication-page"} sx={authenticationPageSX}>
      <Box id={"background-wrapper"} sx={backgroundWrapperSX(wd)}>
        <img src={background} alt={"Cannot load image"} style={backgroundImgSX} />
      </Box>
      <Box id={"authentication-form-wrapper"} sx={authenticationFormWrapperSX}>
        <AuthenticationCard />
      </Box>
    </Box>
  );
}

export default AuthenticationPage;
