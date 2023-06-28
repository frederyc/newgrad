import react from "react";
import {ListItemIcon, ListItemText, MenuItem, Typography} from "@mui/material";

type JobCardMenuItemParams = {
  jobId: string,
  icon: react.ReactNode,
  text: string,
  additionalText?: string,
  onClick: (...args: any[]) => any,
  disabled?: boolean
}

const JobEntryMenuItem = (p: JobCardMenuItemParams) => {
  return (
      <MenuItem id={"job-entry-menu-item"} onClick={p.onClick} disabled={p.disabled}>
        <ListItemIcon>
          { p.icon }
        </ListItemIcon>
        <ListItemText>
          { p.text }
        </ListItemText>
        {
          p.additionalText
              ? <Typography variant={"body2"}>{ p.additionalText }</Typography>
              : <></>
        }
      </MenuItem>
  );
}

export default JobEntryMenuItem;
