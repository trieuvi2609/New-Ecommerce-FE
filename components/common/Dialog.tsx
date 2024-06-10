import * as React from "react";

import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

const emails = ["username@gmail.com", "user02@gmail.com"];

export interface SimpleDialogProps {
  open: boolean;
  onClose: () => void;
  onOk: () => void;
  children?: React.ReactNode;
}

export default function SimpleDialog(props: SimpleDialogProps) {
  const { onClose, open, children, onOk } = props;

  const handleClose = () => {
    onClose();
  };
  const handleOk = () => {
    onOk();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Disagree</Button>
        <Button onClick={handleOk}>Agree</Button>
      </DialogActions>
    </Dialog>
  );
}
