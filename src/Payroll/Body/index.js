import { Grid } from "@mui/material";
import React from "react";
import "./styles.css";
import Table from "./Table";
const Body = ()=>{
    
    return(
        <Grid container>
            <Grid item xs={12}>
                <Table />
            </Grid>
        </Grid>
    )
}
export default Body;