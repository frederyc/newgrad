import {Box, CircularProgress, Palette, Typography, useTheme} from "@mui/material";
import react, {useContext, useEffect, useState} from "react";
import {BrowseJobEntryData} from "../../../types/types/BrowseJobEntryData";
import JobEntryService from "../../../services/JobEntryService";
import {GlobalAlertType} from "../../../types/types/GlobalAlertType";
import GlobalAlertContext from "../../../contexts/GlobalAlertContext";
import AuthenticationService from "../../../services/AuthenticationService";
import {NavigateFunction, useNavigate} from "react-router-dom";
import JobEntryCard from "../../cards/structure/JobEntryCard";
import WindowDimensions from "../../../types/interfaces/WindowDimensions";
import useWindowDimensions from "../../../hooks/useWindowDimensions";
import TopBarContext from "../../../contexts/TopBarContext";
import {noJobsTextSX, postedJobsPageSX, postedJobsPageWrapperSX} from "../styling/PostedJobsPageSX";
import JobEntryDialog from "../../dialogs/structure/JobEntryDialog";

const widths: number[] = [1468, 1172, 876, 580]

const PostedJobsPage = () => {
  const [browsePageWrapperWidth, setBrowsePageWrapperWidth] = useState<number>(0);
  const [jobEntries, setJobEntries] = useState<BrowseJobEntryData[] | null>(null);
  const globalAlertContext: react.Dispatch<GlobalAlertType> = useContext(GlobalAlertContext)!;
  const nav: NavigateFunction = useNavigate();
  const wd: WindowDimensions = useWindowDimensions();
  const palette: Palette = useTheme().palette;
  const topBarContext: react.Dispatch<react.ReactNode> = useContext(TopBarContext)!;

  /**
   * Why do we have ths whole thing? Well, we want to have jobs arranged in a grid-like way, but also wrap. For example,
   * a big screen may allow 5 job entries to be displayed on a row, but a smaller one could afford only 3. The code
   * bellow sets the width of the wrapper that wraps the job entries. We know that (on desktop) the sidebar menu is 15%
   * of the total desktop width, that's why we take the whole screen width and multiply with 0.85. We also know that the
   * padding is set to 60px (left + right = 120). We have an array of widths, where each element follows the rule:
   * f(n) => n * 280 + (n-1) * 16, where n is supposedly a job card. Widths equals [f(5), f(4), f(3), f(2)]
   * We do this so that we can have the elements aligned to the center of possible, while starting from the left. For
   * ex,if we need to display 6 jobs and the maximum number of jobs on a row is 4, just by using 'alignItems: center' in
   * css, we will have the elements aligned like this:
   * #### #### #### ####
   *      #### ####
   */
  useEffect(() => {
    if (wd.width > 1000)
      setBrowsePageWrapperWidth(widths.find(x => x < (0.85 * wd.width - 120))!.valueOf());
  }, [wd]);

  useEffect(() => {
    topBarContext(<></>);
    return;
  }, []);

  useEffect(() => {
    const runAsync = async () => {
      try {
        const response = await JobEntryService.getUserPostedJobs();
        setJobEntries(response as BrowseJobEntryData[]);
      } catch (e: any) {
        globalAlertContext({
          severity: "error",
          title: e.code!,
          message: e.response!.data.substring(4),
          open: true
        } as GlobalAlertType);
        setJobEntries([]);
        if (e.response!.data.substring(4) === "Unauthorized") {
          await AuthenticationService.signOut();
          nav("/authentication");
        }
      }
    }
    runAsync();
  }, []);

  return (
    <Box id={"posted-jobs-page"} sx={postedJobsPageSX}>
      <Box id={"posted-jobs-page-wrapper"} sx={postedJobsPageWrapperSX(browsePageWrapperWidth)}>
        {
          !jobEntries
              ? <CircularProgress />
              : (jobEntries.length === 0
                  ? <Typography id={"no-jobs-text"} variant={"h2"} sx={noJobsTextSX(palette)}>No jobs to show</Typography>
                  : jobEntries.map(x => <JobEntryCard
                      id={x.id}
                      ownerUsername={x.ownerUsername}
                      companyName={x.companyName}
                      title={x.title}
                      location={x.location}
                      description={x.description}
                      salary={x.salary}
                      salaryCurrency={x.salaryCurrency}
                      tags={x.tags} />
                    )
                )
        }
      </Box>
      {
        jobEntries && jobEntries.length > 0
            ? <Typography id={"no-more-jobs"} variant={"h2"} sx={noJobsTextSX(palette)}>No more jobs to show</Typography>
            : <></>
      }
      <JobEntryDialog />
    </Box>
  );
}

export default PostedJobsPage;
