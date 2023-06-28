import React, {useState} from "react";
import {Box, Button, Typography} from "@mui/material";
import logo from "../../../resources/images/newgradeu_logo.jpg";
import AuthTabbedNavigator, {TAB_FORM} from "../../navigation/structure/AuthTabbedNavigator";
import RegisterJobSeekerForm from "../../forms/structure/RegisterJobSeekerForm";
import RegisterRecruiterForm from "../../forms/structure/RegisterRecruiterForm";
import {
  cardTitleSX,
  logoImgSX,
  logoNameSX,
  logoWrapperSX,
  pretextLoginSX,
  registerJobSeekerFormSX
} from "../styling/RegisterCardSX";

type RegisterFormSelectParams = {
  switchFromLogin: React.Dispatch<React.SetStateAction<boolean>>
}

/**
 * This is a selector component used on the register screen. It contains the logo, the tabbed navigator, the register
 * form for either Job Seeker or recruiter and a button to go back to the Login Page.
 * Due to the current background on the register screen, we had to create a separate component for this.
 */
const RegisterCard = (params: RegisterFormSelectParams) => {
  const [tab, setTab] = useState<TAB_FORM>(TAB_FORM.JOB_SEEKER);
  return (
    <Box id={"register-job-seeker-form"} sx={registerJobSeekerFormSX}>
      <Box id={"logo-wrapper"} sx={logoWrapperSX}>
        <img src={logo} alt={"Cannot load image"} style={logoImgSX} />
        <Typography id={"logo-name"} variant={"h5"} sx={logoNameSX} >
          New Grad EU
        </Typography>
      </Box>
      <Typography id={"card-title"} variant={"h4"} sx={cardTitleSX}>
        Register
      </Typography>
      <AuthTabbedNavigator tab={tab} setTab={setTab}/>
      { tab === TAB_FORM.JOB_SEEKER ? <RegisterJobSeekerForm /> : <RegisterRecruiterForm /> }
      <Box sx={pretextLoginSX}>
        <Typography variant={"subtitle1"} sx={{ color: "#ACB7C0" }}>
          Already have an account?
        </Typography>
        <Button onClick={() => params.switchFromLogin(false)} variant={"text"} size={"small"} sx={{fontWeight: "bold"}}>
          Login
        </Button>
      </Box>
    </Box>
  );
}

export default RegisterCard;
