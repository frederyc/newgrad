import {Palette, Tooltip, Typography, useTheme} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import {postJobFormSalaryTooltipIconSX} from "../styling/PostJobFormSalaryTooltipSX";

const PostJobFormSalaryTooltip = () => {
  const palette: Palette = useTheme().palette;

  return (
      <Tooltip placement={"top"} title={<Typography variant={"body2"}>Yearly, gross salary</Typography>}>
        <InfoIcon sx={postJobFormSalaryTooltipIconSX(palette)} />
      </Tooltip>
  );
}

export default PostJobFormSalaryTooltip
