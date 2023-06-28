import {TAB_FORM} from "../structure/AuthTabbedNavigator";

export const tabbedNavigatorSX = {
  width: "100%",
  display: "flex",
  flexDirection: "column"
}

export const tabsSX = {
  display: "flex",
  flexDirection: "row",
  width: "100%",
}

export const tabJobSeekerSX = (tab: TAB_FORM) => {
  return {
    width: "50%",
    height: "35px",
    borderRadius: "5px 0px 0px 5px",
    borderWidth: "2px",
    borderColor: "#8083FF",
    borderStyle: "solid",
    backgroundColor: tab == TAB_FORM.JOB_SEEKER ? "#8083FF" : "transparent",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  }
}

export const tabNameSX = (tabColorActivate: boolean) => {
  return {
    width: "100%",
    textAlign: "center",
    fontSize: "1.15em",
    "@media (max-width: 1000px)": {
      fontSize: "0.85em"
    },
    color: tabColorActivate ? "#F5F5F5" : "#8083FF"
  }
}

export const tabRecruiterSX = (tab: TAB_FORM) => {
  return {
    width: "50%",
    height: "35px",
    borderRadius: "0px 5px 5px 0px",
    borderWidth: "2px",
    borderColor: "#8083FF",
    borderStyle: "solid",
    backgroundColor: tab == TAB_FORM.RECRUITER ? "#8083FF" : "transparent",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  }
}
