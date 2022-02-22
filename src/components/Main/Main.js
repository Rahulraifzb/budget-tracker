import React from 'react'
import {Card,CardHeader,CardContent,Typography,Grid,Divider} from "@mui/material"
import { ClassNames } from '@emotion/react'
import useStyles from "./styles"
import FormComponent from './Form'
import InfoCard from "./InfoCard"
import List from "./List"
import { useExpenseContext } from '../../context/context'

const Main = () => {
    const classes = useStyles()
    const {balance} = useExpenseContext()
  return (
    <Card className={ClassNames.root}>
        <CardHeader title="Expense Tracker" subheader="Powered by speechly" />
        <CardContent>
            <Typography align="center" variant="h5" >Total Balance ${balance}</Typography>
            <Typography variant='subtitle' style={{lineHeight:"1.5em",marginTop:"20px"}}>
                <InfoCard />
            </Typography>
        </CardContent>
        <Divider  className={classes.divider}  />
        <CardContent>
            <FormComponent />
        </CardContent>
        <CardContent className={classes.cardContent}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <List />
                </Grid>
            </Grid>
        </CardContent>

    </Card>
  )
}

export default Main