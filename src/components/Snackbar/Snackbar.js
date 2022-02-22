import React from "react";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import useStyles from "./styles";

const theme = createTheme();

const CustomizeSnackbar = ({open,setOpen}) => {
  const classes = useStyles();

  const handleClose = (event,reson) => {
    if(reson === "clickaway") return;
    setOpen(false)
  }

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
        >
          <MuiAlert
            onClose={handleClose}
            severity="success"
            elevation={6}
            variant="filled"
          >
              Transaction successfully created.
          </MuiAlert>
        </Snackbar>
      </div>
    </ThemeProvider>
  );
};

export default CustomizeSnackbar;
