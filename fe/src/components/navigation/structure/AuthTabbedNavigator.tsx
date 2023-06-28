import React from "react";
import {Box, Typography} from "@mui/material";
import {tabbedNavigatorSX, tabJobSeekerSX, tabNameSX, tabRecruiterSX, tabsSX} from "../styling/AuthTabbedNavigatorSX";

export enum TAB_FORM {
  JOB_SEEKER,
  RECRUITER
}

type AuthTabbedNavigatorParams = {
  tab: TAB_FORM,
  setTab: React.Dispatch<React.SetStateAction<TAB_FORM>>
}

const AuthTabbedNavigator = (params: AuthTabbedNavigatorParams) => {
  const [tab, setTab] = [params.tab, params.setTab];

  return <Box id={"tabbed-navigator"} sx={tabbedNavigatorSX}>
    <Box id={"tabs"} sx={tabsSX}>
      <Box id={"tab-job-seeker"} onClick={() => setTab(TAB_FORM.JOB_SEEKER)}
           sx={tabJobSeekerSX(tab)}>
        <Typography id={"tab-name"} variant={"h6"} sx={tabNameSX(tab == TAB_FORM.JOB_SEEKER)}>
          Job Seeker
        </Typography>
      </Box>
      <Box id={"tab-recruiter"} onClick={() => setTab(TAB_FORM.RECRUITER)} sx={tabRecruiterSX(tab)}>
        <Typography id={"tab-name"} variant={"h6"} sx={tabNameSX(tab == TAB_FORM.RECRUITER)}>
          Recruiter
        </Typography>
      </Box>

    </Box>
  </Box>;
}

export default AuthTabbedNavigator;
