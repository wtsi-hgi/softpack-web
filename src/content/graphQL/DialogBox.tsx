import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";

export interface SimpleDialogProps {
    open: boolean;
    selectedValue: string;
    onClose: (value: string) => void;
  }
  
function SimpleDialog(props: SimpleDialogProps) {
    const { onClose, selectedValue, open } = props;
  
    const handleClose = () => {
      onClose(selectedValue);
    };
  
    const handleListItemClick = (value: string) => {
      onClose(value);
    };
  
    return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Hold on!
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Your environment closely matches *three others*, are you sure you would not like to use one of these?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Create my own environment</Button>
        <Button onClick={handleClose} autoFocus>
          Use already existing environment
        </Button>
      </DialogActions>
    </Dialog>
    );
  }

export default SimpleDialog