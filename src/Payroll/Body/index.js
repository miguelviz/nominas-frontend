import { Grid } from "@mui/material";
import React from "react";
import "./styles.css";
import Table from "./Table";
import { ConfirmProvider } from "material-ui-confirm";
const Body = ()=>{
    
    return(
        <Grid container>
            <Grid item xs={12} style={{overflowX:"auto"}}>
                <ConfirmProvider>
                    <Table />
                </ConfirmProvider>
            </Grid>
        </Grid>
    )
}
export default Body;