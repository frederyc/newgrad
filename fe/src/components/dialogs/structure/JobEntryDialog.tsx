import {
  Box,
  Button, CircularProgress,
  Dialog,
  DialogContent,
  IconButton, Palette,
  Typography,
  useTheme
} from "@mui/material";
import {JobEntryData} from "../../../types/types/JobEntryData";
import react, {useContext, useEffect, useState} from "react";
import JobEntryContext from "../../../contexts/JobEntryContext";
import CancelIcon from '@mui/icons-material/Cancel';
import useWindowDimensions from "../../../hooks/useWindowDimensions";
import WindowDimensions from "../../../types/interfaces/WindowDimensions";
import PlaceIcon from '@mui/icons-material/Place';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import SchoolIcon from '@mui/icons-material/School';
import StairsIcon from '@mui/icons-material/Stairs';
import BusinessIcon from '@mui/icons-material/Business';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import JobEntryTag from "../../chips/structure/JobEntryTag";
import {
  cancelIconSX,
  companyLogoSX, companyNameSX, jobEntryDialogContentLoadingSX,
  jobEntryDialogContentSX,
  jobEntryDialogSX, logoOptionsSX,
  mainContentSX, moreDetailsSX, tagsWrapperSX, titleSX, wrapperMoreJobDetailsSX
} from "../styling/JobEntryDialogSX";
import {currencies} from "../../../data/currencies";
import CompanyDataService from "../../../services/CompanyDataService";
import {Location, NavigateFunction, useLocation, useNavigate} from "react-router-dom";
import URLBuilderService from "../../../services/URLBuilderService";
import JobEntryService from "../../../services/JobEntryService";
import {AxiosError} from "axios";
import {GlobalAlertType} from "../../../types/types/GlobalAlertType";
import GlobalAlertContext from "../../../contexts/GlobalAlertContext";

