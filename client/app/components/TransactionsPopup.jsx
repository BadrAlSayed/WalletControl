import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Typography from "@mui/material/Typography";

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
import TablePagination from "@mui/material/TablePagination";
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
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        sx={{ marginRight: 2 }}
      >
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
              <MenuItem value={1}>One</MenuItem>
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
                  <TableCell sx={{ color: "white" }}>Date</TableCell>
                  <TableCell sx={{ color: "white" }} align="right">
                    Balance
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? filteredHistory.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : filteredHistory
                ).map((transaction) => (
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
            <TablePagination
              component="div"
              count={filteredHistory?.length || 0}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              rowsPerPageOptions={[5]}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TransactionsPopup;
