import WindowDimensions from "../../../types/interfaces/WindowDimensions";

const BACKGROUND_WIDTH: number = 4972;
const BACKGROUND_HEIGHT: number = 4486;

const getBackgroundScale = (wd: WindowDimensions): number => {
  const isMobile: boolean = wd.width < wd.height;
  return Math.max(wd.width, wd.height) / 4500 + (isMobile ? 0.05 : 0);
}

export const authenticationPageSX = {
  height: "100vh",
  width: "100vw",
  overflow: "hidden",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  gap: "2vw",
}

export const backgroundWrapperSX = (wd: WindowDimensions) => {
  return {
    position: "fixed",
    zIndex: "-1",
    width: `${BACKGROUND_WIDTH * getBackgroundScale(wd)}px`,
    left: `${(wd.width - BACKGROUND_WIDTH * getBackgroundScale(wd)) / 2}px`
  }
}

export const backgroundImgSX = {
  width: "100%",
  height: "100%"
}

export const authenticationFormWrapperSX = {
  width: "650px",
  "@media (max-width: 1200px)": {
    width: "90vw"
  },
}
