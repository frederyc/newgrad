import react from "react";
import {FormControl, InputAdornment, OutlinedInput, Palette, useTheme} from "@mui/material";
import {searchTextFieldSX} from "../styling/SearchTextFieldSX";

type SearchTextFieldParams = {
  id?: string,
  icon: react.ReactNode,
  placeHolder: string,
  inputType: string,
  value: string,
  setValue: react.Dispatch<react.SetStateAction<string>>,
}

const SearchTextField = (p: SearchTextFieldParams) => {
  const palette: Palette = useTheme().palette;

  return (
      <FormControl id={"search-text-field"} fullWidth size={"small"} sx={searchTextFieldSX(palette)}>
        <OutlinedInput
          id="outlined-adornment-amount" placeholder={p.placeHolder} type={p.inputType}
          value={p.value}
          startAdornment={
            <InputAdornment position="start" sx={{color: palette.text.secondary}}>{p.icon}</InputAdornment>
          }
          onChange={(e: react.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => p.setValue(e.target.value)}
        />
      </FormControl>
  );
};

export default SearchTextField;
