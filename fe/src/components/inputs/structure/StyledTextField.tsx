import react from "react";
import {FormControl, OutlinedInput, Palette, Typography, useTheme} from "@mui/material";
import {styledTextFieldSX} from "../styling/StyledTextFieldSX";
import {FormValidator, PostJobFVE} from "../../../types/types/FormValidationErrorTypes";

type StyledTextFieldParams = {
  id?: string,
  placeHolder?: string,
  value: string,
  setValue: react.Dispatch<react.SetStateAction<string>>,
  onKeyDown?: (e: react.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => any,
  onKeyUp?: (e: react.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => any,
  formValidator?: FormValidator<PostJobFVE>,
  disabled?: boolean,
  inputType?: "text" | "number"
}

const StyledTextField = (params: StyledTextFieldParams) => {
  const palette: Palette = useTheme().palette;

  const onChange = (e: react.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (params.formValidator && params.formValidator.fv[params.formValidator.field])
      params.formValidator.setFV({
        ...params.formValidator.fv,
        [params.formValidator.field]: null
      });
    params.setValue(e.target.value);
  }

  return (
      <FormControl id={"styled-text-field"} fullWidth={true} size={"small"} sx={styledTextFieldSX(palette)}>
        <OutlinedInput
            id="outlined-adornment-amount" placeholder={params.placeHolder} type={params.inputType ?? "text"}
            value={params.value} onChange={onChange} onKeyDown={params.onKeyDown} onKeyUp={params.onKeyUp}
            disabled={params.disabled} error={params.formValidator && Boolean(params.formValidator.fv[params.formValidator.field])}
        />
        {
          params.formValidator
            ? <Typography id={"error-message"} variant={"body2"}>
                {params.formValidator.fv[params.formValidator.field]}
              </Typography>
            : <></>
        }
      </FormControl>
  );
}

export default StyledTextField;
