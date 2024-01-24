import { Dialog, DialogTitle, Typography, DialogContent, DialogContentText } from "@mui/material";

// ErrorDialog informs the user that the environment they are trying to create
// already exists.
const ErrorDialog = (props: { error: string, setError: (err: string) => void }) => {
  const handleDialogBoxClose = () => {
    props.setError("");
  };

  return (
    <Dialog
      open={props.error !== ""}
      onClose={handleDialogBoxClose}
    >
      <DialogTitle id="alert-dialog-title">
        <Typography variant="h4">Environment build failed</Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {props.error}
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
}

export default ErrorDialog;