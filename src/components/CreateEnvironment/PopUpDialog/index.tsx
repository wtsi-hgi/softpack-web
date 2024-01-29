import { Dialog, DialogTitle, Typography, DialogContent, DialogContentText } from "@mui/material";

type PopUpDialogProps = {
  title: string;
  message: string;
  onClose: () => void;
}

// PopUpDialog shows a modal popup over the whole webpage.
export const PopUpDialog = (props: PopUpDialogProps) => {
  return (
    <Dialog
      open={props.message !== ""}
      onClose={props.onClose}
    >
      <DialogTitle id="alert-dialog-title">
        <Typography variant="h4">{props.title}</Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {props.message}
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
}