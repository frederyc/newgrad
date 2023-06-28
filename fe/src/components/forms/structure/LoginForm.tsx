import react, {useContext, useState} from "react";
import {Box, Typography} from "@mui/material";
import AuthTextField from "../../inputs/structure/AuthTextField";
import {
  formWrapperSX, promotionMessageSX,
  userButtonInputWrapperSX,
  userTextInputWrapperSX
} from "../styling/LoginFormSX";
import {LoadingButton} from "@mui/lab";
import AuthenticationService from "../../../services/AuthenticationService";
import {AxiosError} from "axios";
import {GlobalAlertType} from "../../../types/types/GlobalAlertType";
import GlobalAlertContext from "../../../contexts/GlobalAlertContext";
import {NavigateFunction, useNavigate} from "react-router-dom";

/**
 * This is the form used for the login screen part of the card. It contains the following items:
 * Default message (Best place to start your career. Best place to find talent.);
 * Email Field;
 * Password Field;
 * Login Button;
 * Default message (-or continue with-);
 * Alternative authentication methods (Facebook, Google);
 */
const LoginForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [disableForm, setDisableForm] = useState<boolean>(false);
  const globalAlertContext: react.Dispatch<GlobalAlertType> = useContext(GlobalAlertContext)!;
  const nav: NavigateFunction = useNavigate();

  const handleLogin = async () => {
    setDisableForm(true);
    const response = await AuthenticationService.signIn(email, password);
    if (response instanceof AxiosError) {
      const alertData: GlobalAlertType = {
        severity: "error",
        title: "Authentication error",
        message: response.response!.data.substring(4),  // the substring is to get rid of http status code
        open: true
      }
      globalAlertContext(alertData);
    } else {
      AuthenticationService.storeJWT(response);
      nav("/browse");
    }
    setDisableForm(false);
  }

  return (
      <Box id={"form-wrapper"} sx={formWrapperSX}>
        <Typography variant={"subtitle1"} sx={promotionMessageSX}>
          Best place to start your career. Best place to find talent.
        </Typography>
        <Box id={"user-text-input-wrapper"} sx={userTextInputWrapperSX}>
          <AuthTextField id={"email"} label={"Email"} type={"email"} setText={setEmail} disabled={disableForm} />
          <AuthTextField id={"password"} label={"Password"} type={"password"} setText={setPassword} disabled={disableForm} />
        </Box>
        <Box id={"user-button-input-wrapper"} sx={userButtonInputWrapperSX}>
          <LoadingButton loading={disableForm} onClick={handleLogin} id={"login"} variant={"contained"}
            size={"small"} disabled={disableForm} sx={{textTransform: "none"}}>
            Login
          </LoadingButton>
        </Box>
      </Box>
  );
}

export default LoginForm;
