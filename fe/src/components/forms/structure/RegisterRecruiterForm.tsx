import React, {SyntheticEvent, useContext, useEffect, useState} from "react";
import {
  Autocomplete,
  AutocompleteRenderInputParams, AutocompleteRenderOptionState,
  Box, Button,
  TextField,
  Typography
} from "@mui/material";
import AuthTextField from "../../inputs/structure/AuthTextField";
import AuthenticationPasswordTooltip from "../../tooltips/structure/AuthenticationPasswordTooltip";
import {
  companyAutocompleteSX, companyListItemSX, passwordWrapperSX,
  promotionMessageSX,
  registerRecruiterFormSX,
  userTextInputWrapperSX
} from "../styling/RegisterRecruiterFormSX";
import {RegisterFVE} from "../../../types/types/FormValidationErrorTypes";
import FormValidationService from "../../../services/FormValidationService";
import {LoadingButton} from "@mui/lab";
import AuthenticationService from "../../../services/AuthenticationService";
import {AxiosError} from "axios";
import {GlobalAlertType} from "../../../types/types/GlobalAlertType";
import react from "react";
import GlobalAlertContext from "../../../contexts/GlobalAlertContext";
import CompanyDataService from "../../../services/CompanyDataService";
import {CompanyData} from "../../../types/types/CompanyData";
import {SignUpRequestType} from "../../../types/types/SignUpRequestType";

/**
 * This is the register form, used alongside the job seeker register form. It has the following elements:
 * Default Message: (Join NewGrad today and browse tech jobs from top tier tech companies.);
 * Name Field;
 * Company Email Field; (recruiter accounts must use valid company emails)
 * Company Name Field;
 * Password Field;
 * Confirm Password Field;
 * Password Requirements Tooltip;
 * Request Account Button (all recruiter accounts must be manually verified by an admin)
 */
const RegisterRecruiterForm = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [company, setCompany] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [cpassword, setCPassword] = useState<string>("");
  const [registerFV, setRegisterFV] = useState<RegisterFVE>({
    fullName: null, email: null, company: null, password: null, cpassword: null
  });
  const [registeredCompanies, setRegisteredCompanies] = useState<CompanyData[]>([]);
  const [disableForm, setDisableForm] = useState<boolean>(false);
  const globalAlertContext: react.Dispatch<GlobalAlertType> = useContext(GlobalAlertContext)!;

  useEffect(() => {
    // Load registered companies when user clicks the register screen
    async function loadRegisteredCompanies() {
      setRegisteredCompanies(await CompanyDataService.getAllCompanies() as CompanyData[])
    }
    loadRegisteredCompanies();
  }, []);

  const formValidatorSketch = {
    fv: registerFV,
    setFV: setRegisterFV
  }

  const handleRequestAccount = async () => {
    setDisableForm(true);
    const formStatus: RegisterFVE = FormValidationService.getRegisterFormErrors(name, email, password, cpassword, company);
    setRegisterFV(formStatus);
    if (Object.values(formStatus).every((v) => v === null || v === undefined)) {
      // TODO: Should I still implement the request feature or just let the user create the account?
      const response = await AuthenticationService.signUp({
        name: name,
        email: email,
        password: password,
        role: "RECRUITER",
        company: company
      } as SignUpRequestType);
      if (response instanceof AxiosError) {
        const alertData: GlobalAlertType = {
          severity: "error",
          title: "Account creation error",
          message: response.response!.data.substring(4),
          open: true
        }
        globalAlertContext(alertData)
      } else {
        const alertData: GlobalAlertType = {
          severity: "success",
          title: "Account created successfully",
          message: "We verify recruiter accounts manually, you'll have to wait up to 48h",
          open: true
        }
        globalAlertContext(alertData);
      }
    }
    setDisableForm(false);
  }

  const handleCompanyAutocomplete = (event: SyntheticEvent, newValue: string) => {
    setRegisterFV({...registerFV, company: null});
    setCompany(newValue);
  }

  return (
      <Box id={"register-recruiter-form"} sx={registerRecruiterFormSX}>
        <Typography variant={"subtitle1"} sx={promotionMessageSX}>
          Find the greatest talent in Europe and beyond!
        </Typography>
        <Box id={"user-text-input-wrapper"} sx={userTextInputWrapperSX}>
          <AuthTextField id={"full-name"} label={"Full Name"} type={"test"} setText={setName}
            formValidator={{...formValidatorSketch, field: "fullName"}} disabled={disableForm}
          />
          <AuthTextField id={"email"} label={"Company Email"} type={"email"} setText={setEmail}
            formValidator={{...formValidatorSketch, field: "email"}} disabled={disableForm}
          />
          <Autocomplete
              freeSolo
              onInputChange={handleCompanyAutocomplete}
              autoHighlight
              getOptionLabel={(option: string | CompanyData) => (option as CompanyData).name }
              renderInput={(params: AutocompleteRenderInputParams) =>
                  <TextField
                    {...params}
                    label={"Company"}
                    required
                    fullWidth
                    size={"small"}
                    type={"text"}
                    error={Boolean(registerFV.company)}
                    disabled={disableForm}
                    helperText={!registerFV.company ? "" : registerFV.company}
                    sx={companyAutocompleteSX} />
              }
              renderOption={(props, option: CompanyData, state: AutocompleteRenderOptionState) => (
                  <Box component={"li"} {...props} sx={companyListItemSX}>
                    <img
                        src={CompanyDataService.getCompanyImageURL(option.name, "S")}
                        alt={"cannot load image"}
                        loading={"lazy"}
                    />
                    { option.name }
                  </Box>
              )}
              options={registeredCompanies}
          />
          <Box id={"password-wrapper"} sx={passwordWrapperSX}>
            <AuthTextField id={"password"} label={"Password"} type={"password"} setText={setPassword}
              formValidator={{...formValidatorSketch, field: "password"}} disabled={disableForm}
            />
            <AuthTextField id={"confirm-password"} label={"Confirm Password"} type={"password"} setText={setCPassword}
              formValidator={{...formValidatorSketch, field: "cpassword"}} disabled={disableForm}
            />
            <AuthenticationPasswordTooltip />
          </Box>
          <LoadingButton id={"request-account"} variant={"contained"} loading={disableForm} size={"small"}
            onClick={handleRequestAccount} sx={{textTransform: "none"}}>
            Request Account
          </LoadingButton>
        </Box>
      </Box>
  );
}

export default RegisterRecruiterForm;
