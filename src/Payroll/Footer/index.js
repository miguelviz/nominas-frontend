import { Grid, Typography } from "@mui/material";
import React from "react";
import FadeIn from 'react-fade-in';
import { usePayroll } from "../store";
const Footer = ()=>{
    const {COLORS} = usePayroll();
    return(
        <Grid container style={{marginTop:30,cursor:"pointer"}}>
            <Grid item xs="12" style={{display:"flex",justifyContent:"center"}}>
                <FadeIn>
                    <Typography>
                        POWERED BY
                    </Typography>
                </FadeIn>
            </Grid>
            <Grid item xs="12" style={{display:"flex",justifyContent:"center",padding:20}}>
                <FadeIn delay={500}>
                    <img 
                        className="sizeable" 
                        src={process.env.PUBLIC_URL + '/logo_coppel.png'} 
                        onClick={()=>window.open('https://www.coppel.com/', "_blank")}
                        style={{
                            width:300,
                            borderRadius:15,
                            boxShadow:`3px 4px ${COLORS.primary}`,
                            cursor:"pointer"
                        }} 
                        alt="logo" 
                    />
                </FadeIn>
            </Grid>
        </Grid>
    )
}
export default Footer;