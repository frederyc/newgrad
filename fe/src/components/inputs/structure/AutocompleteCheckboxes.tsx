import react, {SyntheticEvent, useState} from "react";
import {
  Autocomplete,
  AutocompleteRenderInputParams, Checkbox,
  Palette, Paper,
  TextField, useTheme
} from "@mui/material";
import {autocompleteCheckboxesSX, paperComponentSX} from "../styling/AutocompleteCheckboxesSX";

type AutocompleteCheckboxesParams = {
  name: string,
  options: string[],
  selectedOptions: string[],
  setSelectedOptions: react.Dispatch<react.SetStateAction<string[]>>,
  variant: "theme1" | "theme2"
}

/**
 * name: the name of the autocomplete box
 * options: the available options the user can choose from
 * selectedOptions: the currently selected options, coming from other component, stateful variable
 * setSelectedOptions: the setter for the above
 */
const AutocompleteCheckboxes = (p: AutocompleteCheckboxesParams) => {
  const palette: Palette = useTheme().palette;

  const handleChange = (e: SyntheticEvent, nv: string[]) => {
    e.stopPropagation();
    p.setSelectedOptions(nv);
  }

  // I spent 2.5h trying to find out how to change the background color of the dropdown menu, DON'T TOUCH IT!
  return (
      <Autocomplete
          multiple
          id="checkboxes-tags-demo"
          options={p.options}
          sx={autocompleteCheckboxesSX(palette, p.variant)}
          disableCloseOnSelect
          PaperComponent={({ children }) => (
              <Paper style={paperComponentSX(palette, p.variant)}>{children}</Paper>
          )}
          getOptionLabel={(option) => option}
          onChange={handleChange}
          value={p.selectedOptions}
          renderOption={(props, option) => (
              <li {...props}>
                <Checkbox
                    style={{ marginRight: 8 }}
                    checked={p.selectedOptions.includes(option)}
                />
                {option}
              </li>
          )}
          renderInput={(prs: AutocompleteRenderInputParams) => (
              <TextField {...prs} label={p.name} size={"small"} />
          )}
      />
  );
}

export default AutocompleteCheckboxes;
