import react from "react";
import {Menu} from "@mui/material";

type JobCardMenuParams = {
  jobId: string,
  anchorEl: HTMLElement | null,
  children: react.ReactNode[],
  onClose: (...args: any[]) => any
}

/**
 * This menu is used by the job card to display multiple menus, like 'save job', 'report job', etc
 */
const JobEntryMenu = (params: JobCardMenuParams) => {
  return (
      <Menu
          id={"job-entry-menu"}
          anchorEl={params.anchorEl}
          open={params.anchorEl != null}
          onClose={params.onClose}
          sx={{width: 320, maxWidth: '100%'}}>
        {params.children}
      </Menu>
  );
}

export default JobEntryMenu;
