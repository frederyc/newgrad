import react from "react";
import {FormControlLabel, FormLabel, Palette, Radio, RadioGroup, useTheme} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import {styledRadioGroupSX} from "../styling/StyledRadioGroupSX";
import {FormValidator, PostJobFVE} from "../../../types/types/FormValidationErrorTypes";

type styledRadioGroupParams = {
  groupTitle: string,
  options: string[],
  defaultValue?: string,
  setSelectedValue: react.Dispatch<react.SetStateAction<any>>,
  value: any,
  formValidator?: FormValidator<PostJobFVE>,
  required?: boolean,
  disabled?: boolean
}

const StyledRadioGroup = (p: styledRadioGroupParams) => {
  const palette: Palette = useTheme().palette;

  const getRadioGroupId = (): string => {
    const words: string[] = p.groupTitle.split(" ");
    let res = "";
    for (let word of words)
      res += `${word.toLowerCase()}-`
    return res.substring(0, res.length - 1);
  }

  const onChange = (e: react.ChangeEvent<HTMLInputElement>) => {
    if (p.formValidator && p.formValidator.fv[p.formValidator.field])
      p.formValidator.setFV({
        ...p.formValidator.fv,
        [p.formValidator.field]: null
      });
    p.setSelectedValue(e.target.value);
  }

  return (
      <FormControl sx={styledRadioGroupSX(palette, Boolean(p.formValidator && p.formValidator.fv[p.formValidator.field]))}>
        <FormLabel id={getRadioGroupId()} required={p.required}>{p.groupTitle}</FormLabel>
        <RadioGroup
            aria-labelledby={getRadioGroupId()} defaultValue={p.defaultValue ?? ""}
            onChange={onChange} value={p.value}
            name={`${getRadioGroupId()}-radio-group`}>
          {
            p.options.map(x =>
                <FormControlLabel value={x} control={
                  <Radio disableRipple disabled={p.disabled} size={"small"} />
                } label={x} />
            )
          }
        </RadioGroup>
      </FormControl>
  );
}

export default StyledRadioGroup;
