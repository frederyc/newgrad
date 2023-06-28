import react, {useContext, useEffect, useState} from "react";
import {
  Box, CircularProgress,
  Dialog,
  DialogContent, IconButton,
  Palette, Typography, useTheme
} from "@mui/material";
import ReportJobForm from "../../forms/structure/ReportJobForm";
import WindowDimensions from "../../../types/interfaces/WindowDimensions";
import useWindowDimensions from "../../../hooks/useWindowDimensions";
import React from "react";
import {JobEntryData} from "../../../types/types/JobEntryData";
import CancelIcon from '@mui/icons-material/Cancel';
import {
  cancelIconSX,
  companyNameSX,
  jobDetailsSX,
  jobTitleSX,
  logoImgSX, reportJobDialogContentLoadingSX,
  reportJobDialogContentSX
} from "../styling/ReportJobDialogSX";
import JobEntriesContext from "../../../contexts/JobEntriesContext";
import {Location, NavigateFunction, useLocation, useNavigate} from "react-router-dom";
import {GlobalAlertType} from "../../../types/types/GlobalAlertType";
import GlobalAlertContext from "../../../contexts/GlobalAlertContext";
import JobEntryService from "../../../services/JobEntryService";
import URLBuilderService from "../../../services/URLBuilderService";
import CompanyDataService from "../../../services/CompanyDataService";
import {BrowseJobEntryData} from "../../../types/types/BrowseJobEntryData";

const ReportJobDialog = () => {
  const palette: Palette = useTheme().palette;
  const wd: WindowDimensions = useWindowDimensions();
  const [browseJobData, setBrowseJobData] = useState<BrowseJobEntryData | JobEntryData | null>(null);
  const jobEntries: JobEntryData[] | BrowseJobEntryData[] | null = useContext(JobEntriesContext);
  const location: Location = useLocation();
  const params: URLSearchParams = new URLSearchParams(location.search);
  const nav: NavigateFunction = useNavigate();
  const globalAlertContext: react.Dispatch<GlobalAlertType> = useContext(GlobalAlertContext)!;

  useEffect(() => {
    const runAsync = async () => {
      try {
        const id: string = params.get("id")!;
        if (jobEntries) {
          setBrowseJobData(jobEntries.find(x => x.id === id) ?? await JobEntryService.getJobById(id));
        } else {
          setBrowseJobData(await JobEntryService.getJobById(id));
        }
      } catch (e: any) {
        globalAlertContext({
          severity: "error",
          title: e.code,
          message: e.response!.data.substring(4),
          open: true
        } as GlobalAlertType);
        return;
      }
    }
    if (params.get("id"))
      runAsync();
  }, [location.search]);

  const handleOnClose = () => {
    params.delete("id");
    if (location.pathname.startsWith("/browse")) {
      nav(URLBuilderService.buildBrowseURL(params));
    } else {
      nav("/saved-jobs");
    }
  }

  return (
    <Dialog id={"report-job-dialog"}
        fullWidth={true}
        maxWidth={wd.width <= 1000 ? false : "sm"}
        open={Boolean(params.get("id")) && (location.pathname === "/browse/report" || location.pathname === "/saved-jobs/report")}
        onClose={handleOnClose}>
      {
        !browseJobData
            ? <DialogContent sx={reportJobDialogContentLoadingSX}>
                <CircularProgress />
              </DialogContent>
           : <DialogContent sx={reportJobDialogContentSX}>
              <Box id={"job-details"} sx={jobDetailsSX}>
                <img src={CompanyDataService.getCompanyImageURL(browseJobData!.companyName, "L")} alt={"cannot load image"}
                     style={logoImgSX} />
                <Box id={"job-title-company"} sx={{width: "100%"}}>
                  <Typography variant={"h6"} noWrap sx={companyNameSX(palette)}>{ browseJobData!.companyName }</Typography>
                  <Typography variant={"subtitle1"} noWrap sx={jobTitleSX(palette)}>{ browseJobData!.title }</Typography>
                </Box>
                <IconButton sx={cancelIconSX} onClick={handleOnClose} children={
                  <CancelIcon sx={{color: palette.primary.main}} />
                } />
              </Box>
              <ReportJobForm jobId={browseJobData!.id!} onClose={handleOnClose}  />
            </DialogContent>
      }
    </Dialog>
  );
}

export default ReportJobDialog;
