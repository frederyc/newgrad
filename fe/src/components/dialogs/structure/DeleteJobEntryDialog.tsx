import {Box, Dialog, DialogContent, IconButton, Palette, Typography, useTheme} from "@mui/material";
import WindowDimensions from "../../../types/interfaces/WindowDimensions";
import useWindowDimensions from "../../../hooks/useWindowDimensions";
import CompanyDataService from "../../../services/CompanyDataService";
import CancelIcon from '@mui/icons-material/Cancel';
import {LoadingButton} from "@mui/lab";
import {
  companyNameSX,
  deleteJobEntryDialogContentSX,
  jobDetailsSX,
  jobTitleSX,
  logoImgSX
} from "../styling/DeleteJobEntryDialogSX";
import react, {useContext, useState} from "react";
import {GlobalAlertType} from "../../../types/types/GlobalAlertType";
import GlobalAlertContext from "../../../contexts/GlobalAlertContext";
import JobEntryService from "../../../services/JobEntryService";
import {AxiosError} from "axios";
import {Location, NavigateFunction, useLocation, useNavigate} from "react-router-dom";
import {BrowseJobEntryData} from "../../../types/types/BrowseJobEntryData";

type DeleteJobEntryDialogParams = {
  isOpen: boolean,
  onClose: (...args: any[]) => any,
  jobEntry: BrowseJobEntryData
}

const DeleteJobEntryDialog = (p: DeleteJobEntryDialogParams) => {
  const wd: WindowDimensions = useWindowDimensions();
  const palette: Palette = useTheme().palette;
  const logoUrl: string = CompanyDataService.getCompanyImageURL(p.jobEntry.companyName, "L");
  const globalAlertContext: react.Dispatch<GlobalAlertType> = useContext(GlobalAlertContext)!;
  const [loading, setLoading] = useState<boolean>(false);
  const nav: NavigateFunction = useNavigate();
  const location: Location = useLocation();
  const params: URLSearchParams = new URLSearchParams(location.search);

  const handleOnDelete = async () => {
    setLoading(true);
    try {
      const response = await JobEntryService.deleteJob(p.jobEntry);
      globalAlertContext({
        severity: "success",
        title: "Success",
        message: "Job entry has been deleted",
        open: true
      } as GlobalAlertType);
    } catch (e: any) {
      if (e instanceof AxiosError) {
        globalAlertContext({
          severity: "error",
          title: e.code!,
          message: e.message,
          open: true
        } as GlobalAlertType);
      }
    }
    setLoading(false);
    p.onClose();
    nav(`/browse${params.toString() !== "" ? `?${params.toString()}` : ""}`);
    window.location.reload();
  }

  return (
      <Dialog
          id={"delete-job-entry-dialog"}
          fullWidth={true}
          open={p.isOpen}
          maxWidth={wd.width <= 1000 ? false : "sm"}
          onClose={p.onClose}>
        <DialogContent sx={deleteJobEntryDialogContentSX}>
          <Box id={"job-details"} sx={jobDetailsSX}>
            <img src={logoUrl} alt={"cannot load image"} style={logoImgSX} />
            <Box id={"job-title-company"} sx={{width: "100%"}}>
              <Typography variant={"h6"} noWrap sx={companyNameSX(palette)}>{p.jobEntry.companyName}</Typography>
              <Typography variant={"subtitle1"} noWrap sx={jobTitleSX(palette)}>{p.jobEntry.title}</Typography>
            </Box>
            <IconButton onClick={p.onClose} children={
              <CancelIcon sx={{color: palette.primary.main}} />
            }/>
          </Box>
          <Typography variant={"subtitle1"}>
            Are you sure you want to delete this job entry?
          </Typography>
          <LoadingButton loading={loading} variant={"contained"} onClick={handleOnDelete}>Delete</LoadingButton>
        </DialogContent>
      </Dialog>
  );
}

export default DeleteJobEntryDialog;
