import react, {useContext} from "react";
import {
  Box,
  IconButton,
  Palette,
  SwipeableDrawer,
  Theme,
  Typography,
  useTheme
} from "@mui/material";
import WindowDimensions from "../../../types/interfaces/WindowDimensions";
import useWindowDimensions from "../../../hooks/useWindowDimensions";
import {
  bottomMenuContainerSX,
  headerSX,
  iconButtonSX,
  logoWrapperSX,
  mainMenuContainerSX,
  mainMenuDesktopSX, menuContainerSX
} from "../styling/MainMenuSX";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import logo from "../../../resources/images/newgradeu_logo.jpg";
import React from "react";
import ThemeContext from "../../../contexts/ThemeContext";
import {darkTheme, lightTheme} from "../../../theme";
import ThemeService from "../../../services/ThemeService";
import MainMenuButton from "../../buttons/structure/MainMenuButton";
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import {Location, NavigateFunction, useLocation, useNavigate} from "react-router-dom";
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LogoutIcon from '@mui/icons-material/Logout';
import AuthenticationService from "../../../services/AuthenticationService";
import WorkIcon from '@mui/icons-material/Work';
import UserDataService from "../../../services/UserDataService";
import NotificationsIcon from '@mui/icons-material/Notifications';

type MainMenuParams = {
  isOpen: boolean,
  onClose: (...args: any[]) => any
}

const MainMenu = (params: MainMenuParams) => {
  const nav: NavigateFunction = useNavigate();
  const location: Location = useLocation();
  const setTheme: react.Dispatch<react.SetStateAction<Theme>> = useContext(ThemeContext)!;
  const palette: Palette = useTheme().palette;
  const wd: WindowDimensions = useWindowDimensions();

  // A regex that matches if the path is '/post-job' or '/post-job/{id}', where id is the id of a job (when editing an existing entry)
  const postJobPageRegex: RegExp = /^\/post-job(?:\/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})?$/;
  const browsePageRegex: RegExp = /^\/browse/;

  //@ts-ignore
  const darkThemeActive: boolean = palette.type === "dark";
  const switchThemeButtonIcon: react.ReactNode = darkThemeActive ? <DarkModeIcon /> : <LightModeIcon />;

  const switchTheme = () => {
    ThemeService.saveTheme(darkThemeActive ? lightTheme : darkTheme);
    setTheme(darkThemeActive ? lightTheme : darkTheme);
  }
  const navToBrowse = () => nav("/browse");
  const navToPostJob = () => nav("/post-job");
  const navToPostedJobs = () => nav("posted-jobs")
  const navToProfile = () => nav("/profile");
  const navToSavedJobs = () => nav("/saved-jobs");
  const navToNotifications = () => nav("/notifications");
  const handleSignOut = async () => {
    await AuthenticationService.signOut();
    nav("/authentication");
  }

  return (
      <SwipeableDrawer id={"main-menu"} onOpen={() => {/* TODO maybe */}} onClose={params.onClose}
        variant={wd.width <= 1000 ? "temporary" : "persistent"} sx={mainMenuDesktopSX(palette, wd)}
        open={wd.width > 1000 || params.isOpen} anchor={"left"}>
        <Box id={"header"} sx={headerSX}>
          <Box id={"logo-wrapper"} sx={logoWrapperSX(palette)}>
            <img src={logo} alt={"Cannot load image"} />
            <Typography variant={"h5"} >
              New Grad EU
            </Typography>
          </Box>
          <IconButton id={"close-menu-button"} sx={iconButtonSX(palette, wd)}
            onClick={params.onClose} children={<ChevronLeftIcon />} />
        </Box>
        <Box id={"menu-container"} sx={menuContainerSX}>
          <Box id={"main-menu-container"} sx={mainMenuContainerSX(palette)}>
            <MainMenuButton text={"Browse"} onClick={navToBrowse} icon={<DynamicFeedIcon />}
                contained={browsePageRegex.test(location.pathname)} />
            {
              window.localStorage.getItem("userData") && UserDataService.getUserDataLocal().role === "RECRUITER"
                  ? <MainMenuButton text={"Post job"} onClick={navToPostJob} icon={<LibraryAddIcon />}
                      contained={postJobPageRegex.test(location.pathname)} />
                  : <></>
            }
            {
              window.localStorage.getItem("userData") && UserDataService.getUserDataLocal().role === "RECRUITER"
                  ? <MainMenuButton text={"Posted jobs"} onClick={navToPostedJobs} icon={<WorkIcon />}
                      contained={location.pathname === "/posted-jobs"} />
                  : <></>
            }
            <MainMenuButton text={"Saved jobs"} onClick={navToSavedJobs} icon={<BookmarksIcon />}
                contained={location.pathname.startsWith("/saved-jobs")} />
          </Box>
          <Box id={"bottom-menu-container"} sx={bottomMenuContainerSX(palette)}>
            <MainMenuButton text={"Profile"} onClick={navToProfile} icon={<AccountBoxIcon />}
                contained={location.pathname === "/profile"} />
            <MainMenuButton text={"Notifications"} onClick={navToNotifications} icon={<NotificationsIcon />}
                contained={location.pathname === "/notifications"}/>
            <MainMenuButton text={"Switch theme"} onClick={switchTheme} icon={switchThemeButtonIcon} />
            <MainMenuButton text={"Sign out"} onClick={handleSignOut} icon={<LogoutIcon />} />
          </Box>
        </Box>
      </SwipeableDrawer>
  )
}

export default MainMenu;
