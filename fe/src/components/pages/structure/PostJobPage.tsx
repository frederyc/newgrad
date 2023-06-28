import {Box, CircularProgress} from "@mui/material";
import {
  postJobPageSX,
} from "../styling/PostJobPageSX";
import PostJobForm from "../../forms/structure/PostJobForm";
import react, {useContext, useEffect, useState} from "react";
import {UserData} from "../../../types/types/UserData";
import UserDataService from "../../../services/UserDataService";
import {useParams} from "react-router-dom";
import TopBarContext from "../../../contexts/TopBarContext";

const PostJobPage = () => {
  const [userDetails, setUserDetails] = useState<UserData | null>(null);
  const jobEntryId: string | undefined = useParams().id;
  const topBarContext: react.Dispatch<react.ReactNode> = useContext(TopBarContext)!;

  const validateJobEntryId = (id: string): boolean => {
    const isValidFormat: RegExp = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    return isValidFormat.test(id);
  };

  useEffect(() => {
    const runAsync = async () => setUserDetails(await UserDataService.getUserDataCloud());
    runAsync();
    topBarContext(<></>);
  }, []);

  return (
      <Box id={"post-job-page"} sx={postJobPageSX}>
        {
          !userDetails
              ? <CircularProgress />
              : <PostJobForm userDetails={userDetails} jobEntryId={jobEntryId} />
        }
      </Box>
  );
}

export default PostJobPage;
