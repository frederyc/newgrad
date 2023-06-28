import react, {useContext, useState} from "react";
import {
  Box, Button,
  FormControl,
  InputLabel,
  MenuItem,
  Palette,
  Select,
  SelectChangeEvent,
  TextField,
  useTheme
} from "@mui/material";
import React from "react";
import {
  reportDescriptionSX,
  reportJobFormInnerSX,
  reportJobFormSX,
  reportReasonSX,
  submitReportSX
} from "../styling/ReportJobFormSX";
import JobReportService from "../../../services/JobReportService";
import {JobReportType} from "../../../types/types/JobReportType";
import UserDataService from "../../../services/UserDataService";
import {AxiosError} from "axios";
import {GlobalAlertType} from "../../../types/types/GlobalAlertType";
import GlobalAlertContext from "../../../contexts/GlobalAlertContext";
import {LoadingButton} from "@mui/lab";

const reportReasons: string[] = [
  "Job does not comply with website's policy (ex: 4+ yoe required)",
  "Job is no longer available",
  "Job has incorrect details",
  "It's spam, scam or promotional",
  "It's discriminatory or offensive",
  "Other (mention in the description section)"
]

type ReportJobFormParams = {
  jobId: string,
  onClose: (...args: any[]) => any,
}

const ReportJobForm = (p: ReportJobFormParams) => {
  const palette: Palette = useTheme().palette;
  const globalAlertContext: react.Dispatch<GlobalAlertType> = useContext(GlobalAlertContext)!;
  const [reason, setReason] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [disableForm, setDisableForm] = useState<boolean>(false);

  const handleReasonChange = (event: SelectChangeEvent) => setReason(event.target.value as string);
  const handleSubmitReport = async () => {
    try {
      setDisableForm(true);
      const response = await JobReportService.save({
        jobId: p.jobId,
        posterUsername: UserDataService.getUserDataLocal().username,
        reason: reason,
        message: message
      } as JobReportType);
    } catch (e: any) {
      if (e instanceof AxiosError) {
        globalAlertContext({
          severity: "error",
          title: e.code,
          message: e.response!.data.substring(4),
          open: true
        } as GlobalAlertType);
      }
      console.log(e);
      setDisableForm(false);
      return;
    }

    globalAlertContext({
      severity: "success",
      title: "Success",
      message: "Job reported successfully",
      open: true
    } as GlobalAlertType);
    setDisableForm(false);
    p.onClose();
  }

  return (
    <Box id={"report-job-form"} sx={reportJobFormSX}>
      <Box id={"report-job-form-inner"} sx={reportJobFormInnerSX}>
        <FormControl id={"report-reason"} fullWidth required size={"small"} sx={reportReasonSX(palette)}>
          <InputLabel>Reason</InputLabel>
          <Select value={reason} onChange={handleReasonChange} label={"Reason"} disabled={disableForm}>
            {
              reportReasons.map(x => <MenuItem value={x}>{x}</MenuItem>)
            }
          </Select>
        </FormControl>
        <TextField id={"report-description"} variant={"outlined"} label={"Description"} required multiline rows={5}
          onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setMessage(e.target.value)}
          disabled={disableForm} sx={reportDescriptionSX(palette)}/>
      </Box>
      <LoadingButton id={"submit-report"} loading={disableForm}
        fullWidth variant={"contained"} size={"small"} onClick={handleSubmitReport}
        disabled={reason === "" || message === "" || disableForm} sx={submitReportSX}>
        Submit report
      </LoadingButton>
    </Box>
  );
}

export default ReportJobForm;
