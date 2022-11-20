import { Grid, Typography } from "@mui/material";
import React from "react";
import FadeIn from 'react-fade-in';
const Footer = ()=>{

    return(
        <Grid container style={{marginTop:30}}>
            <Grid item xs="12" style={{display:"flex",justifyContent:"center"}}>
                <FadeIn>
                    <Typography>
                        POWERED BY
                    </Typography>
                </FadeIn>
            </Grid>
            <Grid item xs="12" style={{display:"flex",justifyContent:"center"}}>
                <FadeIn delay={500}>
                    <img src={process.env.PUBLIC_URL + '/logo_coppel.png'} style={{width:300,borderRadius:15}} alt="logo" />
                </FadeIn>
            </Grid>
        </Grid>
    )
}
export default Footer;