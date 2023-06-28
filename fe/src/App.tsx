import react, {useEffect, useState} from 'react';
import {ThemeProvider, Theme, CssBaseline, Alert, AlertTitle, Snackbar} from "@mui/material";
import {BrowserRouter, Location, Navigate, Route, Routes, useLocation} from "react-router-dom";
import AuthenticationPage from "./components/pages/structure/AuthenticationPage";
import BrowsePage from "./components/pages/structure/BrowsePage";
import BaseSearchBar from "./components/surfaces/structure/BaseSearchBar";
import BrowseSearchBar from "./components/surfaces/structure/BrowseSearchBar";
import BasePage from "./components/pages/structure/BasePage";
import PostJobPage from "./components/pages/structure/PostJobPage";
import ThemeContext from "./contexts/ThemeContext";
import ThemeService from "./services/ThemeService";
import {DEFAULT_GLOBAL_ALERT, GlobalAlertType} from "./types/types/GlobalAlertType";
import GlobalAlertContext from "./contexts/GlobalAlertContext";
import TopBarContext from "./contexts/TopBarContext";
import PostedJobsPage from "./components/pages/structure/PostedJobsPage";
import SavedJobsPage from "./components/pages/structure/SavedJobsPage";
import ComingSoonPage from "./components/pages/structure/ComingSoonPage";

function App() {
  const [theme, setTheme] = useState<Theme>(ThemeService.getTheme());
  const [globalAlertData, setGlobalAlertData] = useState<GlobalAlertType>(DEFAULT_GLOBAL_ALERT);
  const [topBar, setTopBar] = useState<react.ReactNode>(<></>);

  const closeGlobalAlert = () => {
    const closedGlobalAlert: GlobalAlertType = {
      severity: globalAlertData.severity,
      title: globalAlertData.title,
      message: globalAlertData.message,
      open: false
    }
    setGlobalAlertData(closedGlobalAlert);
  }

  const getSearchBar = (): react.ReactNode => {
    if (window.location.pathname.startsWith("/browse")) {
      return <BrowseSearchBar />
    } else {
      // for now
      return <></>
    }
  }

  useEffect(() => {
    const handleLocationChange = () => {
      const newPathname = window.location.pathname;
    };

    // Add event listener for 'popstate' event
    window.addEventListener('popstate', handleLocationChange);

    // Clean up the event listener when the component unmounts
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);


  return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
          <Snackbar id={"global-alert"} autoHideDuration={6000} open={globalAlertData.open} onClose={closeGlobalAlert}>
            <Alert severity={globalAlertData.severity} onClose={closeGlobalAlert}>
              <AlertTitle>{globalAlertData.title}</AlertTitle>
              {globalAlertData.message}
            </Alert>
          </Snackbar>
          <GlobalAlertContext.Provider value={setGlobalAlertData}>
            <TopBarContext.Provider value={setTopBar}>
              <BrowserRouter>
                <Routes>
                  <Route path={'/authentication'} element={<AuthenticationPage />} />
                  <Route path={'/*'} element={
                    <ThemeContext.Provider value={setTheme}>
                      <BaseSearchBar content={topBar} />
                      <Routes>
                        <Route path={'/browse/*'} element={<BasePage element={<BrowsePage />} />} />
                        <Route path={'/post-job/:id?'} element={<BasePage element={<PostJobPage />} />} />
                        <Route path={'/posted-jobs'} element={<BasePage element={<PostedJobsPage />} />} />
                        <Route path={'/saved-jobs/*'} element={<BasePage element={<SavedJobsPage />} />} />
                        <Route path={'/profile'} element={<BasePage element={<ComingSoonPage />} />} />
                        <Route path={'/notifications'} element={<BasePage element={<ComingSoonPage />} />} />
                      </Routes>
                    </ThemeContext.Provider>
                  } />
                </Routes>
              </BrowserRouter>
            </TopBarContext.Provider>
          </GlobalAlertContext.Provider>
      </ThemeProvider>
  );
}

export default App;
