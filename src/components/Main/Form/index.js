import React, { useState, Fragment, useEffect } from "react";
import {
  TextField,
  Typography,
  Grid,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import useStyles from "./styles";
import { useExpenseContext } from "../../../context/context";
import {
  incomeCategories,
  expenseCategories,
} from "../../../constants/categories";
import formateDate from "../../../utils/formateDate";
import { useSpeechContext } from "@speechly/react-client";
import CustomizeSnackbar from "../../Snackbar/Snackbar";

const initialState = {
  amount: "",
  category: "",
  type: "",
  date: formateDate(new Date()),
};

const Form = () => {
  const classes = useStyles();
  const [formData, setFormData] = useState(initialState);
  const { addTransaction } = useExpenseContext();
  const { segment } = useSpeechContext();
  const [open,setOpen] = useState(false)

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const createTransaction = () => {
    if (Number.isNaN(Number(formData.amount)) || !formData.date.includes("-"))
      return;
    const transaction = {
      ...formData,
      amount: Number(formData.amount),
      id: uuidv4(),
    };
    addTransaction(transaction, () => {
      setOpen(true)
      setFormData(initialState)
    });
    
  };

  useEffect(() => {
    if (segment) {
      console.log("Hello world!");
      if (segment.intent.intent === "add_expense") {
        setFormData((prevState) => ({ ...prevState, type: "Expense" }));
      } else if (segment.intent.intent === "add_income") {
        setFormData((prevState) => ({ ...prevState, type: "Income" }));
      } else if (
        segment.isFinal &&
        segment.intent.intent === "create_transaction"
      ) {
        return createTransaction();
      } else if (
        segment.isFinal &&
        segment.intent.intent === "cancel_transaction"
      ) {
        return setFormData(initialState);
      }

      segment.entities.forEach((e) => {
        const category = `${e.value.charAt(0)}${e.value
          .slice(1)
          .toLowerCase()}`;
        switch (e.type) {
          case "amount":
            setFormData((prevState) => ({ ...prevState, amount: e.value }));
            break;
          case "category":
            if (incomeCategories.map((ic) => ic.type).includes(category)) {
              setFormData((prevState) => ({
                ...prevState,
                type: "Income",
                category: category,
              }));
            } else if (
              expenseCategories.map((ic) => ic.type).includes(category)
            ) {
              setFormData((prevState) => ({
                ...prevState,
                type: "Expense",
                category: category,
              }));
            }
            break;
          case "date":
            setFormData((prevState) => ({ ...prevState, date: e.value }));
            break;
        }
      });

      if (
        segment.isFinal &&
        formData.amount &&
        formData.category &&
        formData.type &&
        formData.date
      ) {
        createTransaction();
      }
    }
  }, [segment]);

  const selectedCategories =
    formData.type === "Income" ? incomeCategories : expenseCategories;

  return (
    <Grid container spacing={2}>
      <CustomizeSnackbar open={open} setOpen={setOpen} />
      <Grid item xs={12}>
        <Typography align="center" variant="subtitle2" gutterBottom>
          {segment && segment.words.map((w) => w.value).join(" ")}
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel>Type</InputLabel>
          <Select name="type" value={formData?.type} onChange={onChange}>
            <MenuItem value="Income">Income</MenuItem>
            <MenuItem value="Expense">Expense</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel>Category</InputLabel>
          <Select
            name="category"
            value={formData?.category}
            onChange={onChange}
          >
            {selectedCategories.map((category) => (
              <MenuItem key={category.type} value={category.type}>
                {category.type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item md={12} xs={6}>
        <TextField
          type="number"
          label="Amount"
          name="amount"
          fullWidth
          value={formData?.amount}
          onChange={onChange}
        />
      </Grid>
      <Grid item md={12} xs={6}>
        <TextField
          type="date"
          label="Date"
          name="date"
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
          value={formData?.date}
          onChange={onChange}
        />
      </Grid>
      <Grid item md={12} xs={6}>
        <Button
          className={classes.button}
          variant="outlined"
          color="primary"
          fullWidth
          onClick={createTransaction}
        >
          Create
        </Button>
      </Grid>
    </Grid>
  );
};

export default Form;
