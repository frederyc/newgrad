import react, {useContext, useEffect} from "react";
import {Box} from "@mui/material";
import ComingSoonChip from "../../chips/structure/ComingSoonChip";
import {comingSoonPageSX} from "../styling/ComingSoonPageSX";
import TopBarContext from "../../../contexts/TopBarContext";

const ComingSoonPage = () => {
  const topBarContext: react.Dispatch<react.ReactNode> = useContext(TopBarContext)!;

  useEffect(() => {
    topBarContext(<></>);
  }, []);

  return (
      <Box id={"coming-soon-page"} sx={comingSoonPageSX}>
        <ComingSoonChip />
      </Box>
  );
}

export default ComingSoonPage;
