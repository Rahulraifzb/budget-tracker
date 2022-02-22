import React from "react";
import {
  List as MUIList,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  ListItemSecondaryAction,
  IconButton,
  Slide,
} from "@mui/material";
import { Delete, MoneyOff } from "@mui/icons-material";
import { red, green } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import useStyles from "./styles"
import {useExpenseContext} from "../../../context/context"


const List = (props) => {
  const classes = useStyles();
  const {transactions,deleteTransaction} = useExpenseContext()

  const theme = createTheme();

  // const transactions = [
  //   { id: 1, type: "Income", category: "Salary", amount: 50, date: new Date() },
  //   {
  //     id: 2,
  //     type: "Expense",
  //     category: "Entertainment",
  //     amount: 80,
  //     date: new Date(),
  //   },
  //   {
  //     id: 3,
  //     type: "Income",
  //     category: "Technology",
  //     amount: 88,
  //     date: new Date(),
  //   },
  // ];

  return (
    <ThemeProvider theme={theme}>
      <MUIList dense={false} className={classes.list}>
        {transactions.map((transaction) => (
          <Slide
            direction="down"
            in
            mountOnEnter
            unmountOnExit
            key={transaction.id}
          >
            <ListItem>
              <ListItemAvatar>
                <Avatar
                  sx={{
                    bgcolor:
                      transaction.type === "Income" ? green[500] : red[500],
                  }}
                >
                  {console.log(" ----- Transaction ----- ", transaction)}
                  <MoneyOff />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={transaction.category}
                secondary={`$${transaction.amount} - ${transaction.date}`}
              />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => deleteTransaction(transaction.id)}
                >
                  <Delete />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          </Slide>
        ))}
      </MUIList>
    </ThemeProvider>
  );
};

export default List;
