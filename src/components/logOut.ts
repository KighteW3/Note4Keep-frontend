import { URLFrontend } from "../assets/URLs";

export const logOutFunc = () => {
  if (window.localStorage.getItem("SESSION_ID")) {
    window.localStorage.removeItem("SESSION_ID");
    window.open(`${URLFrontend}/`, "_self");
  }
};
