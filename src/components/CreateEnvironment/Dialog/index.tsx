import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";

export interface SimpleDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
}

// SimpleDialog is a dialog that informs the user they've entered the details of
// an environment which closely matches an already existing environment.
function SimpleDialog(props: SimpleDialogProps) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        <Typography variant="h4">Hold on!</Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Your environment closely matches *three others*, are you sure you
          would not like to use one of these?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Create my own environment</Button>
        <Button
          onClick={handleClose}
          autoFocus
          sx={{ backgroundColor: "#5569ff", color: "white" }}
        >
          Use already existing environment
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default SimpleDialog;
