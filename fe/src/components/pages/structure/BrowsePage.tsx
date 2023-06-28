import react, {useContext, useRef} from "react";
import {Box, CircularProgress, Palette, Typography, useTheme} from "@mui/material";
import JobEntryCard from "../../cards/structure/JobEntryCard";
import {browsePageSX, browsePageWrapperSX, noJobsText} from "../styling/BrowsePageSX";
import {useEffect, useState} from "react";
import WindowDimensions from "../../../types/interfaces/WindowDimensions";
import useWindowDimensions from "../../../hooks/useWindowDimensions";
import JobEntryService from "../../../services/JobEntryService";
import {AxiosError} from "axios";
import {GlobalAlertType} from "../../../types/types/GlobalAlertType";
import GlobalAlertContext from "../../../contexts/GlobalAlertContext";
import {Location, NavigateFunction, useLocation, useNavigate} from "react-router-dom";
import TopBarContext from "../../../contexts/TopBarContext";
import BrowseSearchBar from "../../surfaces/structure/BrowseSearchBar";
import AuthenticationService from "../../../services/AuthenticationService";
import JobEntryDialog from "../../dialogs/structure/JobEntryDialog";
import JobEntriesContext from "../../../contexts/JobEntriesContext";
import ReportJobDialog from "../../dialogs/structure/ReportJobDialog";
import {BrowseJobEntryData} from "../../../types/types/BrowseJobEntryData";

const widths: number[] = [1468, 1172, 876, 580]

/**
 * This variable type is used to keep job entries filtering data. It's used when the user click a job entry, to NOT make
 * a new browse request, even tho the url changes, it just adds the id of the new job (so the end user could share the
 * job to someone else)
 */
type FiltersType = {
  search: string | null,
  location: string | null,
  workTimes: string | null,
  workArrangements: string | null,
  seniorityLevels: string | null,
  educationLevels: string | null
}

const BrowsePage = () => {
  const [browsePageWrapperWidth, setBrowsePageWrapperWidth] = useState<number>(0);
  const wd: WindowDimensions = useWindowDimensions();
  const palette: Palette = useTheme().palette;
  const [jobEntries, setJobEntries] = useState<BrowseJobEntryData[] | null>(null);
  const nav: NavigateFunction = useNavigate();
  const loc: Location = useLocation();
  const globalAlertContext: react.Dispatch<GlobalAlertType> = useContext(GlobalAlertContext)!;
  const topBarContext: react.Dispatch<react.ReactNode> = useContext(TopBarContext)!;
  const urlSearchParams: URLSearchParams = new URLSearchParams(loc.search);
  const prevFilters: react.MutableRefObject<FiltersType | null> = useRef<FiltersType | null>(null);

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
    topBarContext(<BrowseSearchBar />);
    return;
  }, []);

  useEffect(() => {
    const newFilters: FiltersType = {
      search: urlSearchParams.get("search"),
      location: urlSearchParams.get("location"),
      workTimes: urlSearchParams.get("workTimes"),
      workArrangements: urlSearchParams.get("workArrangements"),
      seniorityLevels: urlSearchParams.get("seniorityLevels"),
      educationLevels: urlSearchParams.get("educationLevels")
    } as FiltersType;

    const runAsync = async () => {
      if (jobEntries)
        setJobEntries(null);
      try {
        const response = await JobEntryService.getJobs(urlSearchParams);
        setJobEntries(response as BrowseJobEntryData[]);
      } catch (e: any) {
        if (e instanceof AxiosError) {
          const alertData: GlobalAlertType = {
            severity: "error",
            title: e.code!,
            message: e.response!.data.substring(4),  // the substring is to get rid of http status code
            open: true
          }
          globalAlertContext(alertData);
          setJobEntries([]);
          if (e.response!.data.substring(4) === "Unauthorized") {
            await AuthenticationService.signOut();
            nav("/authentication");
          }
        }
      }
    }

    /**
     * When a user clicks on a job entry to expand it, it will add the id to the url. Why? To be shareable, of course.
     * This piece of code stops the rerender, because the url changes, but know the browse query, so that would mean
     * we would reload the jobs we browse both when we expand a job and when we close it. Unnecessary HTTP req avoided
     */
    if (!prevFilters.current || !compare(prevFilters.current, newFilters)) {
      runAsync();
      prevFilters.current = newFilters;
    }

    return;
  }, [loc.search]);

  /**
   * Why do we have this? Well, JS is dumb enough that comparing two elements of the same type will return false. EVEN
   * comparing their JSON.stringify version returns, SOMEHOW false. So this is the safe choice
   * @param p1
   * @param p2
   */
  const compare = (p1: FiltersType, p2: FiltersType): boolean => {
    return p1.search === p2.search && p1.location === p2.location && p1.workTimes === p2.workTimes &&
        p1.workArrangements === p2.workArrangements && p1.seniorityLevels === p2.seniorityLevels &&
        p1.educationLevels === p2.educationLevels;
  }

  return (
    <Box id={"browse-page"} sx={browsePageSX}>
      <Box id={"browse-page-wrapper"} sx={browsePageWrapperSX(browsePageWrapperWidth)}>
        {
          !jobEntries
              ? <CircularProgress />
              : (jobEntries.length === 0
                  ? <Typography id={"no-jobs-text"} variant={"h2"} sx={noJobsText(palette)}>No jobs to show</Typography>
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
            ? <Typography id={"no-more-jobs-text"} variant={"h2"} sx={noJobsText(palette)}>No more jobs to show</Typography>
            : <></>
      }
      <JobEntryDialog />
      <JobEntriesContext.Provider value={jobEntries}>
        <ReportJobDialog />
      </JobEntriesContext.Provider>
    </Box>
  );
}

export default BrowsePage;
