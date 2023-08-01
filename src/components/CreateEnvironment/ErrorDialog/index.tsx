import { Dialog, DialogTitle, Typography, DialogContent, DialogContentText } from "@mui/material";
import { useState } from "react";

const ErrorDialog = (props:any) => {
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