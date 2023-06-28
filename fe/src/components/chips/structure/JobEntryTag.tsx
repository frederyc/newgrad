import {Box, Palette, Typography, useTheme} from "@mui/material";
import react from "react";
import {captionSX, jobEntryTagSX} from "../styling/JobEntryTagSX";

type JobTagParams = {
  icon?: react.ReactNode,
  tag: string
}

const JobEntryTag = (params: JobTagParams) => {
  const palette: Palette = useTheme().palette;

  return (
    <Box id={"job-entry-tag"} sx={jobEntryTagSX(palette, params.icon)}>
      { params.icon ?? <></> }
      <Typography variant={"caption"} sx={captionSX(palette)}>{params.tag}</Typography>
    </Box>
  );
}

export default JobEntryTag;
