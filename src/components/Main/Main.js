import React from 'react'
import {Card,CardHeader,CardContent,Typography,Grid,Divider} from "@mui/material"
import { ClassNames } from '@emotion/react'
import useStyles from "./styles"

const Main = () => {
    const classes = useStyles()
  return (
    <Card className={ClassNames.root}>
        <CardHeader title="Expense Tracker" subheader="Powered by speechly" />
        <CardContent>
            <Typography align="center" variant="h5" >Total Balance $100</Typography>
            <Typography variant='subtitle' style={{lineHeight:"1.5em",marginTop:"20px"}}>
                Try saying: Add income for $100 in category salery for monday
            </Typography>
        {/* Form */}
        </CardContent>
        <Divider  className={classes.divider}  />
        <CardContent className={classes.cardContent}>
            <Grid container spacing={2}>
                <Grid item xs={12}>

                </Grid>
            </Grid>
        </CardContent>

    </Card>
  )
}

export default Main