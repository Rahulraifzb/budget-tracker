import React, { Fragment,useEffect, useRef } from 'react';
import { Grid } from '@mui/material'; 
import Details from './components/Details/Details';
import useStyles from "./styles";
import Main from './components/Main/Main';
import {
  PushToTalkButton,
  ErrorPanel,
  PushToTalkButtonContainer
} from "@speechly/react-ui";
import {SpeechState,useSpeechContext} from "@speechly/react-client"


function App() {
  const classes = useStyles()
  const { speechState } = useSpeechContext()
  const main = useRef(null)


  const executeScroll = () => main.current.scrollIntoView()

  useEffect(() => {
    if(speechState === SpeechState.Recording){
      executeScroll()
    }
  },[speechState])

  return (
    <Fragment>
      <Grid className={classes.grid} container spacing={3} alignItems="center" justifyContent="center" style={{height:"100vh"}}>
        <Grid item xs={12} sm={3} className={classes.mobile}>
          <Details title="Income" />
        </Grid>
        <Grid item xs={12} ref={main} sm={4} className={classes.main}>
          <Main />
        </Grid>
        <Grid item xs={12} sm={3} className={classes.desktop}>
          <Details title="Income" />
        </Grid>
        <Grid item xs={12} sm={3} className={classes.last}>
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
