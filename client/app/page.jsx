"use client";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import TransactionsPopup from "./components/TransactionsPopup";
import EditBalancePopup from "./components/EditBalancePopup";
import { useQuery } from "react-query";

const HomePage = () => {
  const usersQuery = useQuery("users", () =>
    fetch("http://localhost:5000/users").then((res) =>
      res.json().catch((err) => console.log(err))
    )
  );
  // console.log(usersQuery.data);

  return (
    <div className="flex items-center justify-center min-h-screen py-2 bg-[#f4f4f4]">
      <TableContainer className="w-[750px]" component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Balance</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usersQuery.data?.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.balance}</TableCell>
                <TableCell align="right">
                  <div className="flex justify-end">
                    <TransactionsPopup history={row.transactions} />
                    <EditBalancePopup row={row} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default HomePage;