const JobEntryDialog = () => {
  const palette: Palette = useTheme().palette;
  const [jobData, setJobData] = useState<JobEntryData | null>(null);
  const location: Location = useLocation();
  const params: URLSearchParams = new URLSearchParams(location.search);
  const nav: NavigateFunction = useNavigate();
  const wd: WindowDimensions = useWindowDimensions();
  const globalAlertContext: react.Dispatch<GlobalAlertType> = useContext(GlobalAlertContext)!;

  const formatSalary = (salary: number[], salaryCurrency: string): string => {
    const cs: string = currencies.find(x => x.ISO === salaryCurrency)!.symbol;    // currency symbol
    const options: Intl.NumberFormatOptions = {
      style: "decimal",
      minimumFractionDigits: 0
    }
    return `${cs} ${salary[0].toLocaleString("en-US", options)} - ${cs} ${salary[1].toLocaleString("en-US", options)}`;
  }

  const handleOnApply = () => window.open(jobData!.link, "_blank");
  const handleOnClose = () => {
    params.delete("id");
    setJobData(null);
    if (location.pathname === "/browse") {
      nav(URLBuilderService.buildBrowseURL(params));
    } else if (location.pathname === "/posted-jobs") {
      nav(URLBuilderService.buildPostedJobsURL(params));
    } else if (location.pathname === "/saved-jobs") {
      nav(URLBuilderService.buildSavedJobsURL(params));
    }
  }

  useEffect(() => {
    const runAsync = async () => {
      try {
        setJobData(await JobEntryService.getJobById(params.get("id")!));
      } catch (e: any) {
        if (e instanceof AxiosError) {
          globalAlertContext({
            severity: "error",
            title: e.code,
            message: e.response!.data.substring(4),
            open: true
          } as GlobalAlertType);
          return;
        }
      }
    }
    if (params.get("id"))
      runAsync();
  }, [location.search]);

  return (
      <Dialog id={"job-entry-dialog"}
        fullScreen={wd.width <= 1000}
        open={Boolean(params.get("id")) && (location.pathname === "/browse" || location.pathname === "/posted-jobs" || location.pathname === "/saved-jobs")}
        onClose={handleOnClose}
        maxWidth={"md"} fullWidth={true} sx={jobEntryDialogSX}>
        {
          !jobData
              ? <DialogContent sx={jobEntryDialogContentLoadingSX}>
                  <CircularProgress  />
                </DialogContent>
              : <DialogContent sx={jobEntryDialogContentSX}>
                <Box id={"logo-options"} sx={logoOptionsSX}>
                  <img src={CompanyDataService.getCompanyImageURL(jobData!.companyName, "L")} alt={"cannot load image"}
                       style={companyLogoSX} loading={"lazy"} />
                  <IconButton sx={cancelIconSX(palette)} children={<CancelIcon color={"primary"} />} onClick={handleOnClose} />
                </Box>
                <Box id={"main-content"} sx={mainContentSX}>
                  <Box id={"main-details"}>
                    <Typography variant={"h3"} sx={titleSX}>{jobData!.title}</Typography>
                    <Typography variant={"h4"} sx={companyNameSX}>{jobData!.companyName}</Typography>
                    <Box id={"wrapper-geolocation-employmentType-educationLevel-level-workArrangement-salary"}
                         sx={wrapperMoreJobDetailsSX}>
                      <JobEntryTag icon={<PlaceIcon fontSize={"small"} />} tag={jobData!.location} />
                      <JobEntryTag icon={<WorkHistoryIcon fontSize={"small"} />} tag={jobData!.workTime} />
                      <JobEntryTag icon={<SchoolIcon fontSize={"small"} />} tag={jobData!.education} />
                      <JobEntryTag icon={<StairsIcon fontSize={"small"} />} tag={jobData!.seniority} />
                      <JobEntryTag icon={<BusinessIcon fontSize={"small"} />} tag={jobData!.workArrangement} />
                      {
                        jobData.salary
                            ? <JobEntryTag
                                icon={<AccountBalanceWalletIcon fontSize={"small"}/>}
                                tag={formatSalary(jobData!.salary, jobData!.salaryCurrency!)} />
                            : <></>
                      }
                    </Box>
                  </Box>
                  <Box id={"more-details"} sx={moreDetailsSX}>
                    <Box className={"details-section-wrapper"}>
                      <Typography variant={"h4"}>Description</Typography>
                      <Typography variant={"body1"} sx={{fontSize: "0.85em"}}>
                        {jobData!.description}
                      </Typography>
                    </Box>
                    <Box className={"details-section-wrapper"} sx={{ width: "100%" }}>
                      <Typography variant={"h4"}>Responsibilities</Typography>
                      <ul style={{ margin: "0px" }}>
                        {
                          jobData!.responsibilities.map(x =>
                              <li><Typography variant={"body1"} sx={{fontSize: "0.85em"}}>{x}</Typography></li>
                          )
                        }
                      </ul>
                    </Box>
                    <Box className={"details-section-wrapper"} sx={{ width: "100%" }}>
                      <Typography variant={"h4"}>Required skills</Typography>
                      <ul style={{ margin: "0px" }}>
                        {
                          jobData!.requiredSkills.map(x =>
                              <li><Typography variant={"body1"} sx={{fontSize: "0.85em"}}>{x}</Typography></li>
                          )
                        }
                      </ul>
                    </Box>
                    {
                      jobData!.preferredSkills.length === 0
                          ? <></>
                          : <Box className={"details-section-wrapper"} sx={{ width: "100%" }}>
                            <Typography variant={"h4"}>Preferred skills</Typography>
                            <ul style={{ margin: "0px" }}>
                              {
                                jobData.preferredSkills.map(x =>
                                    <li><Typography variant={"body1"} sx={{fontSize: "0.85em"}}>{x}</Typography></li>
                                )
                              }
                            </ul>
                          </Box>
                    }
                    {
                      jobData!.benefits.length === 0
                          ? <></>
                          : <Box className={"details-section-wrapper"} sx={{ width: "100%" }}>
                            <Typography variant={"h4"}>Benefits</Typography>
                            <ul style={{ margin: "0px" }}>
                              {
                                jobData.benefits.map(x =>
                                    <li><Typography variant={"body1"} sx={{fontSize: "0.85em"}}>{x}</Typography></li>
                                )
                              }
                            </ul>
                          </Box>
                    }
                    {
                      jobData!.tags.length === 0
                          ? <></>
                          : <Box className={"details-section-wrapper"}>
                            <Typography variant={"h4"}>Tags</Typography>
                            <Box id={"tags-wrapper"} sx={tagsWrapperSX}>
                              {
                                jobData.tags.map(x => <JobEntryTag tag={x} />)
                              }
                            </Box>
                          </Box>
                    }
                  </Box>
                  <Button variant={"contained"} size={"large"} sx={{textTransform: "none"}} onClick={handleOnApply}>
                    Apply
                  </Button>
                </Box>
              </DialogContent>
        }
      </Dialog>
  )
}

export default JobEntryDialog;
