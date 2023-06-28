import react from "react";
import {Box} from "@mui/material";
import {basePageSX} from "../styling/BasePageSX";

type basePageParams = {
  element: react.ReactNode
}

/**
 * Any page within the application, except the authentication and error pages, should be places as an element inside a
 * base page. This page has the styling configured, so it will occupy only the space needed (will not go under the bar,
 * menu, etc...)
 */
const BasePage = (params: basePageParams) => {
  return (
      <Box id={"base-page"} sx={basePageSX}>
        {params.element}
      </Box>
  );
}

export default BasePage;
