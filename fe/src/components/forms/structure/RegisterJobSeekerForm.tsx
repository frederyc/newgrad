import React, {useContext, useEffect, useState} from "react";
import {Box, Button, Typography} from "@mui/material";
import AuthTextField from "../../inputs/structure/AuthTextField";
import FormValidationService from "../../../services/FormValidationService";
import AuthenticationPasswordTooltip from "../../tooltips/structure/AuthenticationPasswordTooltip";
import {
  passwordWrapperSX,
  registerJobSeekerFormSX, userButtonInputSX,
  userTextInputWrapperSX
} from "../styling/RegisterJobSeekerFormSX";
import {RegisterFVE} from "../../../types/types/FormValidationErrorTypes";
import AuthenticationJobSeekerEmailTooltip from "../../tooltips/structure/AuthenticationJobSeekerEmailTooltip";
import {LoadingButton} from "@mui/lab";
import AuthenticationService from "../../../services/AuthenticationService";
import {AxiosError} from "axios";
import {GlobalAlertType} from "../../../types/types/GlobalAlertType";
import react from "react";
import GlobalAlertContext from "../../../contexts/GlobalAlertContext";
import {UniversityData} from "../../../types/types/UniversityData";
import UniversityService from "../../../services/UniversityService";
import {SignUpRequestType} from "../../../types/types/SignUpRequestType";

/**
 * This is the job seeker register form, used alongside the recruiter register form. It has the following elements:
 * Default Message: (Join NewGrad today and browse tech jobs from top tier tech companies.);
 * Name Field;
 * Email Field;
 * Password Field;
 * Confirm Password Field;
 * Password Requirements Tooltip;
 * Create Account Button;
 */
const RegisterJobSeekerForm = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [cpassword, setCPassword] = useState<string>("");
  const [registerFV, setRegisterFV] = useState<RegisterFVE>({
    fullName: null, email: null, password: null, cpassword: null,
  });

  const [disableForm, setDisableForm] = useState<boolean>(false);
  const globalAlertContext: react.Dispatch<GlobalAlertType> = useContext(GlobalAlertContext)!;

  const formValidatorSketch = {
    fv: registerFV,
    setFV: setRegisterFV
  }

  const handleCreateAccount = async () => {
    setDisableForm(true);
    const formStatus: RegisterFVE = FormValidationService.getRegisterFormErrors(name, email, password, cpassword);
    setRegisterFV(formStatus);
    if (Object.values(formStatus).every((v) => v === null || v === undefined)) {
      const university = await UniversityService.getByStudentEmailDomain(email.split("@")[1]);
      if (!university) {
        const alertData: GlobalAlertType = {
          severity: "error",
          title: "University not found",
          message: "Based on your email domain, there's no university in our database",
          open: true
        }
        globalAlertContext(alertData);
        setDisableForm(false);
        return;
      }

      try {
        const response = await AuthenticationService.signUp({
          name: name,
          email: email,
          password: password,
          role: "JOB_SEEKER",
          university: university.name,
        } as SignUpRequestType);
        const alertData: GlobalAlertType = {
          severity: "success",
          title: "Account created successfully",
          message: "Please verify your email before logging in",
          open: true
        }
        globalAlertContext(alertData);
      } catch (e: any) {
        const alertData: GlobalAlertType = {
          severity: "error",
          title: "Account creation error",
          message: e.response!.data.substring(4),  // the substring is to get rid of http status code
          open: true
        }
        globalAlertContext(alertData);
      }
    }
    setDisableForm(false);
  }

  return (
      <Box id={"register-job-seeker-form"} onSubmit={handleCreateAccount} sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "top",
        gap: "12px",
        minHeight: "310px"
      }}>
        <Typography variant={"subtitle1"} sx={registerJobSeekerFormSX}>
          Join NewGrad today and browse tech jobs from top tier tech companies.
        </Typography>
        <Box id={"user-text-input-wrapper"} sx={userTextInputWrapperSX}>
          <AuthTextField id={"full-name"} label={"Full Name"} type={"text"} setText={setName} disabled={disableForm}
            formValidator={{...formValidatorSketch, field: "fullName"}
          }/>
          <Box id={"email-wrapper"} sx={passwordWrapperSX}>
            <AuthTextField id={"email"} label={"School email"} type={"email"} setText={setEmail} disabled={disableForm}
                           formValidator={{...formValidatorSketch, field: "email"}
            }/>
            <AuthenticationJobSeekerEmailTooltip />
          </Box>
          <Box id={"password-wrapper"} sx={passwordWrapperSX}>
            <AuthTextField id={"password"} label={"Password"} type={"password"} setText={setPassword}
              disabled={disableForm}
              formValidator={{...formValidatorSketch, field: "password"}
            } />
            <AuthTextField id={"confirm-password"} label={"Confirm Password"} type={"password"} setText={setCPassword}
              disabled={disableForm}
              formValidator={{...formValidatorSketch, field: "cpassword"}
            } />
            <AuthenticationPasswordTooltip />
          </Box>
        </Box>
        <Box id={"user-button-input"} sx={userButtonInputSX}>
          <LoadingButton id={"create-account"} variant={"contained"} size={"small"} type={"submit"}
            onClick={handleCreateAccount} loading={disableForm} sx={{textTransform: "none"}}>
            Create account
          </LoadingButton>
        </Box>
      </Box>
  );
}

export default RegisterJobSeekerForm;
