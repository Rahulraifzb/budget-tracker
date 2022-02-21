import React, { Fragment } from 'react';
import { Grid } from '@mui/material'; 
import Details from './components/Details/Details';
import useStyles from "./styles";
import Main from './components/Main/Main';

function App() {
  const classes = useStyles()
  return (
    <Fragment>
      <Grid className={classes.grid} container spacing={3} alignItems="center" justifyContent="center" style={{height:"100vh"}}>
        <Grid item xs={12} sm={4}>
          <Details title="Income" />
        </Grid>
        <Grid item xs={12} sm={3}>
          <Main />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Details title="Expense" />
        </Grid>
      </Grid>
    </Fragment>
  );
}

export default App;
