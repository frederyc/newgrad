import {Tooltip} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import {authenticationJobSeekerEmailTooltipSX} from "../styling/AuthenticationJobSeekerEmailTooltipSX";

const AuthenticationJobSeekerEmailTooltip = () => {
  return (
      <a href={"https://www.topuniversities.com/university-rankings/world-university-rankings/2023"} target={"_blank"}>
        <Tooltip title={"Click here to see the list of universities we accept emails from"} placement={"top"}>
          <InfoIcon sx={authenticationJobSeekerEmailTooltipSX}/>
        </Tooltip>
      </a>
  );
}

export default AuthenticationJobSeekerEmailTooltip;
