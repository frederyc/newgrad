import {GlobalAlertType} from "../../../types/types/GlobalAlertType";
import {Alert, AlertTitle, Snackbar} from "@mui/material";

const GlobalAlert = (p: GlobalAlertType) => {
  return (
      <Snackbar id={"global-alert"} autoHideDuration={6000} open={p.open}>
        <Alert severity={p.severity}>
          <AlertTitle>{p.title}</AlertTitle>
          {p.message}
        </Alert>
      </Snackbar>
  );
}

export default GlobalAlert;
