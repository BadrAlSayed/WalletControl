import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Typography from "@mui/material/Typography";
import DialogContentText from "@mui/material/DialogContentText";
import {
  FormControl,
  InputLabel,
  Select,
  Box,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
} from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import { useState, useEffect } from "react";

const filterTransactions = (transactions, days) => {
  const currentDate = new Date();
  const cutoffDate = new Date(currentDate);
  cutoffDate.setDate(currentDate.getDate() - days);
  return transactions.filter(
    (transaction) => new Date(transaction.date) > cutoffDate
  );
};

const TransactionsPopup = ({ history }) => {
  const [open, setOpen] = useState(false);
  const [days, setDays] = useState("");
  const [filteredHistory, setFilteredHistory] = useState(history);

  const handleChange = (e) => {
    setDays(e.target.value);
    setFilteredHistory(filterTransactions(history, e.target.value));
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setDays("");
    setFilteredHistory(history);
  };

  useEffect(() => {
    setFilteredHistory(history);
  }, [history]);

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen} className="mr-2">
        Transaction History
      </Button>
      <Dialog
        fullWidth
        className="min-h-fit mt-64"
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className="flex pt-2 pr-2 justify-between">
          <DialogTitle id="alert-dialog-title">Transaction History</DialogTitle>
          <FormControl className="w-[100px]">
            <InputLabel id="demo-simple-select-label">Days</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={days}
              label="Days"
              onChange={handleChange}
            >
              <MenuItem value={0}>Zero</MenuItem>
              <MenuItem value={5}>Five</MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
            </Select>
          </FormControl>
        </div>
        <DialogContent>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow className="bg-blue-500">
                  <TableCell className="text-white">Date</TableCell>
                  <TableCell className="text-white" align="right">
                    Balance
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredHistory.map((transaction) => (
                  <TableRow
                    key={transaction.date}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {`${transaction.date.slice(
                        0,
                        10
                      )} @ ${transaction.date.slice(11, 19)}`}
                    </TableCell>
                    <TableCell align="right">{transaction.balance}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TransactionsPopup;
