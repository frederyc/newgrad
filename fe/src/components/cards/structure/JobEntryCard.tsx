import react, {useContext, useEffect, useRef, useState} from "react";
import {Box, CircularProgress, IconButton, Palette, Typography, useTheme} from "@mui/material";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import JobEntryTag from "../../chips/structure/JobEntryTag";
import WindowDimensions from "../../../types/interfaces/WindowDimensions";
import useWindowDimensions from "../../../hooks/useWindowDimensions";
import JobEntryMenu from "../../menus/structure/JobEntryMenu/JobEntryMenu";
import JobEntryMenuItem from "../../menus/structure/JobEntryMenu/JobEntryMenuItem";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ReportIcon from '@mui/icons-material/Report';
import JobEntryContext from "../../../contexts/JobEntryContext";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import {
  companyLogoSX, h6TextPrimarySX,
  sub1TextPrimarySX,
  contentHeaderSX, sub1ThemePrimarySX,
  jobEntryCardSX,
  mainDetailsSX, moreOptionsSX, contentMainSX, titleH5SX, tagsBoxSX, descriptionSub2SX
} from "../styling/JobEntryCardSX";
import CompanyDataService from "../../../services/CompanyDataService";
import {currencies} from "../../../data/currencies";
import UserDataService from "../../../services/UserDataService";
import {Location, NavigateFunction, useLocation, useNavigate} from "react-router-dom";
import DeleteJobEntryDialog from "../../dialogs/structure/DeleteJobEntryDialog";
import URLBuilderService from "../../../services/URLBuilderService";
import {tagsAbbreviations} from "../../../resources/Constants";
import {BrowseJobEntryData} from "../../../types/types/BrowseJobEntryData";
import SavedJobService from "../../../services/SavedJobService";
import {GlobalAlertType} from "../../../types/types/GlobalAlertType";
import GlobalAlertContext from "../../../contexts/GlobalAlertContext";
import {AxiosError} from "axios";

