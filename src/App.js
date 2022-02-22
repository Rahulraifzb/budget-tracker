import React, { Fragment } from 'react';
import { Grid } from '@mui/material'; 
import Details from './components/Details/Details';
import useStyles from "./styles";
import Main from './components/Main/Main';
import { useExpenseContext } from './context/context';
import {
  PushToTalkButton,
  BigTranscript,
  ErrorPanel,
  PushToTalkButtonContainer
} from "@speechly/react-ui";

function App() {
  const classes = useStyles()
  const name = useExpenseContext()

  return (
    <Fragment>
      <Grid className={classes.grid} container spacing={3} alignItems="center" justifyContent="center" style={{height:"100vh"}}>
        <Grid item xs={12} sm={3}>
          <Details title="Income" />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Main />
        </Grid>
        <Grid item xs={12} sm={3}>
          <Details title="Expense" />
        </Grid>
      </Grid>
      <PushToTalkButtonContainer>
        <PushToTalkButton />
        <ErrorPanel />
      </PushToTalkButtonContainer>
    </Fragment>
  );
}

export default App;
