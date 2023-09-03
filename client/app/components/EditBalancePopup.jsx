import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";

const EditBalancePopup = ({ row }) => {
  const [open, setOpen] = useState(false);
  const [balance, setBalance] = useState(row.balance);
  const queryClient = useQueryClient();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const updateBalance = useMutation({
    mutationFn: (balance) =>
      fetch(`http://localhost:5000/users/${row._id}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ balance }),
      })
        .then((res) => res.json())
        .catch((err) => console.log(err)),
    onSuccess: () => {
      queryClient.invalidateQueries("users");
    },
  });
  return (
    <div>
      <Button
        variant="contained"
        className="bg-blue-500"
        onClick={handleClickOpen}
      >
        Edit Balance
      </Button>
      <Dialog fullWidth open={open} onClose={handleClose}>
        <DialogTitle>Edit Balance</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Balance"
            type="number"
            fullWidth
            variant="standard"
            value={balance}
            onChange={(e) => setBalance(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={() => {
              updateBalance.mutate(balance);
              handleClose();
            }}
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditBalancePopup;