const JobEntryCard = (p: BrowseJobEntryData) => {
  const nav: NavigateFunction = useNavigate();
  const palette: Palette = useTheme().palette;
  const logoUrl: string = CompanyDataService.getCompanyImageURL(p.companyName, "L");
  const [isSaved, setIsSaved] = useState<boolean | null>(null);            // This should be updated when the job is loaded
  const jobEntryCardRef = useRef<HTMLElement>(null);                 // Read the comment above 'handleClick'
  const location: Location = useLocation();
  const params: URLSearchParams = new URLSearchParams(location.search);
  const globalAlertContext: react.Dispatch<GlobalAlertType> = useContext(GlobalAlertContext)!;
  /**
   * If not null, the options bar is open. We need to NOT catch the click on the JobCard element, it will prompt us to
   * the job dialog, which we do not want. Also, we want to have the cursor as 'default' when optionsDialog is open.
   */
  const [moreOptionsAnchorEl, setMoreOptionsAnchorEl] = useState<HTMLElement | null>(null);
  const openMoreOptionsMenu = (event: react.MouseEvent<HTMLElement>) => setMoreOptionsAnchorEl(event.currentTarget);
  const closeMoreOptionsMenu = () => setMoreOptionsAnchorEl(null);

  const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState<boolean>(false);

  /**
   * We use the hook that returns the dimensions of the screen in real time to handle the data in the header. For mobile
   * screens, we have to prioritize different fields, for example, where on desktop we have the company's name, on phone
   * we'll have the job title
   */
  const wd: WindowDimensions = useWindowDimensions();

  /**
   * This function handles the click on the job card, which will prompt the user to a dialog displaying more details
   * about the position. The if (...) below checks if the current clicked element is a direct child of the job's card
   * component tree. We have to perform this check to avoid bugs like:
   * - Clicking randomly on an open dialog that's over another job will trigger the job card's onClick() function
   * - Clicking a button in the moreOptionsMenu can trigger another job card's onClick()
   * The functionality should be placed only inside the if block for this function
   * @param e
   */
  const handleClick = (e: react.MouseEvent<HTMLDivElement>) => {
    if (jobEntryCardRef.current && jobEntryCardRef.current.contains(e.target as HTMLElement)) {
      params.set("id", p.id!);
      if (location.pathname === "/browse") {
        nav(URLBuilderService.buildBrowseURL(params));
      } else if (location.pathname === "/posted-jobs") {
        nav(URLBuilderService.buildPostedJobsURL(params));
      } else if (location.pathname === "/saved-jobs") {
        nav(URLBuilderService.buildSavedJobsURL(params));
      }
    }
  }

  // Here we handle the action that's fired when we click the 3-bullet top-right button
  const handleMoreOptions = async (e: react.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    // Since the MoreOptions button is on the JobCard, we must stop the click from propagating and open a Job dialog
    e.stopPropagation();
    openMoreOptionsMenu(e);
    try {
      setIsSaved(null);
      const response = await SavedJobService.getByQueryIndex(p.id);
      setIsSaved(Boolean(response));
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
  }

  // Handles the save action in the 'moreOptionsMenu'
  const handleOnSave = async (e: react.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setIsSaved(null);
    const newSavedValue: boolean = !isSaved;
    try {
      if (newSavedValue) {
        const response = await SavedJobService.save(p.id);
        globalAlertContext({
          severity: "success",
          title: "SUCCESS",
          message: "Job has been saved",
          open: true
        } as GlobalAlertType);
      } else {
        const response = await SavedJobService.delete(p.id);
        globalAlertContext({
          severity: "success",
          title: "SUCCESS",
          message: "Job has been unsaved",
          open: true
        } as GlobalAlertType);
      }
      setIsSaved(newSavedValue);
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
  }

  // Handlers for different options in the 'moreOptions' menu
  const handleOnOpenReportDialog = (e: react.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    closeMoreOptionsMenu();
    params.set("id", p.id!);

    nav(URLBuilderService.buildReportJobURL(params, location.pathname));
  }

  // Navigates the user to a screen where they can edit an already existing job application
  const handleOnEdit = (e: react.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    closeMoreOptionsMenu();
    nav(`/post-job/${p.id}`);
  }

  // Launched a dialog asking the owner of the job to confirm if they want to delete the entry permanently
  const handleOnDelete = (e: react.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    closeMoreOptionsMenu();
    setIsOpenDeleteDialog(true);
  }

  // Reference of the logo image, to be passed to the job dialog, in order to get the background color of the image
  const logoRef = useRef<HTMLImageElement>(null);
  const titleRef = useRef<HTMLParagraphElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  /**
   * This is a workaround I created for the height of the description text in the job entry card. The title can occupy
   * either 1 or 2 lines of text, so we somehow got to know how many. I observed that, if the text is one line, the
   * element occupies around 20px, while if it's 2, it's 40px. I've tried to use the useRef() hook, but the screen
   * renders to fast for it to catch the actual value, so here is what I've done:
   * Caught the ref in the useEffect() hook, when the component is done rendering, and update a stateful value
   * representing the height (px), of the description text.
   */
  const [descriptionHeight, setDescriptionHeight] = useState<number>(0);
  useEffect(() => setDescriptionHeight(titleRef.current!.offsetHeight < 40 ? 136 : 114), []);

  const formatSalary = (salary: number[], salaryCurrency: string): string => {
    const cs: string = currencies.find(x => x.ISO === salaryCurrency)!.symbol;    // currency symbol
    const options: Intl.NumberFormatOptions = {
      style: "decimal",
      minimumFractionDigits: 0
    }
    return `${cs} ${salary[0].toLocaleString("en-US", options)} - ${cs} ${salary[1].toLocaleString("en-US", options)}`;
  }

  // Filters the tags if more than 30 characters have been added, to not overflow the UI
  const filterTags = (tags: string[]): string[] => {
    let charCounter: number = 0;
    return tags
        .filter(x => (charCounter += ((tagsAbbreviations[x] ? tagsAbbreviations[x].length : x.length) + 2)) <= 30)
        .map(x => tagsAbbreviations[x] ?? x);
  }

  const handleOnCloseDeleteDialog = () => setIsOpenDeleteDialog(false);

  return (
    <JobEntryContext.Provider value={p}>
      <Box id={"job-entry-card"} ref={jobEntryCardRef} sx={jobEntryCardSX(palette)}
        onClick={(e: react.MouseEvent<HTMLDivElement>) => handleClick(e)}>
        <Box id={"content-header"} sx={contentHeaderSX}>
          <img id={"company-logo"} src={logoUrl} ref={logoRef} alt={"cannot load image"} loading={"lazy"}
               style={companyLogoSX} />
          <Box id={"main-details"} sx={mainDetailsSX}>
            {
              // For desktop, we'll display the company's name on the top, for the mobile, we'll display the job's title
              wd.width > 1000
                ? <Typography id={"company-name"} variant={"h6"} noWrap sx={h6TextPrimarySX(palette, wd)}>
                    {p.companyName}
                  </Typography>
                : <Typography id={"title-mobile"} variant={"h6"} noWrap sx={h6TextPrimarySX(palette, wd)}>
                    {p.title}
                  </Typography>
            }
            {
              // For desktop, the second row will display the Location, for the mobile, it will display company's name
              wd.width > 1000
              ? <Typography id={"location"} variant={"subtitle1"} noWrap sx={sub1ThemePrimarySX(palette)}>
                    {p.location}
                </Typography>
              : <Typography id={"company-name-mobile"} variant={"subtitle1"} noWrap
                            sx={sub1TextPrimarySX(palette)}>
                    {p.companyName}
                </Typography>
            }
            {
              wd.width > 1000 ? (
                  p.salary ? <Typography id={"salary"} variant={"subtitle1"} noWrap sx={sub1ThemePrimarySX(palette)}>
                    { formatSalary(p.salary, p.salaryCurrency!) }
                  </Typography> : <></>
              ) : <>
                <Typography id={"location-mobile"} variant={"subtitle1"} noWrap
                            sx={sub1ThemePrimarySX(palette)}>
                  {p.location}
                </Typography>
                {
                  p.salary
                    ? <Typography id={"salary-mobile"} variant={"subtitle1"} noWrap sx={sub1TextPrimarySX(palette)}>
                        { formatSalary(p.salary, p.salaryCurrency!) }
                      </Typography>
                    : <></>
                }
              </>
            }
          </Box>
          <DeleteJobEntryDialog
              isOpen={isOpenDeleteDialog}
              onClose={handleOnCloseDeleteDialog}
              jobEntry={p} />
          <JobEntryMenu
              jobId={p.id!}
              anchorEl={moreOptionsAnchorEl}
              onClose={closeMoreOptionsMenu}
              children={
                p.ownerUsername !== UserDataService.getUserDataLocal().username
                  ? [
                    <JobEntryMenuItem
                        jobId={p.id!}
                        icon={isSaved
                            ? <BookmarkIcon fontSize={"small"} sx={{color: palette.text.primary}} />
                            : <BookmarkBorderIcon fontSize={"small"} sx={{color: palette.text.primary}} />
                        }
                        text={isSaved ? "Unsave" : "Save"}
                        disabled={isSaved === null}
                        onClick={handleOnSave} />,
                    <JobEntryMenuItem
                        jobId={p.id!}
                        icon={<ReportIcon fontSize={"small"} sx={{color: palette.text.primary}} />}
                        text={"Report"}
                        onClick={handleOnOpenReportDialog} />
                  ] : [
                    <JobEntryMenuItem
                        jobId={p.id!}
                        icon={<EditIcon fontSize={"small"} sx={{color: palette.text.primary}} />}
                        text={"Edit"}
                        onClick={handleOnEdit} />,
                    <JobEntryMenuItem
                        jobId={p.id!}
                        icon={<DeleteIcon fontSize={"small"} sx={{color: palette.text.primary}} />}
                        text={"Delete"}
                        onClick={handleOnDelete} />
                  ]
          }
          />
          <IconButton
              children={<MoreHorizIcon />}
              onClick={handleMoreOptions}
              sx={moreOptionsSX(palette)}
          />
        </Box>
        <Box id={"content-main"} sx={contentMainSX}>
          {/*Should limit job title to 50 characters*/}
          <Typography id={"title"} ref={titleRef} variant={"h5"} sx={titleH5SX}>
            {p.title}
          </Typography>
          <Typography id={"description"} ref={descriptionRef} variant={"subtitle2"} sx={descriptionSub2SX(palette, descriptionHeight)}>
            {p.description}
          </Typography>
          <Box id={"tags"} sx={tagsBoxSX}>
            { filterTags(p.tags).map(tag => <JobEntryTag tag={tag} />) }
          </Box>
        </Box>
      </Box>
    </JobEntryContext.Provider>
  );
};

export default JobEntryCard;
