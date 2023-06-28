import react from "react";
import {MenuItem, Palette, Select, SelectChangeEvent, useTheme} from "@mui/material";
import {styleSelectSX} from "../styling/StylesSelectSX";

type StyledSelectParams = {
  values: string[],
  selectedValue: string,
  setSelectedValue: react.Dispatch<react.SetStateAction<string>>,
  disabled?: boolean
}

const StyledSelect = (p: StyledSelectParams) => {
  const palette: Palette = useTheme().palette;

  const handleChange = (ev: SelectChangeEvent) => p.setSelectedValue(ev.target.value);

  return (
      <Select id={"styled-select"} size={"small"} onChange={handleChange} disabled={p.disabled}
        value={p.selectedValue} sx={styleSelectSX(palette)}>
        { p.values.map(x => <MenuItem value={x}>{x}</MenuItem>) }
      </Select>
  );
}

export default StyledSelect;
