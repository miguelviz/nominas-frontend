import { Grid, Typography } from "@mui/material";
import React from "react";
const Footer = ()=>{

    return(
        <Grid container style={{marginTop:30}}>
            <Grid item xs="12" style={{display:"flex",justifyContent:"center"}}>
                <Typography>
                    POWERED BY
                </Typography>
            </Grid>
            <Grid item xs="12" style={{display:"flex",justifyContent:"center"}}>
                <img src={process.env.PUBLIC_URL + '/logo_coppel.png'} style={{width:300,borderRadius:15}} />
            </Grid>
        </Grid>
    )
}
export default Footer;