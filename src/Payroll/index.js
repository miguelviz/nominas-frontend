import React from "react";
import { PayrollProvider } from "./store";
import Model from "./model";
import Grid from "@mui/material/Grid";
import {Toaster} from "react-hot-toast";
import { ConfirmProvider } from "material-ui-confirm";
const Payroll = (props)=>{
    return(
        <PayrollProvider>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <Grid container>
                <Grid item xs={12}>
                    <PayrollTunnel />
                </Grid>
            </Grid>
        </PayrollProvider>
    )
}
export default Payroll;
const PayrollTunnel = (props)=><ConfirmProvider><Model /></ConfirmProvider>;