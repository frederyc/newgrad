import React from "react";
import {TextField} from "@mui/material";
import {authTextFieldSX} from "../styling/AuthTextFieldSX";
import {
  FormValidator,
  RegisterFVE,
} from "../../../types/types/FormValidationErrorTypes";

type AuthTextFieldParams = {
  id?: string,
  label: string,
  type: string,
  disabled?: boolean
  formValidator?: FormValidator<RegisterFVE>,
  setText: React.Dispatch<React.SetStateAction<string>>,
}

const AuthTextField = (params: AuthTextFieldParams) => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (params.formValidator && params.formValidator.fv[params.formValidator.field])
      params.formValidator.setFV({
        ...params.formValidator.fv,
        [params.formValidator.field]: null
      })
    params.setText(e.target.value);
  }

  return (
      <TextField id={params.id} label={params.label} variant={"outlined"} required fullWidth
          error={params.formValidator && Boolean(params.formValidator.fv[params.formValidator.field])}
          helperText={!params.formValidator ? "" : params.formValidator.fv[params.formValidator.field]}
          size={"small"} type={params.type} onChange={onChange} sx={authTextFieldSX} disabled={params.disabled}
      />
  );
}

export default AuthTextField;
