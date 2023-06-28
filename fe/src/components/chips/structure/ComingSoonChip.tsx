import react from "react";
import {Box, Palette, Typography, useTheme} from "@mui/material";
import TimerIcon from '@mui/icons-material/Timer';
import {comingSoonChipSX} from "../styling/ComingSoonChipSX";

const ComingSoonChip = () => {
  const palette: Palette = useTheme().palette;

  return (
      <Box id={"coming-soon-chip"} sx={comingSoonChipSX(palette)}>
        <TimerIcon />
        <Typography variant={"caption"}>COMING SOON</Typography>
      </Box>
  );
}

export default ComingSoonChip;
