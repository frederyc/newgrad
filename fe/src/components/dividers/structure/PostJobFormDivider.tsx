import react from "react";
import {Box, Chip, Divider, Palette, useTheme} from "@mui/material";
import {postJobFormDividerSX} from "../styling/PostJobFormDividerSX";

type PostJobFormDividerParams = {
  text: string
}

const PostJobFormDivider = (params: PostJobFormDividerParams) => {
  const palette: Palette = useTheme().palette;

  return (
      <Box id={"post-job-form-divider"} sx={postJobFormDividerSX(palette)}>
        <Divider id={"divider"} />
        {
          // If the text is empty, don't add a chip
          params.text !== "" ? <Chip label={params.text} /> : <></>
        }
        {
          // If the text is empty, don't render a second divider.
          params.text !== "" ? <Divider id={"divider"} /> : <></>
        }
      </Box>
  );
}

export default PostJobFormDivider;
