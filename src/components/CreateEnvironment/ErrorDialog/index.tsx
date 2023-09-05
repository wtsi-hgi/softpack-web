import { Dialog, DialogTitle, Typography, DialogContent, DialogContentText } from "@mui/material";
import { useState } from "react";

// ErrorDialog informs the user that the environment they are trying to create
// already exists.
const ErrorDialog = (props: { name: string, setError: (err: boolean) => void }) => {
  const [dialogBoxOpen, setDialogBoxOpen] = useState(true);

  const handleDialogBoxClose = () => {
    setDialogBoxOpen(false);
    props.setError(false);
  };

  return (
    <Dialog
      open={dialogBoxOpen}
      onClose={handleDialogBoxClose}
    >
      <DialogTitle id="alert-dialog-title">
        <Typography variant="h4">We're sorry</Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          An environment already exists with the name {props.name}!
          Please choose a different name.
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
}

export default ErrorDialog;