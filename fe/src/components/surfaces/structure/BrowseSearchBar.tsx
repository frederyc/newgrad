import react, {useEffect, useState} from "react";
import {
  Autocomplete,
  AutocompleteRenderInputParams,
  Box, InputAdornment, Palette,
  TextField, useTheme,
} from "@mui/material";
import React from "react";
import SearchTextField from "../../inputs/structure/SearchTextField";
import SearchIcon from '@mui/icons-material/Search';
import PlaceIcon from '@mui/icons-material/Place';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SquareIconButton from "../../buttons/structure/SquareIconButton";

import {
  actionButtonsWrapperSX,
  browseSearchBarSX, locationFieldSX,
  searchInputsWrapperSX
} from "../styling/BrowseSearchBarSX";
import FilterJobsMenu from "../../menus/structure/FilterJobsMenu";
import {Location, NavigateFunction, useLocation, useNavigate} from "react-router-dom";
import URLBuilderService from "../../../services/URLBuilderService";
import {locations} from "../../../resources/Constants";
import ChromaticsService from "../../../services/ChromaticsService";

const BrowseSearchBar = () => {
  const nav: NavigateFunction = useNavigate();
  const loc: Location = useLocation();
  const palette: Palette = useTheme().palette;

  const [search, setSearch] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [openFilter, setOpenFilter] = useState<boolean>(false);

  const [workTime, setWorkTime] = useState<string[]>([]);
  const [workArrangement, setWorkArrangement] = useState<string[]>([]);
  const [educationLevel, setEducationLevel] = useState<string[]>([]);
  const [seniorityLevel, setSeniorityLevel] = useState<string[]>([]);

  const openFilterMenu = () => setOpenFilter(true);
  const closeFilterMenu = () => {
    setOpenFilter(false);
    nav(URLBuilderService.buildBrowseURL(buildURLSearchParams()));
  }
  const handleOnSearchButton = () => {
    nav(URLBuilderService.buildBrowseURL(buildURLSearchParams()));
  };

  const buildURLSearchParams = (): URLSearchParams => {
    const params: URLSearchParams = new URLSearchParams(loc.search);
    if (search !== "")
      params.set("search", search);
    else
      params.delete("search");
    if (location !== "")
      params.set("location", location);
    else
      params.delete("location");
    if (workTime.length > 0)
      params.set("workTimes", workTime.join(","));
    else
      params.delete("workTimes");
    if (workArrangement.length > 0)
      params.set("workArrangements", workArrangement.join(","));
    else
      params.delete("workArrangements");
    if (seniorityLevel.length > 0)
      params.set("seniorityLevels", seniorityLevel.join(","));
    else
      params.delete("seniorityLevels");
    if (educationLevel.length > 0)
      params.set("educationLevels", educationLevel.join(","));
    else
      params.delete("educationLevels");

    return params;
  }

  useEffect(() => {
    const params: URLSearchParams = new URLSearchParams(loc.search);
    setSearch(params.get("search") ?? "");
    setLocation(params.get("location") ?? "");
    setWorkTime(!params.get("workTimes") ? [] : params.get("workTimes")!.split(","));
    setWorkArrangement(!params.get("workArrangements") ? [] : params.get("workArrangements")!.split(","));
    setEducationLevel(!params.get("educationLevels") ? [] : params.get("educationLevels")!.split(","));
    setSeniorityLevel(!params.get("seniorityLevels") ? [] : params.get("seniorityLevels")!.split(","));
    // Empty return, so when you switch page, the above code won't be executed
    return;
  }, [loc.search]);

  const handleOnChangeLocation = (event: react.SyntheticEvent, value: string | null) => setLocation(value ?? "");

  return (
      <Box id={"browse-search-bar"} sx={browseSearchBarSX}>
        <Box id={"search-inputs-wrapper"} sx={searchInputsWrapperSX}>
          <SearchTextField placeHolder={"Search jobs"} inputType={"search"} icon={<SearchIcon />} value={search} setValue={setSearch} />
          <Autocomplete
              freeSolo={false}
              autoHighlight
              fullWidth
              size={"small"}
              sx={{
                padding: "0px",
                margin: "0px"
              }}
              onChange={handleOnChangeLocation}
              value={location}
              renderInput={(params: AutocompleteRenderInputParams) =>
                <TextField
                    {...params}
                    fullWidth
                    placeholder={"Search location"}
                    size={"small"}
                    type={"text"}
                    InputProps={{
                      ...params.InputProps,
                      startAdornment: (
                          <InputAdornment position="start" sx={{color: palette.text.secondary,}}>
                            <PlaceIcon />
                          </InputAdornment>
                      ),
                    }}
                    sx={locationFieldSX(palette)}
                />
              }
              options={locations} />
        </Box>
        <Box id={"action-buttons-wrapper"} sx={actionButtonsWrapperSX}>
          <SquareIconButton icon={<FilterAltIcon />} onClick={openFilterMenu} variant={"theme1"} />
          <FilterJobsMenu
              isOpen={openFilter}
              onOpen={openFilterMenu}
              onClose={closeFilterMenu}
              workTime={workTime}
              workArrangement={workArrangement}
              educationLevels={educationLevel}
              seniorityLevel={seniorityLevel}
              setWorkTime={setWorkTime}
              setWorkArrangement={setWorkArrangement}
              setEducationLevels={setEducationLevel}
              setSeniorityLevel={setSeniorityLevel}
          />
          <SquareIconButton icon={<SearchIcon />} onClick={handleOnSearchButton} variant={"primary"} />
        </Box>
      </Box>
  )
}

export default BrowseSearchBar;
